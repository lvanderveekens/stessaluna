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

  // Added id field in order to have unique keys later on
  const [sentences, setSentences] = useState([
    { id: 1, textBefore: "wat?" },
    { id: 2, textBefore: "ok", choice: { a: "keuze A", b: "Keuze B" }, textAfter: "ja" },
    { id: 3, textBefore: "daaro", },
  ] as any);

  const addSentence = () => {
    const nextId = sentences.length ? (sentences[sentences.length - 1].id + 1) : 1
    const newSentence = { id: nextId, textBefore: "" };
    setSentences([...sentences, newSentence]);
  }

  const deleteInput = (index: number) => () => {
    const newSentences = [...sentences];
    newSentences.splice(index, 1);
    setSentences(newSentences)
  }

  const onSubmit = () => {
    console.log("submitted");
    console.log(sentences)
  };

  const handleChange = (index: number) => (change: AorbInputValue) => {
    const newSentences = [...sentences];
    newSentences[index] = { id: newSentences[index].id, ...change };
    setSentences(newSentences);
  }

  const renderInputs = () => {
    return sentences.map((sentence, i) => (
      <div key={sentence.id} className={styles.inputRow}>
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