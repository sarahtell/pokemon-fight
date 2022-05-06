import { Series } from 'remotion';
import { PlayerComponentProps } from './PlayerComponent';
import { PokemonPresentation } from './PokemonPresentation';

export const MyVideo = (props: PlayerComponentProps) => {
  return (
    <Series>
      <Series.Sequence durationInFrames={120}>
        <PokemonPresentation name = {props.pokemon1Name} stats={props.pokemon1Stats} id={props.pokemon1Id} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={120}>
        <PokemonPresentation name = {props.pokemon2Name} stats={props.pokemon2Stats} id={props.pokemon2Id} />
      </Series.Sequence>
    </Series>
  );
};
