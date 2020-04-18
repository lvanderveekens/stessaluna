import React, { FC, useState, useEffect } from 'react'
import styles from './WhatdoyouseeExerciseInput.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import WhatdoyouseeExerciseInputValue from './whatdoyousee-exercise-input.model';
import ExerciseInputHeader from '../exercise-input-header/ExerciseInputHeader';

interface Props {
  onChange: (change: WhatdoyouseeExerciseInputValue) => void
  onClose: () => void
}

const WhatdoyouseeExerciseInput: FC<Props> = ({ onChange, onClose }) => {

  return (
    <div className={styles.whatdoyouseeExerciseInput}>
      <ExerciseInputHeader title="What Do You See" onClose={onClose} />
    </div>
  );
};

export default WhatdoyouseeExerciseInput;