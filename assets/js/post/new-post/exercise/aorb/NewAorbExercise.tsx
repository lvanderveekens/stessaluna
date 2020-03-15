import React, { FC, useState } from 'react'
import styles from './NewAorbExercise.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import AorbInput, { AorbInputValue } from './AorbInput';
import { Button } from 'react-bootstrap';
import { createPost } from '../../../actions';
import axios from '../../../../http/client';

interface Props {
  onClose: () => void
}

const NewAorbExercise: FC<Props> = ({ onClose }) => {

  const [sentences, setSentences] = useState([
    { id: 1, value: { textBefore: "Quanto", choice: { a: "costa", b: "costano" }, textAfter: "il caffe?" } },
    { id: 2, value: { textBefore: "ok", choice: { a: "keuze A", b: "Keuze B" }, textAfter: "ja" } },
  ] as { id: number, value: AorbInputValue }[]);

  const addSentence = () => {
    const nextId = sentences.length ? (sentences[sentences.length - 1].id + 1) : 1
    const newSentence = { id: nextId, value: { textBefore: "" } };
    setSentences([...sentences, newSentence]);
  }

  const deleteInput = (index: number) => () => {
    const newSentences = [...sentences];
    newSentences.splice(index, 1);
    setSentences(newSentences)
  }

  const onSubmit = () => {
    console.log("Submitting");

    const data = { type: 'aorb', sentences: sentences.map((s) => s.value) };
    console.log(data);

    axios.post('/api/posts', data)
      .then(res => {
        console.log(res.data);
      })
      .catch(console.log);
  };

  const handleChange = (index: number) => (change: AorbInputValue) => {
    const newSentences = [...sentences];
    newSentences[index].value = change;
    setSentences(newSentences);
  }

  const renderInputs = () => {
    return sentences.map((sentence, i) => (
      <div key={sentence.id} className={styles.inputRow}>
        <div className={styles.inputIndex}>{i + 1}.</div>
        <AorbInput value={sentence.value} onChange={handleChange(i)} />
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