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

const GAP = 5;
const W = 1280;
const H = 720;
const LEFT_W = Math.round(W * 0.58);
const RIGHT_W = W - LEFT_W - GAP;
const TOP_H = Math.round(H * 0.52);
const BOT_H = H - TOP_H - GAP;

const Tile: React.FC<{
  src: string;
  enterFrame: number;
  exitFrame: number;
  tx: number;
  ty: number;
  style: React.CSSProperties;
}> = ({ src, enterFrame, exitFrame, tx, ty, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 22, stiffness: 95, mass: 0.75 },
  });

  const enterOpacity = interpolate(enter, [0, 0.3], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitOpacity = interpolate(frame, [exitFrame, exitFrame + 25], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateX = interpolate(enter, [0, 1], [tx, 0]);
  const translateY = interpolate(enter, [0, 1], [ty, 0]);
  const scale = interpolate(enter, [0, 1], [1.1, 1.0]);

  return (
    <div
      style={{
        position: 'absolute',
        overflow: 'hidden',
        opacity: Math.min(enterOpacity, exitOpacity),
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        ...style,
      }}
    >
      <Img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
};

export const Section2: React.FC = () => {
  const frame = useCurrentFrame();

  // Pastel tint over montage — fades in then out before lifestyle
  const pastelOpacity = interpolate(
    frame,
    [0, 30, 138, 160],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  // Bokeh edge vignette
  const bokehOpacity = interpolate(frame, [15, 55], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Lifestyle scene (women playing golf) fades in
  const lifestyleOpacity = interpolate(frame, [138, 172], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Ken Burns drift on lifestyle shot
  const lifestyleScale = interpolate(frame, [138, 210], [1.12, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Warm golden glow builds over lifestyle scene
  const goldenOpacity = interpolate(frame, [158, 200], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Spotlight tile (4th product) — center pop-in then fades before montage exits
  const spotEnter = spring({ frame: frame - 68, fps: 30, config: { damping: 18, stiffness: 110, mass: 0.6 } });
  const spotScale = interpolate(spotEnter, [0, 1], [0.72, 1.0]);
  const spotOpacity =
    interpolate(spotEnter, [0, 0.3], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) *
    interpolate(frame, [118, 140], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0500', overflow: 'hidden' }}>

      {/* ─── MONTAGE: 3-panel collage assembles itself ─── */}

      {/* Tile A — large left hero, slides in from left */}
      <Tile
        src={img('50')}
        enterFrame={0}
        exitFrame={138}
        tx={-90}
        ty={0}
        style={{ left: 0, top: 0, width: LEFT_W, height: H }}
      />

      {/* Tile B — top-right, slides in from top */}
      <Tile
        src={img('48')}
        enterFrame={10}
        exitFrame={138}
        tx={0}
        ty={-80}
        style={{ left: LEFT_W + GAP, top: 0, width: RIGHT_W, height: TOP_H }}
      />

      {/* Tile C — bottom-right, slides in from bottom */}
      <Tile
        src={img('49')}
        enterFrame={20}
        exitFrame={138}
        tx={0}
        ty={80}
        style={{ left: LEFT_W + GAP, top: TOP_H + GAP, width: RIGHT_W, height: BOT_H }}
      />

      {/* Spotlight tile D — 4th product pops in from center */}
      <div
        style={{
          position: 'absolute',
          left: Math.round(W / 2 - 200),
          top: Math.round(H / 2 - 145),
          width: 400,
          height: 290,
          borderRadius: 10,
          overflow: 'hidden',
          opacity: spotOpacity,
          transform: `scale(${spotScale})`,
          boxShadow: '0 24px 70px rgba(0,0,0,0.65)',
          zIndex: 10,
        }}
      >
        <Img src={img('51')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* ─── LIFESTYLE: women playing golf, sunny day ─── */}
      <AbsoluteFill
        style={{
          opacity: lifestyleOpacity,
          transform: `scale(${lifestyleScale})`,
          transformOrigin: 'center center',
        }}
      >
        <Img src={img('42')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>

      {/* Golden-hour glow on lifestyle scene */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at 62% 40%, rgba(255,175,50,0.5) 0%, rgba(255,120,20,0.15) 50%, transparent 70%)',
          opacity: goldenOpacity,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }}
      />

      {/* Pastel blush tint over montage */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(135deg, rgba(255,224,210,0.28) 0%, rgba(255,205,225,0.18) 50%, rgba(225,215,255,0.15) 100%)',
          opacity: pastelOpacity,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }}
      />

      {/* Bokeh edge vignette */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 42%, rgba(10,5,0,0.52) 100%)',
          opacity: bokehOpacity,
          pointerEvents: 'none',
        }}
      />

      {/* Bottom gradient depth */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 36%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top gradient depth */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 20%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
