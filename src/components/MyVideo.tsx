import { AbsoluteFill, Series } from 'remotion';
import { PlayerComponentProps } from './PlayerComponent';
import { PokemonFight } from './PokemonFight';
import { PokemonIntro } from './PokemonIntro';
import { PokemonPresentation, Skills } from './PokemonPresentation';
import { PokemonSvg } from './PokemonSvg';

export const MyVideo = (props: PlayerComponentProps) => {
  const pokemon1Skills: Skills = {
    hp: props.pokemon1Stats[0].base_stat || 0,
    attack: props.pokemon1Stats[1].base_stat || 0,
    defense: props.pokemon1Stats[2].base_stat || 0,
    speed: props.pokemon1Stats[5].base_stat || 0
  }

  const pokemon2Skills: Skills = {
    hp: props.pokemon2Stats[0].base_stat || 0,
    attack: props.pokemon2Stats[1].base_stat || 0,
    defense: props.pokemon2Stats[2].base_stat || 0,
    speed: props.pokemon2Stats[5].base_stat || 0
  }

  return (
      <Series>
        <Series.Sequence durationInFrames={60}>
          <PokemonIntro />
        </Series.Sequence>
        <Series.Sequence durationInFrames={90}>
          <PokemonPresentation name={props.pokemon1Name} skills={pokemon1Skills} stats={props.pokemon1Stats} id={props.pokemon1Id} statsToTheLeft >
            <PokemonSvg id={props.pokemon1Id} />
          </PokemonPresentation>
          <PokemonPresentation name={props.pokemon2Name} skills={pokemon2Skills} stats={props.pokemon2Stats} id={props.pokemon2Id}>
            <PokemonSvg id={props.pokemon2Id} />
          </PokemonPresentation>
        </Series.Sequence>
        <Series.Sequence durationInFrames={90}>
          {pokemon1Skills.speed >= pokemon2Skills.speed ? (
              <PokemonFight name={props.pokemon1Name} skills={pokemon1Skills} stats={props.pokemon1Stats} id={props.pokemon1Id} statsToTheLeft>
                <PokemonSvg id={props.pokemon1Id} />
              </PokemonFight>
          ) : (
            <PokemonFight name={props.pokemon2Name} skills={pokemon2Skills} stats={props.pokemon2Stats} id={props.pokemon2Id} statsToTheLeft >
              <PokemonSvg id={props.pokemon2Id} />
            </PokemonFight>
          )}
        </Series.Sequence>
      </Series>
  );
};
