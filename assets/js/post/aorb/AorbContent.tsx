import React, { FunctionComponent } from 'react';
import { AorbSentence as AorbSentenceInterface } from '../post.interface';
import styles from './AorbContent.scss?module';

interface Props {
  sentences: AorbSentenceInterface[]
};

const AorbContent: FunctionComponent<Props> = ({ sentences }) => {

  return (
    <div>
      {sentences.map((sentence, index) => (
        <div key={index} className={styles.sentence}>
          <span className={styles.index}>{index + 1}</span>: {sentence.textBefore}
          <span className={styles.choiceA}><span className={styles.label}>A)</span>{sentence.choice.a}</span>
          <span className={styles.choiceB}><span className={styles.label}>B)</span>{sentence.choice.b}</span>
          {sentence.textAfter}
        </div>
      ))}
    </div>
  );
};

export default AorbContent;