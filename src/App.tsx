import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

import { Player } from '@remotion/player';
import { MyVideo } from './components/MyVideo';
import { PokemonSvg } from './components/PokemonSvg';
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

export type PlayerComponentProps = {
  pokemon1Stats: PokemonStats;
  pokemon2Stats: PokemonStats;
  pokemon1Id: number;
  pokemon2Id: number;
};

function PlayerComponent(props: PlayerComponentProps): any {
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

  // useEffect(() => {
  //   axios.get(`${baseUrl}/pokemon/pikachu`).then(res => {
  //     setLoading(false);
  //     setPokemonStats(res.data.stats);
  //   });
  // }, []);

  // if (loading || !pokemonStats) {
  //   return <p>loading</p>;
  // }

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
