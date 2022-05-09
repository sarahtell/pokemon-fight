import { Audio, useCurrentFrame, useVideoConfig } from 'remotion';
import audio from './pokemon.mp3';

export const BackgroundAudio = () => {
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame()
  return (
    <>
      <Audio src={audio} startFrom={0} endAt={240} />
    </>
  );
};
