import { AbsoluteFill } from 'remotion';

type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const Layout = (props: Props) => {
  return (
    <AbsoluteFill className="flex flex-col bg-gradient-to-b from-white to-blue-500">
      {props.children}
    </AbsoluteFill>
  );
};
