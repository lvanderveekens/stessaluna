import React, { FunctionComponent } from 'react';
import styles from './AorbExercise.scss?module';
import { AorbSentence as AorbSentenceInterface } from '../../post/post.interface';
import AorbSentence from './AorbSentence';

interface Props {
  sentences: AorbSentenceInterface[]
};

const AorbExercise: FunctionComponent<Props> = ({ sentences }) => {

  return (
    <div className={styles.exercise}>
      <div className={styles.header}><span>A or B</span></div>
      <div>
        {sentences.map((sentence, index) => (
          <div key={index} className={styles.sentenceWrapper}>
            <span className={styles.index}>{index + 1}:</span>
            <AorbSentence textBefore={sentence.textBefore} choice={sentence.choice} textAfter={sentence.textAfter} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AorbExercise;