import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Skills } from './PokemonPresentation';

type SkillsTableProps = {
  name: string;
  skills: Skills;
  shouldUseOpacity?: boolean;
  shouldUseSpring?: boolean;
  initialHp?: number;
};

export function SkillsTable(props: SkillsTableProps): JSX.Element {
  const frame = useCurrentFrame();
  const config = useVideoConfig();
  const opacity = interpolate(frame, [50, 100], [0, 1]);
  // const value = spring({
  //     frame,
  //     from: 0,
  //     to: 1,
  //     fps: config.fps,
  //     config: {
  //         stiffness: 100,
  //     },
  // });

  const value = interpolate(
    frame,
    [0, config.durationInFrames],
    [1, 1.5]
  );

  return (
    <div
      className={`pt-8 text-center mx-8`}
      style={{ ...(props.shouldUseOpacity && { opacity }) }}
    >
      <p className="capitalize font-bold">{props.name}</p>
      <p
        style={{
          ...(props.shouldUseSpring && { transform: `scale(${value})` }),
        }}
      >
        {'HP'}: {props.initialHp ? props.initialHp : props.skills.hp}
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
