import React, { useRef } from 'react';
import SVG, { Props as SVGProps } from 'react-inlinesvg';

const Logo = React.forwardRef<SVGElement, SVGProps>((props, ref) => (
  <SVG innerRef={ref} title="MyLogo" {...props} />
));

type PokemonSvgProps= {
  id?: number;
  svgUrl?:string;
}

export function PokemonSvg(props: PokemonSvgProps) {
  const logo = useRef<SVGElement>(null);

  const pokemonUrl =`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${props.id}.svg`
  
  return <Logo ref={logo} src={props.svgUrl || pokemonUrl} />;

}
