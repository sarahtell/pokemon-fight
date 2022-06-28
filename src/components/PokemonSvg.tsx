import React, { useRef } from 'react';
import SVG, { Props as SVGProps } from 'react-inlinesvg';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

type LogoProps = SVGProps & {
  shouldUseAttackAnimation?: boolean;
  shouldUseInjuryAnimation?: boolean;
  attackLeft?: boolean;
};

const Logo = React.forwardRef<SVGElement, LogoProps>((props, ref) => {
  const frame = useCurrentFrame();
  const config = useVideoConfig();
  const direction = props.attackLeft ? -1 : 1;
  const scale = 200;
  const springValue = spring({
    frame: frame,
    from: 1,
    to: 0.5,
    fps: config.fps,
    config: {
      stiffness: 100,
    },
  });

  const rotation = props.shouldUseInjuryAnimation ? springValue : 1;

  const translate = props.shouldUseAttackAnimation
    ? interpolate(frame, [0, config.durationInFrames * 0.5, config.durationInFrames * 0.8, config.durationInFrames], [0, 1, 1, 0])
    : 0;

  return (
    <SVG
      style={{
        transform: `translateX(${direction * translate * scale}px) scale(${rotation})`
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
  shouldUseInjuryAnimation?: boolean;
  attackLeft?: boolean;
};

export function PokemonSvg(props: PokemonSvgProps) {
  const logo = useRef<SVGElement>(null);

  return (
    <Logo
      ref={logo}
      src={props.url}
      shouldUseAttackAnimation={props.shouldUseAttackAnimation}
      shouldUseInjuryAnimation={props.shouldUseInjuryAnimation}
      attackLeft={props.attackLeft}
    />
  );
}
