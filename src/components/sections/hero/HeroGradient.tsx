'use client'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vert = `void main(){gl_Position=vec4(position,1.0);}`

const frag = `
precision highp float;
uniform vec2 u_res;
uniform float u_t;

vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec2 mod289(vec2 x){return x-floor(x*(1./289.))*289.;}
vec3 permute(vec3 x){return mod289(((x*34.)+1.)*x);}
float snoise(vec2 v){
  const vec4 C=vec4(.211324865,.366025403,-.577350269,.024390243);
  vec2 i=floor(v+dot(v,C.yy));
  vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=x0.x>x0.y?vec2(1,0):vec2(0,1);
  vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;
  i=mod289(i);
  vec3 p=permute(permute(i.y+vec3(0,i1.y,1))+i.x+vec3(0,i1.x,1));
  vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
  m=m*m*m*m;
  vec3 x=2.*fract(p*C.www)-1.;
  vec3 h=abs(x)-.5;
  vec3 a0=x-floor(x+.5);
  m*=1.79284291-.85373472*(a0*a0+h*h);
  vec3 g;
  g.x=a0.x*x0.x+h.x*x0.y;
  g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.*dot(m,g);
}

vec3 cream = vec3(0.961,0.949,0.922);
vec3 teal  = vec3(0.15,0.52,0.68);
vec3 terra = vec3(0.80,0.35,0.22);
vec3 sage  = vec3(0.28,0.62,0.54);
vec3 lteal = vec3(0.42,0.74,0.80);

void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  float t = u_t * 0.10;

  vec2 q = vec2(
    snoise(uv*2.0 + t),
    snoise(uv*2.0 + vec2(5.2,1.3) + t)
  );
  vec2 r = vec2(
    snoise(uv*2.0 + 4.0*q + vec2(1.7,9.2) + t*0.8),
    snoise(uv*2.0 + 4.0*q + vec2(8.3,2.8) + t*0.9)
  );
  float f = snoise(uv*2.0 + 4.0*r + t);

  vec3 col = cream;
  col = mix(col, teal,  smoothstep(-0.1, 0.6, f));
  col = mix(col, terra, smoothstep(0.1, 0.7, f + snoise(uv*3.0+t)));
  col = mix(col, sage,  smoothstep(0.3, 0.9, f - snoise(uv*2.5+t*1.1)));
  col = mix(col, lteal, smoothstep(-0.4, 0.2, f));

  float leftFade = smoothstep(0.12, 0.52, uv.x);
  col = mix(cream, col, leftFade);

  gl_FragColor = vec4(col, 1.0);
}
`

function GradientPlane() {
  const uniforms = useMemo(() => ({
    u_t:   { value: 0.0 },
    u_res: { value: new THREE.Vector2() }
  }), [])

  useFrame(({ clock, size }) => {
    uniforms.u_t.value = clock.getElapsedTime()
    uniforms.u_res.value.set(size.width, size.height)
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
      />
    </mesh>
  )
}

export default function HeroGradient() {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      orthographic
      camera={{ position: [0, 0, 1], near: 0, far: 1 }}
      gl={{ antialias: true }}
    >
      <GradientPlane />
    </Canvas>
  )
}
