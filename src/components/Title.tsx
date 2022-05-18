import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

type Props = {
  title: string;
};

export const Title = (props: Props) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  const opacity = interpolate(
    frame,
    [
      0,
      videoConfig.durationInFrames * 0.2,
      videoConfig.durationInFrames * 0.8,
      videoConfig.durationInFrames,
    ],
    [0, 1, 1, 0]
  );
  return (
    <div className="flex w-full justify-center" style={{ opacity }}>
      <h1 className="font-sans text-3xl my-10">{props.title}</h1>
    </div>
  );
};
