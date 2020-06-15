import React, { FC } from 'react';
import styles from './ExerciseInputHeader.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  title: string
  onClose: () => void
}

const ExerciseInputHeader: FC<Props> = ({ title, onClose }) => {

  return (
    <div className={styles.exerciseInputHeader}>
      <span>{title}</span>
      <span
        className={styles.closeButton}
        onClick={onClose}
      >
      <FontAwesomeIcon icon={faTimes}/>
      </span>
    </div>
  )
}

export default ExerciseInputHeader;