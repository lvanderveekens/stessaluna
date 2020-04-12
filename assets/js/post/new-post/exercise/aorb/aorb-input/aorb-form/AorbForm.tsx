import React, { FC, useState } from 'react';
import styles from './AorbForm.scss?module';
import { AorbInputChoice } from '../aorb-input.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

interface Props {
  choice?: AorbInputChoice,
  onSubmit: (a: string, b: string) => void;
}

const AorbForm: FC<Props> = ({ choice, onSubmit }) => {

  const [aInput, setAInput] = useState('');
  const [bInput, setBInput] = useState('');

  const handleSubmit = (e) => {
    onSubmit(aInput, bInput);

    // reset form
    setAInput('');
    setBInput('');
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
                value={aInput}
                onChange={(e) => setAInput(e.target.value)}
              />
            </div>
            <div className={styles.bInputGroup}>
              <label htmlFor="b">B</label>
              <input
                name="b"
                type="text"
                value={bInput}
                onChange={(e) => setBInput(e.target.value)}
              />
            </div>
          </div>
          <button type="button" className={styles.insertButton} onClick={handleSubmit}>
            <FontAwesomeIcon icon={faArrowCircleRight} />
          </button>
        </div>
      )}
      {choice && !choice.correct && (
        <span className={styles.markAsCorrectHint}>Click on A or B to mark it as correct.</span>
      )}
    </div>
  )
};

export default AorbForm;