import React, { useState, FunctionComponent } from 'react';
import styles from './TextContent.scss?module';
import Linkify from 'linkifyjs/react';
import YouTubeVideo from '../video/YouTubeVideo';
var linkify = require('linkifyjs');

interface Props {
  text: string
  imageSrc: string
};

const TextContent: FunctionComponent<Props> = ({ text, imageSrc }) => {

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
      {imageSrc && (<img className={styles.image} src={imageSrc} />)}
      {youtubeVideoId && (<YouTubeVideo id={youtubeVideoId} />)}
    </div>
  );
};

export default TextContent;