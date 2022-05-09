import { PokemonSvg } from './PokemonSvg';

export const PokemonIntro = (props: any) => {
  return (
    <div className="bg-gradient-to-b from-white to-blue-500 w-full flex items-center justify-center">
      <PokemonSvg
        url={`https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg`}
      />
    </div>
  );
};
