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
    <AbsoluteFill className="bg-gradient-to-b from-white to-blue-500 w-full">
      <Audio src={audio} volume={0.5} startFrom={100} />
      <Series>
        <Series.Sequence durationInFrames={120}>
          <PokemonIntro />
        </Series.Sequence>
        <Series.Sequence durationInFrames={180}>
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
    </AbsoluteFill>
  );
};
