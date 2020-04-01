import React, { FunctionComponent, useState } from 'react';
import styles from './AorbExercise.scss?module';
import { Button } from 'react-bootstrap';
import { AorbSentence as AorbSentenceInterface } from '../aorb-exercise.interface';
import AorbSentence from '../AorbSentence';

interface Props {
  sentences: AorbSentenceInterface[]
  choices: ('a' | 'b')[]
  onChoice: (index: number) => (choice: 'a' | 'b') => void
  onSubmit: () => void
  submitDisabled: boolean
};

const AorbExercise: FunctionComponent<Props> = ({ sentences, choices, onChoice, onSubmit, submitDisabled }) => {

  return (
    <div className={styles.exercise}>
      <div className={styles.header}><span>A or B</span></div>
      <div className={styles.sentences}>
        {sentences.map((sentence, i) => (
          <div key={i} className={styles.sentenceWrapper}>
            <span className={styles.index}>{i + 1}:</span>
            <AorbSentence
              textBefore={sentence.textBefore}
              choice={sentence.choice}
              textAfter={sentence.textAfter}
              onChoice={onChoice(i)}
              selected={choices[i]}
            />
          </div>
        ))}
      </div>
      <div><Button className="btn btn-dark" type="submit" onClick={onSubmit} disabled={submitDisabled}>Check</Button></div>
    </div>
  );
};

export default AorbExercise;