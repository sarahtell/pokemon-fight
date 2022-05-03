import { useCurrentFrame } from 'remotion';
import { PokemonStats } from '../App';
import { PokemonSvg } from './PokemonSvg';

type PokemonPresentationProps = {
  stats: PokemonStats;
  id: number;
};

export const PokemonPresentation = (props: PokemonPresentationProps) => {
  const frame = useCurrentFrame();
  console.log(props);
  return (
    <div
      style={{
        flex: 1,
        textAlign: 'center',
        fontSize: '7em',
        background: 'red',
        width: '100%',
        height: '100%',
      }}
    >
      <PokemonSvg
        svgUrl={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${props.id}.svg`}
      />
    </div>
  );
};
