import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const Section1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Base image: slow Ken Burns zoom out + pan right → left
  const baseScale = interpolate(frame, [0, 210], [1.18, 1.0], {
    extrapolateRight: 'clamp',
  });
  const basePanX = interpolate(frame, [0, 210], [4, 0], {
    extrapolateRight: 'clamp',
  });

  // Bright image: cross-dissolves in, pans left → center
  const brightOpacity = interpolate(frame, [30, 105], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const brightScale = interpolate(frame, [30, 210], [1.14, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const brightPanX = interpolate(frame, [30, 210], [-4, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Dark vignette fades out as scene opens
  const darkOverlay = interpolate(frame, [0, 75], [0.9, 0], {
    extrapolateRight: 'clamp',
  });

  // Warm golden-hour radial glow builds in
  const goldenOpacity = interpolate(frame, [75, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Logo springs up from below
  const logoProgress = spring({
    frame: frame - 135,
    fps,
    config: { damping: 20, stiffness: 80, mass: 0.9 },
  });
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);
  const logoY = interpolate(logoProgress, [0, 1], [30, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0500', overflow: 'hidden' }}>
      {/* Dark traditional golf image — opening shot */}
      <AbsoluteFill
        style={{
          transform: `scale(${baseScale}) translateX(${basePanX}%)`,
          transformOrigin: 'center center',
        }}
      >
        <Img
          src={staticFile('pomelli_bdna_image_0522 (30).png')}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </AbsoluteFill>

      {/* Bright sun-drenched golf green — transition layer */}
      <AbsoluteFill
        style={{
          opacity: brightOpacity,
          transform: `scale(${brightScale}) translateX(${brightPanX}%)`,
          transformOrigin: 'center center',
        }}
      >
        <Img
          src={staticFile('pomelli_bdna_image_0522 (33).png')}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </AbsoluteFill>

      {/* Opening darkness fades out */}
      <AbsoluteFill
        style={{
          backgroundColor: 'rgba(10,5,0,1)',
          opacity: darkOverlay,
          pointerEvents: 'none',
        }}
      />

      {/* Golden hour warm radial glow */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at 65% 38%, rgba(255,172,48,0.5) 0%, rgba(255,120,20,0.15) 45%, transparent 70%)',
          opacity: goldenOpacity,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }}
      />

      {/* Subtle bottom vignette for depth */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 40%)',
          pointerEvents: 'none',
        }}
      />

      {/* Brand logo — springs in at 4.5s */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: 52,
          pointerEvents: 'none',
        }}
      >
        <Img
          src={staticFile('brand_logo.png')}
          style={{
            height: 68,
            objectFit: 'contain',
            opacity: logoOpacity,
            transform: `translateY(${logoY}px)`,
            filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.4))',
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
