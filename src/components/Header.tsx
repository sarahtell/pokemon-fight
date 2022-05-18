import { Series } from 'remotion';
import { Skills } from './PokemonPresentation';
import { Title } from './Title';
import { capitalize } from 'lodash';

type Props = {
  pokemon1Skills: Skills;
  pokemon2Skills: Skills;
  pokemon1Name: string;
  pokemon2Name: string;
};

export const Header = (props: Props) => {
  function getFastestPokemon() {
    if (props.pokemon1Skills.speed >= props.pokemon2Skills.speed) {
      return capitalize(props.pokemon1Name);
    } else {
      return capitalize(props.pokemon2Name);
    }
  }
  return (
    <Series>
      <Series.Sequence offset={120} durationInFrames={120} name="pokemons">
        <Title title="Battle between:" />
      </Series.Sequence>
      <Series.Sequence durationInFrames={120}>
        <Title
          title={`${getFastestPokemon()} starts because it's the fastest Pokémon!`}
        />
      </Series.Sequence>
    </Series>
  );
};
