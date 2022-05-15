import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

type Props = {
	header: string;
	from: number;
	durationInFrames: number;
}

export const Header = (props: Props) => {
	const frame = useCurrentFrame();


	const opacity = interpolate(
		frame,
		[props.from, props.from + props.durationInFrames, props.from + props.durationInFrames + 10],
		[1, 1, 0]
	);

	return (
		<h1 className='font-sans my-10 text-3xl' style={{ opacity }}>{props.header}</h1>
	)
}
