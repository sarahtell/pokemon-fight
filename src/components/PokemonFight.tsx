import { PokemonPresentationProps } from './PokemonPresentation';
import { PokemonSvg } from './PokemonSvg';

export const PokemonFight = (props: PokemonPresentationProps) => {
  return (
    <div
      className={`w-full flex ${
        props.statsToTheLeft ? 'flex-row-reverse' : 'flex-row'
      } items-center justify-center`}
    >
      <PokemonSvg url={props.url} />
      <div
        className={`pt-8 text-center ${props.statsToTheLeft ? 'pr-8' : 'pl-8'}`}
      >
        <p className="capitalize font-bold">{props.name}</p>
        <p>
          {'HP'}: {props.skills.hp}
        </p>
        <p>
          {'Attack'}: {props.skills.attack}
        </p>
        <p>
          {'Defense'}: {props.skills.defense}
        </p>
        <p>
          {'Speed'}: {props.skills.speed}
        </p>
      </div>
    </div>
  );
};
