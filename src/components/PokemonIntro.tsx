import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { PokemonSvg } from './PokemonSvg';

export const PokemonIntro = (props: any) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();

  const springValue = spring({
    frame,
    from: 0,
    to: 1,
    fps: videoConfig.fps,
    config: {
      stiffness: 100,
    },
  });
  return (
    <div className="bg-gradient-to-b from-white to-blue-500 w-full flex items-center justify-center">
      <div style={{ transform: `scale(${springValue})` }}>
        <PokemonSvg
          url={`https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg`}
        />
      </div>
    </div>
  );
};
