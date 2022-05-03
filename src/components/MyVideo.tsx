import { Series } from 'remotion';
import { PlayerComponentProps } from '../App';
import { PokemonPresentation } from './PokemonPresentation';

export const MyVideo = (props: PlayerComponentProps) => {
  return (
    <Series>
      <Series.Sequence durationInFrames={120}>
        <PokemonPresentation stats={props.pokemon1Stats} id={props.pokemon1Id} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={120}>
        <PokemonPresentation stats={props.pokemon2Stats} id={props.pokemon2Id} />
      </Series.Sequence>
    </Series>
  );
};
