import React, { FC } from 'react';
import styles from './ChooseExercise.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  onChoice: (exercise: string) => void
  onClose: () => void
}

const ChooseExercise: FC<Props> = ({ onChoice, onClose }) => {

  return (
    <div className={styles.chooseExercise}>
      <div className={styles.header}><FontAwesomeIcon className={styles.closeButton} icon={faTimes} onClick={onClose} /></div>
      <div className={styles.exerciseOption} onClick={() => onChoice('aorb')}>A or B</div>
      <div className={styles.exerciseOption}>More</div>
    </div>
  );
};

export default ChooseExercise;