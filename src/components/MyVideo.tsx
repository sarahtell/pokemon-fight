import React from 'react';
import { Sequence, useCurrentFrame, Series } from 'remotion';
import { PokemonStats } from '../App';

const MovieClip1 = (props: any) => {
  const frame = useCurrentFrame();
  console.log(props);
  return (
    <div
      style={{
        flex: 1,
        textAlign: 'center',
        fontSize: '7em',
        background: 'white',
        width: '50%',
        height: '50%',
      }}
    >
      <p style={{ color: 'black' }}>
        The current Pokemon is {props.pokemonStats[0].base_stat}.{' '}
      </p>
    </div>
  );
};

const MovieClip2 = (props: any) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        flex: 1,
        textAlign: 'center',
        fontSize: `${frame}em`,
        background: 'white',
        width: '50%',
        height: '50%',
      }}
    >
      <p style={{ color: 'black' }}>
        The current Pokemon is {props.pokemonStats[1].base_stat}.{' '}
      </p>
    </div>
  );
};

export const MyVideo = (props: PokemonStats) => {
  return (
    <Series>
      <Series.Sequence durationInFrames={120}>
        <MovieClip1 pokemonStats={props} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={120}>
        <MovieClip2 pokemonStats={props} />
      </Series.Sequence>
    </Series>
  );
};
