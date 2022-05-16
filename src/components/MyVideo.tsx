import { AbsoluteFill, Series, Audio, Sequence } from 'remotion';
import { PlayerComponentProps } from './PlayerComponent';
import { PokemonFight } from './PokemonFight';
import { PokemonIntro } from './PokemonIntro';
import { PokemonPresentation, Skills } from './PokemonPresentation';
import audio from './music/pokemon.mp3';
import { Layout } from './Layout';
import { Header } from './Header';

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

  function getRounds(
    pokemon1Skills: Skills,
    pokemon2Skills: Skills,
    pokemon1Name: String,
    pokemon2Name: String
  ): any[] {
    let rounds = [];

    if (pokemon1Skills?.speed >= pokemon2Skills?.speed) {
      rounds.push({
        attacker: pokemon1Name,
        pokemon1Skills: pokemon1Skills,
        pokemon2Skills: {
          ...pokemon2Skills,
          hp: pokemon2Skills?.hp - pokemon1Skills?.attack,
        },
      });
    } else {
      rounds.push({
        attacker: pokemon2Name,
        pokemon1Skills: {
          ...pokemon1Skills,
          hp: pokemon1Skills?.hp - pokemon2Skills?.attack,
        },
        pokemon2Skills: pokemon2Skills,
      });
    }

    while (
      rounds[rounds.length - 1]?.pokemon1Skills.hp > 0 &&
      rounds[rounds.length - 1]?.pokemon2Skills.hp > 0
    ) {
      if (rounds[rounds.length - 1].attacker === pokemon1Name) {
        rounds.push({
          attacker: pokemon2Name,
          pokemon1Skills: {
            ...pokemon1Skills,
            hp: pokemon1Skills.hp - pokemon2Skills.attack,
          },
          pokemon2Skills: pokemon2Skills,
        });
      } else {
        rounds.push({
          attacker: pokemon1Name,
          pokemon1Skills: pokemon1Skills,
          pokemon2Skills: {
            ...pokemon2Skills,
            hp: pokemon2Skills.hp - pokemon1Skills.attack,
          },
        });
      }
      if (rounds.length > 5) {
        return rounds;
      }
    }

    return rounds;
  }

  console.log(
    getRounds(
      pokemon1Skills,
      pokemon2Skills,
      props.pokemon1Name,
      props.pokemon2Name
    )
  );

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
          <Series.Sequence durationInFrames={1800}>
            <PokemonPresentation
              url={props.pokemon1Url}
              name={props.pokemon1Name}
              skills={pokemon1Skills}
              stats={props.pokemon1Stats}
              id={props.pokemon1Id}
              statsToTheLeft
            />
            <PokemonPresentation
              url={props.pokemon2Url}
              name={props.pokemon2Name}
              skills={pokemon2Skills}
              stats={props.pokemon2Stats}
              id={props.pokemon2Id}
            />
          </Series.Sequence>
        </Series>
      </Layout>
    </>
  );
};
