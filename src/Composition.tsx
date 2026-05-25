import { Sequence } from 'remotion';
import { Section1 } from './sections/Section1';
import { Section2 } from './sections/Section2';
import { Section3 } from './sections/Section3';

export const MyComposition: React.FC = () => {
  return (
    <>
      <Sequence from={0} durationInFrames={240}>
        <Section3 />
      </Sequence>
      <Sequence from={240} durationInFrames={210}>
        <Section1 />
      </Sequence>
      <Sequence from={450} durationInFrames={210}>
        <Section2 />
      </Sequence>
    </>
  );
};
