import React, { useRef } from 'react';
import SVG, { Props as SVGProps } from 'react-inlinesvg';

const Logo = React.forwardRef<SVGElement, SVGProps>((props, ref) => (
  <SVG innerRef={ref} title="MyLogo" {...props} />
));

type PokemonSvgProps= {
  url: string
}

export function PokemonSvg(props: PokemonSvgProps) {
  const logo = useRef<SVGElement>(null);
  return <Logo ref={logo} src={props.url} />;
}
