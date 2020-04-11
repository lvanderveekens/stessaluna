import React, { useState, FunctionComponent } from 'react';
import styles from './Text.scss?module';
import Linkify from 'linkifyjs/react';
import EmbeddedYouTubeVideo from '../embed/EmbeddedYouTubeVideo';
var linkify = require('linkifyjs');

interface Props {
  text: string
};

const Text: FunctionComponent<Props> = ({ text }) => {

  let youtubeVideoId
  if (text) {
    const youtubeLink = linkify.find(text)
      .find(link => link.type == "url" &&
        (link.value.includes("youtube.com") || link.value.includes("youtu.be")));

    if (youtubeLink) {
      if (youtubeLink.value.includes("youtube.com/watch?v=")) {
        youtubeVideoId = /watch\?v=(.*)/.exec(youtubeLink.value)[1];
      } else if (youtubeLink.value.includes("youtu.be/")) {
        youtubeVideoId = /youtu.be\/(.*)/.exec(youtubeLink.value)[1]
      }
    }
  }

  return (
    <div className={styles.textContent}>
      <div className={styles.text}>
        <Linkify>{text}</Linkify>
      </div>
      {youtubeVideoId && (<EmbeddedYouTubeVideo id={youtubeVideoId} />)}
    </div>
  );
};

export default Text;