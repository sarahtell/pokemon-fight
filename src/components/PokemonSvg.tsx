import React, { useRef } from 'react';
import SVG, { Props as SVGProps } from 'react-inlinesvg';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

type LogoProps = SVGProps & {
  shouldUseAttackAnimation?: boolean;
  attackLeft?: boolean;
};

const Logo = React.forwardRef<SVGElement, LogoProps>((props, ref) => {
  const frame = useCurrentFrame();
  const config = useVideoConfig();
  const direction = props.attackLeft ? -1 : 1;
  const scale = 100;

  const translate = props.shouldUseAttackAnimation
    ? interpolate(frame, [0, config.durationInFrames * 0.5, config.durationInFrames], [0, 1, 1])
    : 0;
  return (
    <SVG
      style={{
        transform: `translateX(${direction * translate * scale}px)`,
      }}
      innerRef={ref}
      title="MyLogo"
      {...props}
    />
  );
});

type PokemonSvgProps = {
  url: string;
  shouldUseAttackAnimation?: boolean;
  attackLeft?: boolean;
};

export function PokemonSvg(props: PokemonSvgProps) {
  const logo = useRef<SVGElement>(null);

  return (
    <Logo
      ref={logo}
      src={props.url}
      shouldUseAttackAnimation={props.shouldUseAttackAnimation}
      attackLeft={props.attackLeft}
    />
  );
}
