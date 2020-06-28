import React, {FC, useEffect, useState} from 'react'
import styles from './AorbExerciseInput.scss?module';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';
import AorbSentenceInput from './aorb-sentence-input/AorbSentenceInput';
import AorbSentenceInputValue from './aorb-sentence-input/aorb-sentence-input.model';
import AorbExerciseInputValues from './aorb-exercise-input.model';
import ExerciseInputHeader from '../exercise-input-header/ExerciseInputHeader';
import {nextId} from '../../../../util/id-generator';

interface Props {
  initialValues?: AorbExerciseInputValues
  onChange: (change: AorbExerciseInputValues) => void
  onClose: () => void
}

const AorbExerciseInput: FC<Props> = ({ initialValues, onChange, onClose }) => {

  const [sentences, setSentences] = useState<AorbSentenceInputValue[]>(
    () => (initialValues && initialValues.sentences) || [{id: nextId()}]
  );

  useEffect(() => {
    onChange(new AorbExerciseInputValues(sentences));
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
              <div className="d-flex justify-content-between">
                <div className={styles.inputIndex}>{i + 1}.</div>
                <div className={styles.deleteInput} onClick={deleteInput(i)}>
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>
              <AorbSentenceInput value={sentence} onChange={handleChange(i)} />
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