import React, { FunctionComponent } from 'react';
import styles from './AorbSentence.scss?module';
import classNames from 'classnames/bind';
let cx = classNames.bind(styles);

interface Props {
  textBefore: string
  choice: { a: string, b: string }
  textAfter: string
  onChoice: (choice: 'a' | 'b') => void
  selected?: 'a' | 'b'
}

const AorbSentence: FunctionComponent<Props> = ({ textBefore, choice, textAfter, onChoice, selected }) => {

  const choiceAClass = cx(styles.choiceA, { 'selected': selected && selected === 'a', });
  const choiceBClass = cx(styles.choiceB, { 'selected': selected && selected === 'b', });

  return (
    <div className={styles.sentence}>
      {textBefore}
      <span className={choiceAClass} onClick={() => onChoice('a')}>
        <span className={styles.label}>A</span>
        <span className={styles.text}>{choice.a}</span>
      </span>
      <span className={choiceBClass} onClick={() => onChoice('b')}>
        <span className={styles.label}>B</span>
        <span className={styles.text}>{choice.b}</span>
      </span>
      {textAfter}
    </div>
  );
}

export default AorbSentence;