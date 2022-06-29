import { Player } from '@remotion/player';
import { PokemonStats, Skills } from '../App';
import { getRounds, Round } from '../lib/round';
import { MyVideo } from './MyVideo';

export type PlayerComponentProps = {
  pokemon1Name: string;
  pokemon2Name: string;
  pokemon1Skills: Skills;
  pokemon2Skills: Skills;
  pokemon2Url: string;
  pokemon1Url: string;
  pokemon1Id: number;
  pokemon2Id: number;
  loading: boolean;
  error: string | undefined;
};

export const POKEMON_INTRO_LENGTH = 120;
export const POKEMON_PRESENTATION_LENGTH = 240;
export const POKEMON_ROUND_LENGTH = 100;
export const POKEMON_WINNER_LENGTH = 200;

function calculateLengthOfVideo(rounds: Round[]): number {
  let videoLength: number = 0;

  videoLength += POKEMON_INTRO_LENGTH + POKEMON_PRESENTATION_LENGTH;

  rounds.forEach(r => {
    videoLength += POKEMON_ROUND_LENGTH;
  });

  videoLength += POKEMON_WINNER_LENGTH;

  return videoLength;
}

export function PlayerComponent(props: PlayerComponentProps): any {
  const rounds = getRounds(
    props.pokemon1Skills,
    props.pokemon2Skills,
    props.pokemon1Name,
    props.pokemon2Name
  );

  return (
    <Player
      component={MyVideo}
      inputProps={{ ...props, rounds }}
      durationInFrames={calculateLengthOfVideo(rounds)}
      compositionWidth={1080}
      compositionHeight={600}
      fps={30}
      autoPlay
      controls
    />
  );
}
