import React, { FC, useState, useEffect } from 'react'
import styles from './AorbExerciseInput.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import AorbSentenceInput from './aorb-sentence-input/AorbSentenceInput';
import AorbSentenceInputValue from './aorb-sentence-input/aorb-sentence-input.model';
import AorbExerciseInputValue from './aorb-exercise-input.model';
import ExerciseInputHeader from '../exercise-input-header/ExerciseInputHeader';
import { nextId } from '../../../../util/id-generator';

interface Props {
  onChange: (change: AorbExerciseInputValue) => void
  onClose: () => void
}

const AorbExerciseInput: FC<Props> = ({ onChange, onClose }) => {

  // TODO: split into presentational and container components
  const [sentences, setSentences] = useState<AorbSentenceInputValue[]>(() => [{ id: nextId() }]);

  useEffect(() => {
    onChange(new AorbExerciseInputValue(sentences));
  }, [sentences]);

  const addSentence = () => {
    const newInputValue = { id: nextId() };
    const newInputValues = [...sentences, newInputValue]
    setSentences(newInputValues);
  }

  const deleteInput = (index: number) => () => {
    const newInputValues = [...sentences];
    newInputValues.splice(index, 1);
    setSentences(newInputValues);
  }

  const handleChange = (index: number) => (change: AorbSentenceInputValue) => {
    const newInputValues = [...sentences];
    newInputValues[index] = { ...newInputValues[index], ...change };
    setSentences(newInputValues);
  }

  return (
    <div className={styles.aorbExerciseInput}>
      <div>
        <ExerciseInputHeader title="A or B" onClose={onClose} />
        <div className={styles.sentences}>
          {sentences.map((sentence, i) => (
            <div key={sentence.id} className={styles.inputRow}>
              <div className={styles.inputIndex}>{i + 1}.</div>
              <AorbSentenceInput value={sentence} onChange={handleChange(i)} />
              <div className={styles.deleteInput} onClick={deleteInput(i)}>
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.addSentence}>
          <span className={styles.addIcon} onClick={addSentence}>
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default AorbExerciseInput;