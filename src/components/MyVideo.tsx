import { AbsoluteFill, Series, Audio } from 'remotion';
import { PlayerComponentProps } from './PlayerComponent';
import { PokemonFight } from './PokemonFight';
import { PokemonIntro } from './PokemonIntro';
import { PokemonPresentation, Skills } from './PokemonPresentation';
import audio from './music/pokemon.mp3';

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
      <Audio src={audio} volume={0.5} />
      <Series>
        <Series.Sequence durationInFrames={60}>
          <PokemonIntro />
        </Series.Sequence>
        <Series.Sequence durationInFrames={90}>
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
        <Series.Sequence durationInFrames={90}>
          {pokemon1Skills.speed >= pokemon2Skills.speed ? (
            <AbsoluteFill className="bg-gradient-to-b from-white to-blue-500 w-full flex items-center justify-center">
              <p className="capitalize -translate-y-10">
                {props.pokemon1Name} starts because it is the fastest Pokémon!
              </p>
              <div className="w-full flex flex-row -translate-y-3">
                <PokemonFight
                  name={props.pokemon1Name}
                  skills={pokemon1Skills}
                  stats={props.pokemon1Stats}
                  id={props.pokemon1Id}
                  statsToTheLeft
                  url={props.pokemon1Url}
                />
                <PokemonFight
                  name={props.pokemon2Name}
                  skills={pokemon2Skills}
                  stats={props.pokemon2Stats}
                  id={props.pokemon2Id}
                  url={props.pokemon2Url}
                />
              </div>
            </AbsoluteFill>
          ) : (
            <AbsoluteFill className="bg-gradient-to-b from-white to-blue-500 w-full flex items-center justify-center">
              <p className="capitalize -translate-y-10">
                {props.pokemon2Name} starts because it is the fastest Pokémon!
              </p>
              <div className="w-full flex flex-row -translate-y-3">
                <PokemonFight
                  name={props.pokemon1Name}
                  skills={pokemon1Skills}
                  stats={props.pokemon1Stats}
                  id={props.pokemon1Id}
                  statsToTheLeft
                  url={props.pokemon1Url}
                />
                <PokemonFight
                  name={props.pokemon2Name}
                  skills={pokemon2Skills}
                  stats={props.pokemon2Stats}
                  id={props.pokemon2Id}
                  url={props.pokemon2Url}
                />
              </div>
            </AbsoluteFill>
          )}
        </Series.Sequence>
      </Series>
    </>
  );
};
