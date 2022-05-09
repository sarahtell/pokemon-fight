import { Player } from '@remotion/player';
import axios from 'axios';
import React, { useState } from 'react';
import Form from './components/Form';
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
  const [fightStarted, setFightStarted] = useState<boolean>(false);
  const [pokemon1, setPokemon1] = useState<string>('');
  const [pokemon2, setPokemon2] = useState<string>('');
  const [pokemon1Data, setPokemon1Data] = useState<PokemonData>();
  const [pokemon2Data, setPokemon2Data] = useState<PokemonData>();

  function handleOnchange1(e: React.ChangeEvent<HTMLInputElement>) {
    setPokemon1(e.target.value.toLowerCase());
  }

  function handleOnchange2(e: React.ChangeEvent<HTMLInputElement>) {
    setPokemon2(e.target.value.toLowerCase());
  }

  async function handleOnSubmit(e: any) {
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

    setFightStarted(true);
    setLoading(false);
  }

  return (
    <div className="flex w-full h-screen items-center justify-center space-y-10 mt-10 flex-col">
      <h1 className="text-3xl font-sans">Choose your Pokémon champions!</h1>

      <Form
        handleOnchange1={handleOnchange1}
        handleOnchange2={handleOnchange2}
        handleSubmit={handleOnSubmit}
        fightStarted={fightStarted}
        setFightStarted={setFightStarted}
      />

      <div className="flex justify-center w-full">
        <PlayerComponent
          pokemon1Name={pokemon1}
          pokemon1Id={pokemon1Data?.id || 0}
          pokemon1Stats={pokemon1Data?.stats || []}
          pokemon2Name={pokemon2}
          pokemon2Id={pokemon2Data?.id || 0}
          pokemon2Stats={pokemon2Data?.stats || []}
          loading={loading}
          fightStarted={fightStarted}
        />
      </div>
      <a
        className="underline"
        href="https://github.com/sarahtell/sarah-portfolio"
        target="_blank"
        rel="noopener noreferrer"
      >
        Code in GitHub 😎 (work in progress!)
      </a>
    </div>
  );
}

export default App;
