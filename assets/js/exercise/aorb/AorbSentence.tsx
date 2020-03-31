import React, { FunctionComponent } from 'react';
import styles from './AorbSentence.scss?module';
import classNames from 'classnames/bind';
import { AorbChoice } from './aorb-exercise.interface';
let cx = classNames.bind(styles);

interface Props {
  textBefore: string
  choice: AorbChoice
  textAfter: string
  onChoice: (choice: 'a' | 'b') => void
  selected?: 'a' | 'b'
}

const AorbSentence: FunctionComponent<Props> = ({ textBefore, choice, textAfter, onChoice, selected }) => {

  const choiceAClass = cx(styles.choiceA, {
    'selected': selected && selected === 'a',
    'correct': choice.answer && choice.answer === 'a' && choice.correct && choice.correct === 'a',
    'incorrect': choice.answer && choice.answer === 'a' && choice.correct && choice.correct === 'b',
  });
  const choiceBClass = cx(styles.choiceB, {
    'selected': selected && selected === 'b',
    'correct': choice.answer && choice.answer === 'b' && choice.correct && choice.correct === 'b',
    'incorrect': choice.answer && choice.answer === 'b' && choice.correct && choice.correct === 'a',
  });

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