import React, { FC, useState } from 'react'
import styles from './NewAorbExercise.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import AorbInput from './AorbInput';
import { Button } from 'react-bootstrap';
import { createPost } from '../../../../store/post/actions';
import { connect } from 'react-redux';
import { AorbInputValue } from './aorb-input.interface';
import { NewAorbPostRequest } from './new-aorb-post.interface';

interface Props {
  onClose: () => void
  createPost: (post: NewAorbPostRequest) => Promise<void>
}

const NewAorbExercise: FC<Props> = ({ onClose, createPost }) => {

  const [inputValues, setInputValues] = useState([
    { id: 1, value: { textBefore: "hoe werkt ", choice: { a: "ja", b: "nee" }, textAfter: "?" } }
  ] as { id: number, value: AorbInputValue }[]);

  const addSentence = () => {
    const nextId = inputValues.length ? (inputValues[inputValues.length - 1].id + 1) : 1
    const newInputValue = { id: nextId, value: { textBefore: "" } };
    const newInputValues = [...inputValues, newInputValue]
    console.log("setInputValue() - addSentence");
    console.log(newInputValues);
    setInputValues(newInputValues);
  }

  const deleteInput = (index: number) => () => {
    const newInputValues = [...inputValues];
    newInputValues.splice(index, 1);
    setInputValues(newInputValues);
  }

  const onSubmit = () => {
    // TODO: validate or disable create button until everything's all and well
    const sentences = inputValues.map((s) => ({
      textBefore: s.value.textBefore,
      choice: { a: s.value.choice.a, b: s.value.choice.b, correct: s.value.choice.correct },
      textAfter: s.value.textAfter,
    } as AorbInputValue));

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
      <div>
        <div className={styles.header}>
          <span>A or B</span>
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