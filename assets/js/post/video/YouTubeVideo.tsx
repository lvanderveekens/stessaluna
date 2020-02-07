import React, { FunctionComponent } from 'react';
import styles from './YouTubeVideo.scss?module';

interface Props {
  id: string
};

const YouTubeVideo: FunctionComponent<Props> = ({ id }) => {

  return (
    <div className={styles.videoContainer}>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}

export default YouTubeVideo;