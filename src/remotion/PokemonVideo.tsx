import { Composition } from 'remotion';
import { MyVideo } from '../components/MyVideo';
import pokemonProps from '../../pokemon.json';

export const PokemonVideo = () => {
  return (
    <>
      <Composition
        component={MyVideo}
        durationInFrames={1000}
        width={1080}
        height={600}
        fps={30}
        id="my-comp"
        defaultProps={pokemonProps}
      />
    </>
  );
};
