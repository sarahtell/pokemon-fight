import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { PokemonStats } from '../App';
import { PokemonSvg } from './PokemonSvg';

export type Skills = {
  [K in 'speed' | 'hp' | 'attack' | 'defense']: number;
};

export type PokemonPresentationProps = {
  name: string;
  stats: PokemonStats;
  skills: Skills;
  statsToTheLeft?: boolean;
  willStartFight?: boolean;
  diffOpponentAttackSelfDefense?: number;
  id: number;
  url: string;
};

export const PokemonPresentation = (props: PokemonPresentationProps) => {
  const frame = useCurrentFrame();
  const config = useVideoConfig();
  const translate = interpolate(
    frame,
    [
      0,
      50,
      config.durationInFrames,
    ],
    [0, 1, 1]
  );
  const opacity = interpolate(
    frame,
    [50, 100],
    [0, 1]
  );
  return (
    <div
      className={`flex w-full ${
        props.statsToTheLeft ? 'flex-row-reverse' : 'flex-row'
      } items-center justify-center`}
    >
      <div
        className="flex w-1/2"
        style={{
          transform: `translateX(${
            props.statsToTheLeft
              ? -config.width / 2 + (config.width / 2) * translate
              : config.width / 2 - (config.width / 2) * translate
          }px)`,
        }}
      >
        <PokemonSvg url={props.url} />
      </div>
      <div
        className={`pt-8 text-center ${props.statsToTheLeft ? 'pr-8' : 'pl-8'}`}
        style={{ opacity }}
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
