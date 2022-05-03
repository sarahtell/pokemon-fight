import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

import { Player } from '@remotion/player';
import { MyVideo } from './components/MyVideo';
import { SvgTest } from './components/SvgTest';
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

type PlayerComponentProps = {
  pokemonStats: PokemonStats;
};

function PlayerComponent(props: any): any {
  return (
    <Player
      component={MyVideo}
      inputProps={props.pokemonStats}
      durationInFrames={240}
      compositionWidth={1920}
      compositionHeight={1080}
      fps={30}
      autoPlay
    />
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [pokemon1, setPokemon1] = useState('');
  const [pokemon2, setPokemon2] = useState('');
  const [pokemonStats, setPokemonStats] = useState([]);
  const [pokemonFight, setPokemonFight] = useState<any>({});

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
    const pokemon1Data = await axios.get(`${baseUrl}/pokemon/${pokemon1}`);
    const pokemon2Data = await axios.get(`${baseUrl}/pokemon/${pokemon2}`);

    setLoading(false);

    setPokemonFight({ pokemon1Data, pokemon2Data });
  }

  console.log(pokemonFight);
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
      {/* <PlayerComponent pokemonStats={pokemonStats} /> */}
      {pokemonFight !== undefined && pokemonFight.pokemon1Data && (
        <SvgTest
          svgUrl={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonFight.pokemon1Data.data.order}.svg`}
        />
      )}
    </div>
  );
}

export default App;
