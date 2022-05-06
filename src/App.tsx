import { Player } from '@remotion/player';
import axios from 'axios';
import { Console } from 'console';
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
  console.log(pokemon1)
  return (
    <div style={{ background: 'white' }}>
      <form onSubmit={handleSubmit}>
        <input 
        className="
          form-control
          block
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white
          bg-clip-padding
          border
          border-solid
          border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700
          focus:bg-white
          focus:border-blue-600 
          focus:outline-none"
          onChange={e => setPokemon1(e.target.value)}
          type="text"
          name="pokemon1"
          placeholder="First Pokémon"
        />
        <input 
        className="
          form-control
          block
          px-3
          py-1.5
          text-base
          font-normal
         text-gray-700
         bg-white 
          bg-clip-padding
          border
          border-solid
         border-gray-300
          rounded
          transition
          ease-in-out
          m-0
         focus:text-gray-700
         focus:bg-white
         focus:border-blue-600 
         focus:outline-none"
          onChange={e => setPokemon2(e.target.value)}
          type="text"
          name="pokemon2"
          placeholder="Second Pokémon"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">FIGHT!</button>
      </form>

      {loading ? (
        <p>loading</p>
      ) : (
        pokemon1Data &&
        pokemon2Data && (
          <PlayerComponent
            pokemon1Name={pokemon1}
            pokemon1Id={pokemon1Data.id}
            pokemon1Stats={pokemon1Data.stats}
            pokemon2Name={pokemon2}
            pokemon2Id={pokemon2Data.id}
            pokemon2Stats={pokemon2Data.stats}
          />
        )
      )}
    </div>
  );
}

export default App;
