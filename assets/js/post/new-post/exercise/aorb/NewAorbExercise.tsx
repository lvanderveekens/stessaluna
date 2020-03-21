import React, { FC, useState } from 'react'
import styles from './NewAorbExercise.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import AorbInput, { AorbInputValue } from './AorbInput';
import { Button } from 'react-bootstrap';
import { createPost } from '../../../actions';
import axios from '../../../../http/client';
import { connect } from 'react-redux';
import { NewAorbPostRequest } from '../../new-post-request.interface';
import NewPost from '../../NewPost';

interface Props {
  onClose: () => void
  createPost: (post: NewAorbPostRequest) => Promise<void>
}

const NewAorbExercise: FC<Props> = ({ onClose, createPost }) => {

  const [inputValues, setInputValues] = useState([
    { id: 1, value: { textBefore: "" } }
  ] as { id: number, value: AorbInputValue }[]);

  const addSentence = () => {
    const nextId = inputValues.length ? (inputValues[inputValues.length - 1].id + 1) : 1
    const newInputValue = { id: nextId, value: { textBefore: "" } };
    setInputValues([...inputValues, newInputValue]);
  }

  const deleteInput = (index: number) => () => {
    const newInputValues = [...inputValues];
    newInputValues.splice(index, 1);
    setInputValues(newInputValues);
  }

  const onSubmit = () => {
    const sentences = inputValues.map((s) => ({
      textBefore: s.value.textBefore,
      choice: { a: s.value.choice.a, b: s.value.choice.b },
      textAfter: s.value.textAfter,
    }));

    createPost(new NewAorbPostRequest(sentences))
      .then(() => {
        const nextId = inputValues.length ? (inputValues[inputValues.length - 1].id + 1) : 1
        setInputValues([{ id: nextId, value: { textBefore: "" } }]);
      });
  };

  const handleChange = (index: number) => (change: AorbInputValue) => {
    const newInputValues = [...inputValues];
    newInputValues[index].value = change;
    setInputValues(newInputValues);
  }

  const renderInputs = () => {
    return inputValues.map((inputValue, i) => (
      <div key={inputValue.id} className={styles.inputRow}>
        <div className={styles.inputIndex}>{i + 1}.</div>
        <AorbInput value={inputValue.value} onChange={handleChange(i)} />
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

const actionCreators = {
  createPost,
};

export default connect(null, actionCreators)(NewAorbExercise);