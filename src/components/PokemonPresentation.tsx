import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { PokemonStats, Skills } from '../App';
import { PokemonSvg } from './PokemonSvg';
import { SkillsTable } from './SkillsTable';


export type PokemonPresentationProps = {
  name1: string;
  skills1: Skills;
  id1: number;
  url1: string;
  name2: string;
  skills2: Skills;
  id2: number;
  url2: string;
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

  return (
    <React.Fragment>
      <div
        className={`flex w-full items-center justify-center`}
      >
        <SkillsTable name={props.name1} skills={props.skills1} shouldUseOpacity/>
        <div
          className="flex w-1/2"
          style={{
            transform: `translateX(${-config.width / 2 + (config.width / 2) * translate
              }px)`,
          }}
        >
          <PokemonSvg url={props.url1} />
        </div>
      </div>
      <div
        className={`flex w-full items-center justify-center`}
      >
        <div
          className="flex w-1/2"
          style={{
            transform: `translateX(${config.width / 2 - (config.width / 2) * translate
              }px)`,
          }}
        >
          <PokemonSvg url={props.url2} />
        </div>
        <SkillsTable name={props.name2} skills={props.skills2} shouldUseOpacity/>
      </div>
    </React.Fragment>
  );
};
