import React, { FC, useState, useEffect, ChangeEvent } from 'react'
import styles from './WhatdoyouseeExerciseInput.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import WhatdoyouseeExerciseInputValue from './whatdoyousee-exercise-input.model';
import ExerciseInputHeader from '../exercise-input-header/ExerciseInputHeader';
import ImageInput from '../../../../image/image-input/ImageInput';

interface Props {
  onChange: (change: WhatdoyouseeExerciseInputValue) => void
  onClose: () => void
}

const WhatdoyouseeExerciseInput: FC<Props> = ({ onChange, onClose }) => {

  const [imageSrc, setImageSrc] = useState<string>(null);

  const handleChange = (image: File | null) => {
    if (image) {
      setImageSrc(URL.createObjectURL(image))
    }
  }

  return (
    <div className={styles.whatdoyouseeExerciseInput}>
      <ExerciseInputHeader title="What Do You See" onClose={onClose} />

      {/* image upload */}
      {/* <ImageInput
        value={image}
        src={imageSrc}
        onChange={handleChange}
        onDelete={() => setImageSrc(null)}
      /> */}
      {/* 4 text inputs */}

    </div>
  );
};

export default WhatdoyouseeExerciseInput;