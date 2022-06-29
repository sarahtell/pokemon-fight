import { Composition } from 'remotion';
import { MyVideo } from '../components/MyVideo';
import pokemonProps from '../../pokemon.json';
import { getRounds } from '../lib/round';
import { Skills } from '../App';

export const PokemonVideo = () => {
  const pokemon1Skills: Skills = {
    hp: pokemonProps.pokemon1Stats[0].base_stat || 0,
    attack: pokemonProps.pokemon1Stats[1].base_stat || 0,
    defense: pokemonProps.pokemon1Stats[2].base_stat || 0,
    speed: pokemonProps.pokemon1Stats[5].base_stat || 0,
  };

  const pokemon2Skills: Skills = {
    hp: pokemonProps.pokemon2Stats[0].base_stat || 0,
    attack: pokemonProps.pokemon2Stats[1].base_stat || 0,
    defense: pokemonProps.pokemon2Stats[2].base_stat || 0,
    speed: pokemonProps.pokemon2Stats[5].base_stat || 0,
  };

  const rounds = getRounds(
    pokemon1Skills,
    pokemon2Skills,
    pokemonProps.pokemon1Name,
    pokemonProps.pokemon2Name
  );

  return (
    <>
      <Composition
        component={MyVideo}
        durationInFrames={1300}
        width={1080}
        height={600}
        fps={30}
        id="my-comp"
        defaultProps={{
          ...pokemonProps,
          pokemon1Skills,
          pokemon2Skills,
          rounds,
        }}
      />
    </>
  );
};
