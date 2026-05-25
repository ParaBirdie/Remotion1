import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';

const img = (n: string) =>
  staticFile(`pomelli_bdna_image_0522 (${n}).png`);

const Shot: React.FC<{
  src: string;
  fadeIn: number;
  fadeOut: number;
  end: number;
  panDir: number;
}> = ({ src, fadeIn, fadeOut, end, panDir }) => {
  const frame = useCurrentFrame();
  const fadeLen = 22;

  const opacity = interpolate(
    frame,
    [fadeIn, fadeIn + fadeLen, fadeOut, end],
    [0, 1, 1, fadeOut === end ? 1 : 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
  const panX = interpolate(frame, [fadeIn, end], [panDir * 4, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(frame, [fadeIn, end], [1.13, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `scale(${scale}) translateX(${panX}%)`,
        transformOrigin: 'center center',
      }}
    >
      <Img
        src={src}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </AbsoluteFill>
  );
};

export const Section2: React.FC = () => {
  const frame = useCurrentFrame();

  // Pastel morning tint builds in over first 40 frames
  const pastelOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Bokeh edge blur fades in
  const bokehOpacity = interpolate(frame, [20, 60], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#f0e8e2', overflow: 'hidden' }}>
      {/* Shot 1 — premium product close-up, pan left */}
      <Shot src={img('31')} fadeIn={0}   fadeOut={58}  end={78}  panDir={-1} />
      {/* Shot 2 — chic accessory detail, pan right */}
      <Shot src={img('37')} fadeIn={52}  fadeOut={118} end={138} panDir={1}  />
      {/* Shot 3 — woman on course, morning sunlight, pan left */}
      <Shot src={img('39')} fadeIn={112} fadeOut={168} end={188} panDir={-1} />
      {/* Shot 4 — 4 women playing golf under sunlight, pan right, holds to end */}
      <Shot src={img('42')} fadeIn={162} fadeOut={210} end={210} panDir={1}  />

      {/* Soft pastel morning tint — peach / blush / lavender */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(135deg, rgba(255,224,210,0.30) 0%, rgba(255,205,225,0.20) 50%, rgba(225,215,255,0.18) 100%)',
          opacity: pastelOpacity,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }}
      />

      {/* Bokeh radial vignette — soft lens blur simulation */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 42%, rgba(240,232,226,0.55) 100%)',
          opacity: bokehOpacity,
          pointerEvents: 'none',
        }}
      />

      {/* Bottom gradient depth */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 38%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top gradient depth */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, transparent 22%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
