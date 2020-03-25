import React, { FunctionComponent } from 'react';
import { AorbSentence as AorbSentenceInterface } from '../post.interface';
import styles from './AorbContent.scss?module';

interface Props {
  sentences: AorbSentenceInterface[]
};

const AorbContent: FunctionComponent<Props> = ({ sentences }) => {

  return (
    <div>
      <div><b>Exercise: A or B</b></div>
      <div>
        {sentences.map((sentence, index) => (
          <div key={index} className={styles.sentence}>
            <span className={styles.index}>{index + 1}</span>:
            {sentence.textBefore}
            <span className={styles.choiceA}>
              <span className={styles.label}>A</span>
              <span className={styles.text}>{sentence.choice.a}</span>
            </span>
            <span className={styles.choiceB}>
              <span className={styles.label}>B</span>
              <span className={styles.text}>{sentence.choice.b}</span>
            </span>
            {sentence.textAfter}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AorbContent;