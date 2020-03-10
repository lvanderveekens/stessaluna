import React, { FC, useState } from 'react'
import styles from './NewAorbExercise.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import AorbInput, { AorbInputValue } from './AorbInput';
import { Button } from 'react-bootstrap';

interface Props {
  onClose: () => void
}

const NewAorbExercise: FC<Props> = ({ onClose }) => {
  const [sentences, setSentences] = useState([
    { textBefore: "wat?", choice: null, textAfter: null },
    { textBefore: "ok", choice: { a: "keuze A", b: "Keuze B" }, textAfter: "ja" },
    { textBefore: "daaro", choice: null, textAfter: null },
  ] as AorbInputValue[]);

  const addSentence = () => {
    // setSentences([...sentences, { textBefore: ""}]);
  }

  const deleteInput = (index: number) => () => {
    // const newSentences = [...sentences];
    // newSentences.splice(index, 1);
    // setSentences(newSentences)
  }

  const onSubmit = () => {
    console.log("submitted");
  };

  const handleChange = (index: number) => (change: AorbInputValue) => {
    const newSentences = [...sentences];
    newSentences[index] = change;
    setSentences(newSentences);
  }

  const renderInputs = () => {
    return sentences.map((sentence, i) => (
      <div key={i} className={styles.inputRow}>
        <div className={styles.inputIndex}>{i + 1}.</div>
        <AorbInput value={sentence} onChange={handleChange(i)} />
        <div className={styles.deleteInput} onClick={deleteInput(i)}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    ))
  }

  return (
    <div className={styles.newAorbExercise}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <span>A or B exercise</span>
          <FontAwesomeIcon className={styles.closeButton} icon={faTimes} onClick={onClose} />
        </div>
        <div className={styles.sentences}>
          {renderInputs()}
        </div>
        <div className={styles.addSentence}>
          <span className={styles.addIcon} onClick={addSentence}>
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </div>
      </div>
      <Button className="btn btn-dark mb-2" type="submit" onClick={onSubmit}>Create</Button>
    </div>
  );
};

export default NewAorbExercise;