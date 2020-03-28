import React, { FunctionComponent } from 'react';
import styles from './AorbSentence.scss?module';

interface Props {
  textBefore: string
  choice: { a: string, b: string }
  textAfter: string
}

const AorbSentence: FunctionComponent<Props> = ({ textBefore, choice, textAfter }) => {

  return (
    <div className={styles.sentence}>
      {textBefore}
      <span className={styles.choiceA}>
        <span className={styles.label}>A</span>
        <span className={styles.text}>{choice.a}</span>
      </span>
      <span className={styles.choiceB}>
        <span className={styles.label}>B</span>
        <span className={styles.text}>{choice.b}</span>
      </span>
      {textAfter}
    </div>
  );
}

export default AorbSentence;