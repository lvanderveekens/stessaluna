import React, { FunctionComponent, useState } from 'react';
import styles from './AorbExercise.scss?module';
import { AorbSentence as AorbSentenceInterface } from '../../post/post.interface';
import AorbSentence from './AorbSentence';
import { Button } from 'react-bootstrap';

interface Props {
  sentences: AorbSentenceInterface[]
};

const AorbExercise: FunctionComponent<Props> = ({ sentences }) => {

  // const [answers, setAnswers] = useState([]);
  const [choices, setChoices] = useState(new Array(sentences.length).fill(null)); 

  const handleChoice = (index: number) => (choice: 'a' | 'b') => {
    setChoices(choices.map((c, i) => i == index ? choice : c))
  };

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
              onChoice={handleChoice(i)}
              selected={choices[i]}
            />
          </div>
        ))}
      </div>
      <div><Button className="btn btn-dark" type="submit">Check</Button></div>
    </div>
  );
};

export default AorbExercise;