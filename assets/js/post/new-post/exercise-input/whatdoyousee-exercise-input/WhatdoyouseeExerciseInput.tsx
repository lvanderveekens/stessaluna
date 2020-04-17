import React, { FC, useState, useEffect } from 'react'
import styles from './WhatdoyouseeExerciseInput.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import WhatdoyouseeExerciseInputValue from './whatdoyousee-exercise-input.model';

interface Props {
  onChange: (change: WhatdoyouseeExerciseInputValue) => void
  onClose: () => void
}

const WhatdoyouseeExerciseInput: FC<Props> = ({ onChange, onClose }) => {

  return (
    <div className={styles.whatdoyouseeExerciseInput}>
      <div className={styles.header}>
        <span>What Do You See</span>
        <FontAwesomeIcon className={styles.closeButton} icon={faTimes} onClick={onClose} />
      </div>
    </div>
  );
};

export default WhatdoyouseeExerciseInput;