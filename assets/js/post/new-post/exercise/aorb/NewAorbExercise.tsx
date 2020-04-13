import React, { FC, useState, useEffect } from 'react'
import styles from './NewAorbExercise.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import AorbSentenceInput from './aorb-sentence-input/AorbSentenceInput';
import AorbExercise, { AorbSentence } from '../../../../exercise/aorb/aorb-exercise.model';
import AorbSentenceInputValue from './aorb-sentence-input/aorb-sentence-input.model';
import { NewAorbExercise as NewAorbExerciseModel } from './new-aorb-exercise.model';

interface Props {
  onChange: (change: NewAorbExerciseModel) => void
  onClose: () => void
}

const NewAorbExercise: FC<Props> = ({ onChange, onClose }) => {

  // TODO: split into presentational and container components
  // const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);

  const nextId = () => aorbSentences && aorbSentences.length ? (aorbSentences[aorbSentences.length - 1].id + 1) : 1

  const [aorbSentences, setAorbSentences] = useState([{ id: nextId() }] as AorbSentenceInputValue[]);

  useEffect(() => {
    // const sentences = inputValues.map((value) => value as AorbSentence);
    // const exercise = new NewAorbExerciseModel(sentences);
    // onChange(exercise);
  }, [aorbSentences]);

  const addSentence = () => {
    const newInputValue = { id: nextId() };
    const newInputValues = [...aorbSentences, newInputValue]
    // setSubmitButtonEnabled(false);
    setAorbSentences(newInputValues);
  }

  const deleteInput = (index: number) => () => {
    const newInputValues = [...aorbSentences];
    newInputValues.splice(index, 1);
    // setSubmitButtonEnabled(newInputValues.every(({ value }) => value.choice && value.choice.correct));
    setAorbSentences(newInputValues);
  }

  const resetInput = () => {
    setAorbSentences([{ id: nextId(), textBefore: "" }]);
    // setSubmitButtonEnabled(false);
  }

  const handleChange = (index: number) => (change: AorbSentenceInputValue) => {
    const newInputValues = [...aorbSentences];
    newInputValues[index] = { ...newInputValues[index], ...change };
    // setSubmitButtonEnabled(newInputValues.every(({ value }) => value.choice && value.choice.correct));
    setAorbSentences(newInputValues);
  }

  return (
    <div className={styles.newAorbExercise}>
      <div>
        <div className={styles.header}>
          <span>A or B</span>
          <FontAwesomeIcon className={styles.closeButton} icon={faTimes} onClick={onClose} />
        </div>
        <div className={styles.sentences}>
          {aorbSentences.map((sentence, i) => (
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

export default NewAorbExercise;