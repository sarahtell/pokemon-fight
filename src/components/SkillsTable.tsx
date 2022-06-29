import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { Skills } from './PokemonPresentation';

const ANIMATION_DECREASE_HP = 0.8;

type SkillsTableProps = {
  name: string;
  skills: Skills;
  shouldUseOpacity?: boolean;
  shouldUseDecreaseAnimation?: boolean;
  initialHp?: number;
};

function shouldDecreaseHp(frame: number, durationInFrames: number): boolean {
  return frame > ANIMATION_DECREASE_HP * durationInFrames;
}

export function SkillsTable(props: SkillsTableProps): JSX.Element {
  const frame = useCurrentFrame();
  const config = useVideoConfig();
  const opacity = interpolate(frame, [50, 100], [0, 1]);
  const value = interpolate(
    frame,
    [
      0,
      ANIMATION_DECREASE_HP * config.durationInFrames,
      config.durationInFrames,
    ],
    [1, 1.5, 1]
  );

  function calculateHp(
    initialHp: number | undefined,
    skillsHp: number,
    shouldUseDecreaseAnimation: boolean | undefined,
    frame: number,
    durationInFrames: number
  ): number {
    // Pokemonpresentation
    if (!initialHp) {
      return skillsHp;
    }

    if (initialHp && shouldUseDecreaseAnimation) {
      return shouldDecreaseHp(frame, durationInFrames) ? skillsHp : initialHp;
    } else {
      return initialHp;
    }
  }

  return (
    <div
      className={`pt-8 text-center mx-8`}
      style={{ ...(props.shouldUseOpacity && { opacity }) }}
    >
      <p className="capitalize font-bold">{props.name}</p>
      <p
        style={{
          ...(props.shouldUseDecreaseAnimation && {
            transform: `scale(${value})`,
          }),
        }}
      >
        {'HP'}:{' '}
        {calculateHp(
          props.initialHp,
          props.skills.hp,
          props.shouldUseDecreaseAnimation,
          frame,
          config.durationInFrames
        )}
      </p>
      <p>
        {'Attack'}: {props.skills.attack}
      </p>
      <p>
        {'Defense'}: {props.skills.defense}
      </p>
      <p>
        {'Speed'}: {props.skills.speed}
      </p>
    </div>
  );
}
