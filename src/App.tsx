import { Player } from '@remotion/player';
import axios from 'axios';
import { useState } from 'react';
import { PlayerComponent } from './components/PlayerComponent';

const baseUrl = 'https://pokeapi.co/api/v2';

type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};




export type PokemonStats = PokemonStat[];

type PokemonData = {
  stats: PokemonStats;
  id: number;
};

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [pokemon1, setPokemon1] = useState<string>('');
  const [pokemon2, setPokemon2] = useState<string>('');
  const [pokemon1Data, setPokemon1Data] = useState<PokemonData>();
  const [pokemon2Data, setPokemon2Data] = useState<PokemonData>();

  async function handleSubmit(e: any) {
    e.preventDefault();

    setLoading(true);

    const pokemon1Data = await axios.get(`${baseUrl}/pokemon/${pokemon1}`);
    const pokemon2Data = await axios.get(`${baseUrl}/pokemon/${pokemon2}`);

    setPokemon1Data({
      stats: pokemon1Data.data.stats,
      id: pokemon1Data.data.id,
    });
    setPokemon2Data({
      stats: pokemon2Data.data.stats,
      id: pokemon2Data.data.id,
    });

    setLoading(false);
  }

  return (
    <div style={{ background: 'black' }}>
      <form onSubmit={handleSubmit}>
        <input
          onChange={e => setPokemon1(e.target.value)}
          type="text"
          name="pokemon1"
        />
        <input
          onChange={e => setPokemon2(e.target.value)}
          type="text"
          name="pokemon2"
        />
        <button type="submit">Button</button>
      </form>

      {loading ? (
        <p>loading</p>
      ) : (
        pokemon1Data &&
        pokemon2Data && (
          <PlayerComponent
            pokemon1Id={pokemon1Data.id}
            pokemon1Stats={pokemon1Data.stats}
            pokemon2Id={pokemon2Data.id}
            pokemon2Stats={pokemon2Data.stats}
          />
        )
      )}
    </div>
  );
}

export default App;
