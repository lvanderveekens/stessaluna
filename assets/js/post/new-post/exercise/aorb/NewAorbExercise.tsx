import React, { FC, useState } from 'react'
import styles from './NewAorbExercise.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import AorbInput from './AorbInput';

interface Props {
  onClose: () => void
}

const NewAorbExercise: FC<Props> = ({ onClose }) => {
  
  const [aorbInputs, setAorbInputs] = useState([{ createdOn: new Date().getTime(), input: <AorbInput /> }]);

  const addInput = () => {
    setAorbInputs([...aorbInputs, {
      createdOn: new Date().getTime(),
      input: <AorbInput />
    }]);
  }

  const deleteInput = (index: number) => () => {
    const inputs = [...aorbInputs];
    inputs.splice(index, 1);
    setAorbInputs(inputs);
  }

  const renderInputs = () => {
    return aorbInputs.map((aorbInput, i) => (
      <div key={aorbInput.createdOn} className={styles.inputRow}>
        <div className={styles.inputIndex}>{i + 1}.</div>
        {aorbInput.input}
        <div className={styles.deleteInput} onClick={deleteInput(i)}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    ))
  }

  return (
    <div className={styles.newAorbExercise}>
      <div className={styles.header}>
        <span>A or B</span>
        <FontAwesomeIcon className={styles.closeButton} icon={faTimes} onClick={onClose} />
      </div>
      <div className={styles.sentences}>
        {renderInputs()}
      </div>
      <div className={styles.addSentence}>
        <span className={styles.addIcon} onClick={addInput}>
          <FontAwesomeIcon icon={faPlus} />
        </span>
      </div>
    </div>
  );
};

export default NewAorbExercise;