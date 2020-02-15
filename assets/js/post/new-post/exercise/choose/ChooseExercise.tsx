import React, { FC } from 'react';
import styles from './ChooseExercise.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ExerciseType from '../type';

interface Props {
  onChoice: (type: ExerciseType) => void
  onClose: () => void
}

const ChooseExercise: FC<Props> = ({ onChoice, onClose }) => {

  return (
    <div className={styles.chooseExercise}>
      <div className={styles.exerciseOption} onClick={() => onChoice(ExerciseType.A_OR_B)}>A or B</div>
      <div className={styles.exerciseOption}>More</div>
    </div>
  );
};

export default ChooseExercise;