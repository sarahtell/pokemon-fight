import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { PokemonSvg } from './PokemonSvg';

export const PokemonWinner = (props: any) => {
    const config = useVideoConfig();
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, config.durationInFrames], [0, 1]);

    function announcePokemonWinnerSvg(pokemon1Hp: number, pokemon2Hp: number, url1: string, url2: string): string {
        if (pokemon1Hp > pokemon2Hp) {
            return url1
        } else {
            return url2
        }
    }
    return (
        <div className={`flex w-full items-center justify-center`} style={{ opacity }}>
            <PokemonSvg url={announcePokemonWinnerSvg(props.pokemon1Skills.hp, props.pokemon2Skills.hp, props.url1, props.url2)} />
        </div>
    );
};
