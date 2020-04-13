import React, { FC, useState } from 'react';
import styles from './AorbChoiceForm.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { AorbChoiceInput } from '../aorb-sentence-input.model';

interface Props {
  choice?: AorbChoiceInput,
  onSubmit: (value: AorbChoiceInput) => void;
}

const AorbChoiceForm: FC<Props> = ({ choice, onSubmit }) => {

  const [a, setA] = useState('');
  const [b, setB] = useState('');

  const handleSubmit = (e) => {
    onSubmit({ a, b });

    // reset form
    setA('');
    setB('');
  }

  return (
    <div className={styles.actions}>
      {!choice && (
        <div className={styles.aorbForm}>
          <div className={styles.inputs}>
            <div className={styles.aInputGroup}>
              <label htmlFor="a">A</label>
              <input
                name="a"
                type="text"
                value={a}
                onChange={(e) => setA(e.target.value)}
              />
            </div>
            <div className={styles.bInputGroup}>
              <label htmlFor="b">B</label>
              <input
                name="b"
                type="text"
                value={b}
                onChange={(e) => setB(e.target.value)}
              />
            </div>
          </div>
          <button type="button" className={styles.insertButton} onClick={handleSubmit}>
            <FontAwesomeIcon icon={faArrowCircleRight} />
          </button>
        </div>
      )}
      {/* TODO: probably not the right place for this..., because why can choice be null... */}
      {choice && !choice.correct && (
        <span className={styles.markAsCorrectHint}>Click on A or B to mark it as correct.</span>
      )}
    </div>
  )
};

export default AorbChoiceForm;