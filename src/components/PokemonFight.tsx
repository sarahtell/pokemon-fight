import { useCurrentFrame } from 'remotion';
import { PokemonStats } from '../App';
import { PokemonPresentationProps } from './PokemonPresentation';


export const PokemonFight = (props: PokemonPresentationProps) => {
  const frame = useCurrentFrame();
  return (
    <div
      className={`bg-gradient-to-b from-white to-blue-500 w-full flex ${props.statsToTheLeft ? 'flex-row-reverse' : 'flex-row'} items-center justify-center`}
    >
      {props.children}
      <div className={`pt-8 text-center ${props.statsToTheLeft ? 'pr-8' : 'pl-8'}`}>
      <p className='capitalize font-bold'>{props.name}</p>
      <p>{'HP'}: {props.skills.hp}</p>
      <p>{"Attack"}: {props.skills.attack}</p>
      <p>{"Defense"}: {props.skills.defense}</p>
      <p>{"Speed"}: {props.skills.speed}</p>
      </div>
    </div>
  );
};
