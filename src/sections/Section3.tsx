import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

// Quadratic bezier point calculator
const qBez = (
  t: number,
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
): [number, number] => [
  (1 - t) * (1 - t) * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0],
  (1 - t) * (1 - t) * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1],
];

const IMPACT: [number, number] = [640, 488];

export const Section3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Background: amber → golden → vibrant green ─────────────────────────────
  const bgP = interpolate(frame, [0, 90, 190, 240], [0, 0.35, 0.78, 1], {
    extrapolateRight: 'clamp',
  });
  const bgTopR = Math.round(interpolate(bgP, [0, 0.35, 1], [175, 205, 48]));
  const bgTopG = Math.round(interpolate(bgP, [0, 0.35, 1], [82, 145, 152]));
  const bgTopB = Math.round(interpolate(bgP, [0, 0.35, 1], [15, 28, 42]));
  const bgBotR = Math.round(interpolate(bgP, [0, 0.35, 1], [88, 148, 22]));
  const bgBotG = Math.round(interpolate(bgP, [0, 0.35, 1], [38, 85, 92]));
  const bgBotB = Math.round(interpolate(bgP, [0, 0.35, 1], [6, 15, 15]));

  // ── Sun ─────────────────────────────────────────────────────────────────────
  const sunOpacity = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: 'clamp' });
  const sunPulse = 1 + 0.025 * Math.sin((frame / fps) * Math.PI * 1.8);

  // ── Grass ───────────────────────────────────────────────────────────────────
  const grassOpacity = interpolate(frame, [0, 55], [0, 1], { extrapolateRight: 'clamp' });

  // ── Swing arc (draws from frame 12 through ~frame 95) ────────────────────────
  const arcProgress = spring({
    frame: frame - 12,
    fps,
    config: { damping: 30, stiffness: 52, mass: 1.4 },
  });
  const ARC_LEN = 1150;
  const arcDashOffset = interpolate(arcProgress, [0, 1], [ARC_LEN, 0]);
  const arcOpacity = interpolate(frame, [12, 30, 160, 185], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ── Impact burst at frame 80 ─────────────────────────────────────────────────
  const burstP = spring({
    frame: frame - 80,
    fps,
    config: { damping: 18, stiffness: 220, mass: 0.35 },
  });
  const burstOpacity = interpolate(burstP, [0, 0.25, 0.7, 1], [0, 1, 0.7, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const burst1R = interpolate(burstP, [0, 1], [0, 130]);
  const burst2R = interpolate(burstP, [0, 1], [0, 75]);
  const burst3R = interpolate(burstP, [0, 1], [0, 220]);

  // ── Ball trajectory from impact ──────────────────────────────────────────────
  const ballP = spring({
    frame: frame - 83,
    fps,
    config: { damping: 42, stiffness: 95, mass: 0.45 },
  });
  const [ballX, ballY] = qBez(ballP, IMPACT, [950, 20], [1380, 310]);
  const ballOpacity = interpolate(frame, [83, 94, 195, 215], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ── Sparkles ─────────────────────────────────────────────────────────────────
  const sparks = [
    { x: 575, y: 425, d: 83, s: 7 },
    { x: 652, y: 462, d: 87, s: 5 },
    { x: 710, y: 432, d: 85, s: 9 },
    { x: 618, y: 392, d: 91, s: 5 },
    { x: 738, y: 415, d: 93, s: 6 },
    { x: 555, y: 452, d: 89, s: 4 },
    { x: 685, y: 378, d: 88, s: 8 },
    { x: 760, y: 468, d: 95, s: 5 },
    { x: 605, y: 442, d: 86, s: 6 },
  ];

  // ── Typography ───────────────────────────────────────────────────────────────
  const line1 = spring({ frame: frame - 112, fps, config: { damping: 22, stiffness: 78, mass: 0.9 } });
  const line2 = spring({ frame: frame - 138, fps, config: { damping: 22, stiffness: 78, mass: 0.9 } });
  const line3 = spring({ frame: frame - 164, fps, config: { damping: 22, stiffness: 78, mass: 0.9 } });

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>

      {/* Animated gradient background */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(158deg, rgb(${bgTopR},${bgTopG},${bgTopB}) 0%, rgb(${bgBotR},${bgBotG},${bgBotB}) 100%)`,
        }}
      />

      {/* Sun glow */}
      <AbsoluteFill style={{ opacity: sunOpacity, pointerEvents: 'none' }}>
        <div
          style={{
            position: 'absolute',
            right: 148,
            top: 72,
            width: 88,
            height: 88,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, #fffde0 0%, #ffd840 38%, #ffaa00 72%, transparent 100%)',
            transform: `scale(${sunPulse})`,
            boxShadow: '0 0 90px 36px rgba(255,200,50,0.38)',
          }}
        />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              right: 186,
              top: 68,
              width: 2.5,
              height: 240,
              background:
                'linear-gradient(to bottom, rgba(255,210,60,0.45), transparent)',
              transformOrigin: '50% 0%',
              transform: `rotate(${i * 45}deg) translateX(-50%)`,
            }}
          />
        ))}
      </AbsoluteFill>

      {/* Grass silhouette */}
      <AbsoluteFill style={{ opacity: grassOpacity, pointerEvents: 'none' }}>
        <svg
          viewBox="0 0 1280 720"
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        >
          <path
            d="M0 672 Q80 640 160 658 Q260 624 360 648 Q480 615 600 640 Q720 618 840 642 Q960 618 1080 640 Q1180 626 1280 644 L1280 720 L0 720 Z"
            fill="rgba(28,76,28,0.72)"
          />
          <path
            d="M0 698 Q120 678 240 693 Q400 668 560 688 Q720 668 880 690 Q1040 672 1200 688 L1280 692 L1280 720 L0 720 Z"
            fill="rgba(18,58,18,0.88)"
          />
        </svg>
      </AbsoluteFill>

      {/* SVG layer: arc + burst + ball */}
      <AbsoluteFill style={{ pointerEvents: 'none' }}>
        <svg
          viewBox="0 0 1280 720"
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        >
          {/* Swing arc glow */}
          <path
            d="M 298 145 C 375 395 510 545 640 488 C 765 432 922 348 1005 195"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={ARC_LEN}
            strokeDashoffset={arcDashOffset}
            opacity={arcOpacity}
          />
          {/* Swing arc sharp line */}
          <path
            d="M 298 145 C 375 395 510 545 640 488 C 765 432 922 348 1005 195"
            fill="none"
            stroke="rgba(255,215,70,0.9)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={ARC_LEN}
            strokeDashoffset={arcDashOffset}
            opacity={arcOpacity}
            style={{ filter: 'drop-shadow(0 0 7px rgba(255,200,40,0.8))' }}
          />

          {/* Impact burst rings */}
          <circle cx={IMPACT[0]} cy={IMPACT[1]} r={burst1R} fill="none" stroke={`rgba(255,220,55,${burstOpacity * 0.85})`} strokeWidth="2.5" />
          <circle cx={IMPACT[0]} cy={IMPACT[1]} r={burst2R} fill="none" stroke={`rgba(255,255,190,${burstOpacity})`}       strokeWidth="3.2" />
          <circle cx={IMPACT[0]} cy={IMPACT[1]} r={burst3R} fill="none" stroke={`rgba(255,175,28,${burstOpacity * 0.38})`} strokeWidth="1.5" />
          {/* Inner flash */}
          <circle
            cx={IMPACT[0]}
            cy={IMPACT[1]}
            r={interpolate(burstP, [0, 0.2, 1], [0, 22, 8])}
            fill={`rgba(255,250,200,${interpolate(burstP, [0, 0.15, 0.5, 1], [0, 1, 0.6, 0])})`}
          />

          {/* Golf ball */}
          <circle
            cx={ballX}
            cy={ballY}
            r={7}
            fill="white"
            opacity={ballOpacity}
            style={{ filter: 'drop-shadow(0 0 9px rgba(255,255,255,1))' }}
          />
          {/* Ball trail */}
          <circle cx={ballX - 12} cy={ballY + 4}  r={4}   fill={`rgba(255,255,255,${ballOpacity * 0.4})`} />
          <circle cx={ballX - 24} cy={ballY + 8}  r={2.5} fill={`rgba(255,255,255,${ballOpacity * 0.2})`} />
        </svg>
      </AbsoluteFill>

      {/* Sparkles after impact */}
      {sparks.map((s, i) => {
        const sp = spring({
          frame: frame - s.d,
          fps,
          config: { damping: 14, stiffness: 42, mass: 0.75 },
        });
        const so = interpolate(sp, [0, 0.25, 0.75, 1], [0, 1, 0.8, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: s.x,
              top: s.y,
              width: s.s,
              height: s.s,
              borderRadius: '50%',
              background: '#ffd840',
              opacity: so,
              transform: `translateY(${interpolate(sp, [0, 1], [0, -100 - i * 10])}px)`,
              boxShadow: `0 0 ${s.s * 3}px rgba(255,215,60,0.85)`,
              pointerEvents: 'none',
            }}
          />
        );
      })}

      {/* Typography */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div style={{ textAlign: 'center', marginTop: -52, userSelect: 'none' }}>
          <div
            style={{
              fontSize: 68,
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontStyle: 'italic',
              fontWeight: '400',
              color: '#ffffff',
              letterSpacing: '0.05em',
              lineHeight: 1.1,
              opacity: interpolate(line1, [0, 0.4], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              transform: `translateY(${interpolate(line1, [0, 1], [28, 0])}px)`,
              textShadow: '0 2px 24px rgba(0,0,0,0.55)',
            }}
          >
            Style in
          </div>
          <div
            style={{
              fontSize: 100,
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: '700',
              color: '#ffd840',
              letterSpacing: '0.1em',
              lineHeight: 0.95,
              opacity: interpolate(line2, [0, 0.4], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              transform: `translateY(${interpolate(line2, [0, 1], [28, 0])}px)`,
              textShadow:
                '0 0 50px rgba(255,210,40,0.65), 0 2px 24px rgba(0,0,0,0.55)',
            }}
          >
            MOTION
          </div>
          <div
            style={{
              fontSize: 22,
              fontFamily: 'Georgia, "Times New Roman", serif',
              color: 'rgba(255,255,255,0.82)',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              marginTop: 20,
              opacity: interpolate(line3, [0, 0.4], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              transform: `translateY(${interpolate(line3, [0, 1], [18, 0])}px)`,
              textShadow: '0 1px 12px rgba(0,0,0,0.5)',
            }}
          >
            Birdie Girl
          </div>
        </div>
      </AbsoluteFill>

      {/* Bottom vignette */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.62) 0%, transparent 38%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top vignette */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, transparent 24%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
