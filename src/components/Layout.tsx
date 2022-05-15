import { Header } from './Header'
import { AbsoluteFill } from 'remotion';

type Props = {
	children: JSX.Element
	header: string;
	headerFrom: number;
	headerDurationInFrames: number;

}

export const Layout = (props: Props) => {
	return (
		<div className="bg-gradient-to-b from-white to-blue-500 w-full flex-col text-center items-center justify-center">
			<Header header={props.header} from={props.headerFrom} durationInFrames={props.headerDurationInFrames} />
			{props.children}
		</div>
	)
}