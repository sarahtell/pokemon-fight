import { Series } from 'remotion';
import { Title } from './Title';

type Props = {};

export const Header = (props: Props) => {
  return (
    <Series>
      <Series.Sequence durationInFrames={120}>
        <Title title="Welcome" />
      </Series.Sequence>
      <Series.Sequence durationInFrames={120}>
        <Title title="Welcome2" />
      </Series.Sequence>
    </Series>
  );
};
