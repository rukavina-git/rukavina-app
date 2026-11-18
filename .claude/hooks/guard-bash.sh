#!/bin/bash
# PreToolUse guard for Bash. Blocks commands that are hard to undo, reach
# production, or touch secrets. Exit 2 = blocked; stderr goes back to the agent.

cmd=$(jq -r '.tool_input.command // empty')
[ -z "$cmd" ] && exit 0

block() {
  echo "Blocked by .claude/hooks/guard-bash.sh: $1." >&2
  echo "Do not retry or work around this. Ask the user to run it themselves." >&2
  exit 2
}

repo="${CLAUDE_PROJECT_DIR:-.}"

# Drop prose before scanning: heredoc bodies and quoted text after
# -m/--message/--body/--title/echo/printf (commit messages, PR text).
scan=$(perl -0777 -pe '
  s/(<<-?[ \t]*([\x27"]?)(\w+)\2)([^\n]*)\n.*?\n[ \t]*\3(?=\n|$)/$1$4/gs;
  s/(-m|--message|--body|--title|--notes|echo|printf)([ \t]+|=)("(?:\\.|[^"\\])*"|\x27[^\x27]*\x27)/$1 MSG/gs;
' <<<"$cmd")

segments=$(sed -E 's/(&&|\|\||;|\|)/\n/g' <<<"$scan")

while IFS= read -r seg; do
  # git push rules
  if grep -Eq '(^|[^[:alnum:]_-])git([[:space:]]+-C[[:space:]]+[^[:space:]]+)?[[:space:]]+push' <<<"$seg"; then
    push=$(sed -E 's/.*git([[:space:]]+-C[[:space:]]+[^[:space:]]+)?[[:space:]]+push/push/' <<<"$seg")
    grep -Eq -- '(--force|--force-with-lease|--force-if-includes|[[:space:]]-[[:alnum:]]*f)' <<<"$push" && block "force push"
    grep -Eq '[[:space:]]\+[^[:space:]]+' <<<"$push" && block "force push (+refspec)"
    grep -Eq -- '(--delete|[[:space:]]-d([[:space:]]|$)|[[:space:]]:[^[:space:]]+)' <<<"$push" && block "remote branch deletion"
    grep -Eq -- '(^|[[:space:]:/])main([[:space:]]|$)' <<<"$push" && block "push to main"
    grep -Eq -- '--(all|mirror|tags)' <<<"$push" && block "push of all refs or tags"
    [ "$(git -C "$repo" branch --show-current 2>/dev/null)" = "main" ] && block "push while on main"
  fi
  # commits land on develop or feature branches, never main
  if grep -Eq '(^|[^[:alnum:]_-])git([[:space:]]+-C[[:space:]]+[^[:space:]]+)?[[:space:]]+(commit|merge|rebase|cherry-pick)([[:space:]]|$)' <<<"$seg" \
     && [ "$(git -C "$repo" branch --show-current 2>/dev/null)" = "main" ]; then
    block "commit/merge/rebase on main (switch to develop)"
  fi
  # destructive local git
  grep -Eq '(^|[^[:alnum:]_-])git[[:space:]]+branch[[:space:]].*(-D|--delete[[:space:]]+--force|-df)' <<<"$seg" && block "force branch deletion"
  grep -Eq '(^|[^[:alnum:]_-])git[[:space:]]+reset[[:space:]].*--hard' <<<"$seg" && block "git reset --hard"
  grep -Eq '(^|[^[:alnum:]_-])git[[:space:]]+clean[[:space:]].*-[[:alnum:]]*f' <<<"$seg" && block "git clean -f"
done <<<"$segments"

# Secrets: Read deny rules in settings.json don't cover the shell.
grep -Eq -- '(^|[[:space:]/"'\''=<])\.env(\.[[:alnum:]_.-]+)?([[:space:]"'\'';|&)]|$)' <<<"$scan" \
  && ! grep -Eq -- '\.env\.example' <<<"$scan" \
  && block "command touches a .env file"
grep -Eq -- 'find-generic-password|printenv|(^|[[:space:];|&])env([[:space:]]*($|[;|&]))' <<<"$scan" \
  && block "command may print secrets"
grep -Eq -- 'vercel[[:space:]]+env|RESEND_API_KEY|RECAPTCHA_SECRET' <<<"$scan" \
  && block "command touches production secrets"

# Production and publishing.
grep -Eiq -- '(^|[^[:alnum:]_-])vercel([[:space:]]+(deploy|--prod|promote|rollback|alias|domains|dns|rm|remove|redeploy|link))|vercel[^|;&]*--prod' <<<"$scan" \
  && block "Vercel deploy or production change"
grep -Eq -- '(^|[[:space:];|&])npm[[:space:]]+publish|gh[[:space:]]+release|gh[[:space:]]+pr[[:space:]]+merge|gh[[:space:]]+repo[[:space:]]+(delete|edit)' <<<"$scan" \
  && block "publish, release, PR merge or repo change"

exit 0
