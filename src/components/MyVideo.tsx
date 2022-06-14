import { AbsoluteFill, Series, Audio, Sequence } from 'remotion';
import { PlayerComponentProps } from './PlayerComponent';
import { PokemonIntro } from './PokemonIntro';
import { PokemonPresentation, Skills } from './PokemonPresentation';
import audio from './music/pokemon.mp3';
import { Layout } from './Layout';
import { Header } from './Header';
import { getRounds } from '../lib/round';
import { PokemonFight } from './PokemonFight';

export const MyVideo = (props: PlayerComponentProps) => {
  const pokemon1Skills: Skills = {
    hp: props.pokemon1Stats[0].base_stat || 0,
    attack: props.pokemon1Stats[1].base_stat || 0,
    defense: props.pokemon1Stats[2].base_stat || 0,
    speed: props.pokemon1Stats[5].base_stat || 0,
  };

  const pokemon2Skills: Skills = {
    hp: props.pokemon2Stats[0].base_stat || 0,
    attack: props.pokemon2Stats[1].base_stat || 0,
    defense: props.pokemon2Stats[2].base_stat || 0,
    speed: props.pokemon2Stats[5].base_stat || 0,
  };

  return (
    <>
      <Audio src={audio} volume={0.5} startFrom={100} />
      <Layout>
        <Header
          pokemon1Skills={pokemon1Skills}
          pokemon2Skills={pokemon2Skills}
          pokemon1Name={props.pokemon1Name}
          pokemon2Name={props.pokemon2Name}
        />
        <Series>
          <Series.Sequence durationInFrames={120}>
            <PokemonIntro />
          </Series.Sequence>
          <Series.Sequence durationInFrames={240}>
            <PokemonPresentation
              url1={props.pokemon1Url}
              url2={props.pokemon2Url}
              name1={props.pokemon1Name}
              name2={props.pokemon2Name}
              skills1={pokemon1Skills}
              skills2={pokemon2Skills}
              id1={props.pokemon1Id}
              id2={props.pokemon1Id}
            />
          </Series.Sequence>
          {getRounds(pokemon1Skills, pokemon2Skills, props.pokemon1Name, props.pokemon2Name
          ).map(round => {
            return (
              <Series.Sequence durationInFrames={100}>
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
              </Series.Sequence>)
          })
          }
        </Series>
      </Layout>
    </>
  );
};
