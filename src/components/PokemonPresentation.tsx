import { useCurrentFrame } from 'remotion';
import { PokemonStats } from '../App';
import { PokemonSvg } from './PokemonSvg';

type PokemonPresentationProps = {
  name: string
  stats: PokemonStats;
  id: number;
};

export const PokemonPresentation = (props: PokemonPresentationProps) => {
  const frame = useCurrentFrame();
  return (
    <div
      className='bg-gradient-to-b from-white to-blue-500 w-full flex items-center justify-center'
    >
      <PokemonSvg
        svgUrl={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${props.id}.svg`}
      />
      <div><p className='capitalize font-bold pl-8 text-center'>{props.name}</p>
      <p className='uppercase pl-8 text-center'>{props.stats[0].stat.name}: {props.stats[0].base_stat}</p>
      <p className='capitalize pl-8 text-center'>{props.stats[1].stat.name}: {props.stats[1].base_stat}</p>
      <p className='capitalize pl-8 text-center'>{props.stats[2].stat.name}: {props.stats[2].base_stat}</p>
      <p className='capitalize pl-8 text-center'>{props.stats[5].stat.name}: {props.stats[5].base_stat}</p></div>
    </div>
  );
};
