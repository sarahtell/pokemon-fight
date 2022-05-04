import { Player } from '@remotion/player';
import { PokemonStats } from '../App';
import { MyVideo } from './MyVideo';

export type PlayerComponentProps = {
  pokemon1Stats: PokemonStats;
  pokemon2Stats: PokemonStats;
  pokemon1Id: number;
  pokemon2Id: number;
};

export function PlayerComponent(props: PlayerComponentProps): any {
  return (
    <Player
      component={MyVideo}
      inputProps={props}
      durationInFrames={240}
      compositionWidth={420}
      compositionHeight={600}
      fps={30}
      // autoPlay
      controls
    />
  );
}
