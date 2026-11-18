export default function HeroBlobs() {
  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: 'rgba(27,58,75,0.12)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
          top: -100,
          right: -60,
          animation: 'blob-a 14s ease-in-out infinite alternate',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 380,
          height: 380,
          borderRadius: '50%',
          background: 'rgba(196,82,60,0.10)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
          bottom: -80,
          left: -60,
          animation: 'blob-b 18s ease-in-out infinite alternate',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 280,
          height: 280,
          borderRadius: '50%',
          background: 'rgba(27,58,75,0.08)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
          top: '30%',
          left: '40%',
          animation: 'blob-c 11s ease-in-out infinite alternate',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'rgba(196,82,60,0.07)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
          top: '10%',
          left: '25%',
          animation: 'blob-d 20s ease-in-out infinite alternate',
        }}
      />
    </>
  )
}
