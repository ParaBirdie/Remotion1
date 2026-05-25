import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const img = (n: string) => staticFile(`pomelli_bdna_image_0522 (${n}).png`);

export const Section4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const bgScale = interpolate(frame, [0, 240], [1.14, 1.0], {
    extrapolateRight: 'clamp',
  });

  const img2Opacity = interpolate(frame, [85, 135], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const img2Scale = interpolate(frame, [85, 240], [1.1, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const goldenOpacity = interpolate(frame, [0, 55], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const barH = interpolate(frame, [0, 35], [0, 38], {
    extrapolateRight: 'clamp',
  });

  const logoP = spring({
    frame: frame - 52,
    fps,
    config: { damping: 22, stiffness: 72, mass: 1.0 },
  });
  const logoOpacity = interpolate(logoP, [0, 0.4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const logoScale = interpolate(logoP, [0, 1], [0.82, 1.0]);
  const logoY = interpolate(logoP, [0, 1], [20, 0]);

  const lineP = spring({
    frame: frame - 80,
    fps,
    config: { damping: 28, stiffness: 80, mass: 0.75 },
  });
  const lineW = interpolate(lineP, [0, 1], [0, 220]);
  const lineOpacity = interpolate(lineP, [0, 0.3], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const tagP = spring({
    frame: frame - 98,
    fps,
    config: { damping: 24, stiffness: 70, mass: 0.9 },
  });
  const tagOpacity = interpolate(tagP, [0, 0.4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const tagY = interpolate(tagP, [0, 1], [16, 0]);

  const ctaP = spring({
    frame: frame - 130,
    fps,
    config: { damping: 24, stiffness: 70, mass: 0.9 },
  });
  const ctaOpacity = interpolate(ctaP, [0, 0.4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ctaY = interpolate(ctaP, [0, 1], [12, 0]);

  const fadeOut = interpolate(frame, [200, 240], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', overflow: 'hidden' }}>

      <AbsoluteFill
        style={{
          opacity: fadeIn,
          transform: `scale(${bgScale})`,
          transformOrigin: 'center center',
        }}
      >
        <Img src={img('53')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          opacity: img2Opacity * fadeIn,
          transform: `scale(${img2Scale})`,
          transformOrigin: 'center center',
        }}
      >
        <Img src={img('29')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at 58% 44%, rgba(255,168,44,0.5) 0%, rgba(255,108,18,0.16) 50%, transparent 72%)',
          opacity: goldenOpacity * fadeIn,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }}
      />

      <AbsoluteFill
        style={{
          background:
            'linear-gradient(to top, rgba(30,10,0,0.82) 0%, rgba(15,5,0,0.38) 32%, transparent 58%)',
          pointerEvents: 'none',
        }}
      />

      <AbsoluteFill
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 28%)',
          pointerEvents: 'none',
        }}
      />

      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 48%, rgba(0,0,0,0.52) 100%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: barH, backgroundColor: '#000', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: barH, backgroundColor: '#000', pointerEvents: 'none' }} />

      <AbsoluteFill
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}
      >
        <div style={{ textAlign: 'center' }}>

          <Img
            src={staticFile('brand_logo.png')}
            style={{
              height: 92,
              objectFit: 'contain',
              opacity: logoOpacity,
              transform: `scale(${logoScale}) translateY(${logoY}px)`,
              filter: 'drop-shadow(0 4px 22px rgba(0,0,0,0.55)) brightness(1.08)',
              display: 'block',
              margin: '0 auto',
            }}
          />

          <div
            style={{
              width: lineW,
              height: 1,
              background:
                'linear-gradient(to right, transparent, rgba(255,208,112,0.85), transparent)',
              margin: '20px auto',
              opacity: lineOpacity,
            }}
          />

          <div
            style={{
              fontSize: 19,
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontStyle: 'italic',
              color: 'rgba(255,238,205,0.92)',
              letterSpacing: '0.16em',
              opacity: tagOpacity,
              transform: `translateY(${tagY}px)`,
              textShadow: '0 1px 14px rgba(0,0,0,0.75)',
            }}
          >
            The gifts your cartner actually wants.
          </div>

          <div
            style={{
              fontSize: 13,
              fontFamily: 'Georgia, "Times New Roman", serif',
              color: 'rgba(255,255,255,0.58)',
              letterSpacing: '0.34em',
              textTransform: 'uppercase',
              marginTop: 24,
              opacity: ctaOpacity,
              transform: `translateY(${ctaY}px)`,
              textShadow: '0 1px 8px rgba(0,0,0,0.7)',
            }}
          >
            birdiegirlgolf.com
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{ backgroundColor: '#000', opacity: fadeOut, pointerEvents: 'none' }}
      />
    </AbsoluteFill>
  );
};
