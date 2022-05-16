type Props = {
  title: string;
};

export const Title = (props: Props) => {
  // const opacity = interpolate(
  // 	frame,
  // 	[props.from, props.from + props.durationInFrames, props.from + props.durationInFrames + 10],
  // 	[1, 1, 0]
  // );
  return (
    <div className="flex w-full justify-center">
      <h1>{props.title}</h1>
    </div>
  );
};
