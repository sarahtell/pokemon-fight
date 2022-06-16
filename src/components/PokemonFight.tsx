import React from 'react';
import { Sequence, Series, useCurrentFrame } from 'remotion';
import { RoundStats } from '../lib/round';
import { PokemonSvg } from './PokemonSvg';
import { SkillsTable } from './SkillsTable';

export type Skills = {
  [K in 'speed' | 'hp' | 'attack' | 'defense']: number;
};

export type PokemonFightProps = {
  name1: string;
  skills1: RoundStats;
  id1: number;
  url1: string;
  name2: string;
  skills2: RoundStats;
  id2: number;
  url2: string;
  attacker: string;
};

export const PokemonFight = (props: PokemonFightProps) => {
  return (
    <Series>
      <Series.Sequence durationInFrames={50}>
        <div className={`flex w-full items-center justify-center`}>
          <SkillsTable
            name={props.name1}
            skills={props.skills1}
            initialHp={(props.attacker === props.name2) ? props.skills1.initialHp : undefined}
          />
          <div className="flex w-1/2">
            <PokemonSvg
              url={props.url1}
              shouldUseAttackAnimation={props.attacker === props.name1}
            />
          </div>
        </div>
        <div className={`flex w-full items-center justify-center`}>
          <div className="flex w-1/2">
            <PokemonSvg
              url={props.url2}
              shouldUseAttackAnimation={props.attacker === props.name2}
              attackLeft
            />
          </div>
          <SkillsTable
            name={props.name2}
            skills={props.skills2}
            initialHp={(props.attacker === props.name1) ? props.skills2.initialHp : undefined}
          />
        </div>
      </Series.Sequence>
      <Series.Sequence durationInFrames={50}>
        <div className={`flex w-full items-center justify-center`}>
          <SkillsTable
            name={props.name1}
            skills={props.skills1}
            shouldUseSpring={props.attacker === props.name2}
          />
          <div className="flex w-1/2">
            <PokemonSvg
              url={props.url1}
            />
          </div>
        </div>
        <div className={`flex w-full items-center justify-center`}>
          <div className="flex w-1/2">
            <PokemonSvg
              url={props.url2}
              attackLeft
            />
          </div>
          <SkillsTable
            name={props.name2}
            skills={props.skills2}
            shouldUseSpring={props.attacker === props.name1}
          />
        </div>
      </Series.Sequence>
    </Series>
  );
};
