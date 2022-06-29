import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { PokemonSvg } from './PokemonSvg';
import { Title } from './Title';
import { capitalize } from 'lodash';

export const PokemonWinner = (props: any) => {
    const config = useVideoConfig();
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, config.durationInFrames*0.3], [0, 1]);

    function announcePokemonWinnerSvg(pokemon1Hp: number, pokemon2Hp: number, url1: string, url2: string, pokemon1Name: string, pokemon2Name: string): any {
        if (pokemon1Hp > pokemon2Hp) {
            const url = url1;
            const pokemonName = capitalize(pokemon1Name); 
            return [ url, pokemonName ];
        } else {
            const url = url2
            const pokemonName = capitalize(pokemon2Name) 
            return [ url, pokemonName ];
        }
    }
    const [pokeUrl, pokeName] = announcePokemonWinnerSvg(props.pokemon1Skills.hp, props.pokemon2Skills.hp, props.url1, props.url2, props.name1, props.name2)
    
    return (
        <div className="flex flex-col w-full items-center justify-center p-8" style={{ opacity }}>
            <Title title={`${pokeName} wins!`} />
            <PokemonSvg url={pokeUrl} />
        </div>
    );
};
