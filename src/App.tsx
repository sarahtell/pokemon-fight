import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActionMeta, SingleValue } from 'react-select';
import Form from './components/Form';
import { PlayerComponent } from './components/PlayerComponent';
import { allPokemons } from './lib/allPokemons';

const baseUrl = 'https://pokeapi.co/api/v2';

export type Skills = {
  [K in 'speed' | 'hp' | 'attack' | 'defense']: number;
};

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
  skills: Skills;
  id: number;
  url: string;
};

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [fightStarted, setFightStarted] = useState<boolean>(false);
  const [pokemon1, setPokemon1] = useState<string>();
  const [pokemon2, setPokemon2] = useState<string>();
  const [pokemon1Data, setPokemon1Data] = useState<PokemonData>();
  const [pokemon2Data, setPokemon2Data] = useState<PokemonData>();
  const [error, setError] = useState<string>();

  function handleOnchange1(
    newValue: SingleValue<{
      value: string;
      label: string;
    }>,
    actionMeta: ActionMeta<{
      value: string;
      label: string;
    }>
  ) {
    setPokemon1(newValue?.value);
  }

  function handleOnchange2(
    newValue: SingleValue<{
      value: string;
      label: string;
    }>,
    actionMeta: ActionMeta<{
      value: string;
      label: string;
    }>
  ) {
    setPokemon2(newValue?.value);
  }

  function handleReset() {
    setLoading(false);
    setFightStarted(false);
    setPokemon1(undefined);
    setPokemon2(undefined);
    setPokemon1Data(undefined);
    setPokemon2Data(undefined);
    setError(undefined);
  }

  function handleOnSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    if (!pokemon1 || !pokemon2) {
      setError('Select two pokemons!');
    }

    axios
      .get(`${baseUrl}/pokemon/${pokemon1}`)
      .then(res => {
        const pokemon1Skills: Skills = {
          hp: res.data.stats[0].base_stat || 0,
          attack: res.data.stats[1].base_stat || 0,
          defense: res.data.stats[2].base_stat || 0,
          speed: res.data.stats[5].base_stat || 0,
        };

        setPokemon1Data({
          skills: pokemon1Skills,
          id: res.data.id,
          url: res.data.sprites.other.dream_world.front_default,
        });
      })
      .catch(e => {
        setError('Could not fetch pokemon!');
      });

    axios
      .get(`${baseUrl}/pokemon/${pokemon2}`)
      .then(res => {
        const pokemon2Skills: Skills = {
          hp: res.data.stats[0].base_stat || 0,
          attack: res.data.stats[1].base_stat || 0,
          defense: res.data.stats[2].base_stat || 0,
          speed: res.data.stats[5].base_stat || 0,
        };

        setPokemon2Data({
          skills: pokemon2Skills,
          id: res.data.id,
          url: res.data.sprites.other.dream_world.front_default,
        });
      })
      .catch(e => {
        setError('Could not fetch pokemon!');
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
          handleReset={handleReset}
          error={error}
          allPokemons={allPokemons || []}
          hasSelectedPokemons={!pokemon1 || !pokemon2}
        />
      <div className="flex justify-center w-full">
        {!loading && pokemon1Data && pokemon2Data && fightStarted && (
          <PlayerComponent
            pokemon1Name={pokemon1 || ''}
            pokemon1Id={pokemon1Data?.id || 0}
            pokemon1Skills={pokemon1Data?.skills}
            pokemon1Url={pokemon1Data?.url || ''}
            pokemon2Name={pokemon2 || ''}
            pokemon2Id={pokemon2Data?.id || 0}
            pokemon2Skills={pokemon2Data?.skills}
            pokemon2Url={pokemon2Data?.url || ''}
            loading={loading}
            error={error}
          />
        )}
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
