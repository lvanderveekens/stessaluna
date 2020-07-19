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
  initialValues: AorbExerciseInputValues
  onChange: (change: AorbExerciseInputValues) => void
  onClose: () => void
}

const AorbExerciseInput: FC<Props> = ({ initialValues, onChange, onClose }) => {

  const [sentencesWithId, setSentencesWithId] = useState<(AorbSentenceInputValue & { id: number })[]>(() => {
    return initialValues.sentences.map((s) => ({...s, id: nextId()}))
  });

  useEffect(() => {
    const sentences = sentencesWithId.map((sentenceWithId) => {
      const sentence = {...sentenceWithId}
      delete sentence.id
      return sentence
    })
    onChange(new AorbExerciseInputValues(sentences));
  }, [sentencesWithId]);

  const addSentence = () => {
    const newInputValue = { id: nextId() };
    const newInputValues = [...sentencesWithId, newInputValue]
    setSentencesWithId(newInputValues);
  }

  const deleteInput = (index: number) => () => {
    const newInputValues = [...sentencesWithId];
    newInputValues.splice(index, 1);
    setSentencesWithId(newInputValues);
  }

  const handleChange = (index: number) => (change: AorbSentenceInputValue) => {
    const newInputValues = [...sentencesWithId];
    newInputValues[index] = { ...newInputValues[index], ...change };
    setSentencesWithId(newInputValues);
  }

  return (
    <div className={styles.aorbExerciseInput}>
      <div>
        <ExerciseInputHeader title="A or B" onClose={onClose} />
        <div className={styles.sentences}>
          {sentencesWithId.map((sentenceWithId, i) => (
            <div key={sentenceWithId.id} className={styles.inputRow}>
              <div className="d-flex justify-content-between">
                <div className={styles.inputIndex}>{i + 1}.</div>
                <div className={styles.deleteInput} onClick={deleteInput(i)}>
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>
              <AorbSentenceInput value={sentenceWithId} onChange={handleChange(i)} />
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