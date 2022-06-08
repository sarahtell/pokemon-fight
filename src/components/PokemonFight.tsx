import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { PokemonStats } from '../App';
import { PokemonSvg } from './PokemonSvg';

export type Skills = {
  [K in 'speed' | 'hp' | 'attack' | 'defense']: number;
};

export type PokemonFightProps = {
  name: string;
  stats: PokemonStats;
  skills: Skills;
  statsToTheLeft?: boolean;
  willStartFight?: boolean;
  diffOpponentAttackSelfDefense?: number;
  id: number;
  url: string;
};

export const PokemonFight = (props: PokemonFightProps) => {
  const frame = useCurrentFrame();
  const config = useVideoConfig();
  return (
    <div
      className={`flex w-full ${
        props.statsToTheLeft ? 'flex-row-reverse' : 'flex-row'
      } items-center justify-center`}
    >
      <div
        className="flex w-1/2"
      >
        <PokemonSvg url={props.url} />
      </div>
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
