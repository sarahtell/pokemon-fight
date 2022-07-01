import { Audio, Series, staticFile } from 'remotion';
import { Round } from '../lib/round';
import { Header } from './Header';
import { Layout } from './Layout';
import {
  PlayerComponentProps,
  POKEMON_INTRO_LENGTH,
  POKEMON_PRESENTATION_LENGTH,
  POKEMON_ROUND_LENGTH,
  POKEMON_WINNER_LENGTH,
} from './PlayerComponent';
import { PokemonFight } from './PokemonFight';
import { PokemonIntro } from './PokemonIntro';
import { PokemonPresentation } from './PokemonPresentation';
import { PokemonWinner } from './PokemonWinner';

export const MyVideo = (props: PlayerComponentProps & { rounds: Round[] }) => {
  const lastRound = props.rounds[props.rounds.length - 1];

  return (
    <>
      <Audio src={staticFile('pokemon.mp3')} volume={0.5} startFrom={100} />
      <Layout>
        <Header
          pokemon1Skills={props.pokemon1Skills}
          pokemon2Skills={props.pokemon2Skills}
          pokemon1Name={props.pokemon1Name}
          pokemon2Name={props.pokemon2Name}
        />
        <Series>
          <Series.Sequence durationInFrames={POKEMON_INTRO_LENGTH}>
            <PokemonIntro />
          </Series.Sequence>
          <Series.Sequence durationInFrames={POKEMON_PRESENTATION_LENGTH}>
            <PokemonPresentation
              url1={props.pokemon1Url}
              url2={props.pokemon2Url}
              name1={props.pokemon1Name}
              name2={props.pokemon2Name}
              skills1={props.pokemon1Skills}
              skills2={props.pokemon2Skills}
              id1={props.pokemon1Id}
              id2={props.pokemon1Id}
            />
          </Series.Sequence>
          {props.rounds.map(round => {
            return (
              <Series.Sequence durationInFrames={POKEMON_ROUND_LENGTH}>
                <PokemonFight
                  url1={props.pokemon1Url}
                  url2={props.pokemon2Url}
                  name1={props.pokemon1Name}
                  name2={props.pokemon2Name}
                  skills1={round.pokemon1Skills}
                  skills2={round.pokemon2Skills}
                  id1={props.pokemon1Id}
                  id2={props.pokemon1Id}
                  attacker={round.attacker}
                />
              </Series.Sequence>
            );
          })}
          <Series.Sequence durationInFrames={POKEMON_WINNER_LENGTH}>
            <PokemonWinner
              pokemon1Skills={lastRound.pokemon1Skills}
              pokemon2Skills={lastRound.pokemon2Skills}
              url1={props.pokemon1Url}
              url2={props.pokemon2Url}
              name1={props.pokemon1Name}
              name2={props.pokemon2Name}
            />
          </Series.Sequence>
        </Series>
      </Layout>
    </>
  );
};
