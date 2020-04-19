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

  const [image, setImage] = useState<File>(null);
  const [option1, setOption1] = useState<string>(null);
  const [option2, setOption2] = useState<string>(null);
  const [option3, setOption3] = useState<string>(null);
  const [option4, setOption4] = useState<string>(null);

  return (
    <div className={styles.whatdoyouseeExerciseInput}>
      <ExerciseInputHeader title="What Do You See" onClose={onClose} />

      <ImageInput
        value={image}
        onChange={setImage}
      />
      <div>
        <div className="form-group">
          <input
            name="option1"
            type="text"
            className="form-control"
            value={option1}
            onChange={(e) => setOption1(e.currentTarget.value)}
          />
        </div>
        <div className="form-group">
          <input
            name="option2"
            type="text"
            className="form-control"
            value={option2}
            onChange={(e) => setOption2(e.currentTarget.value)}
          />
        </div>
        <div className="form-group">
          <input
            name="option3"
            type="text"
            className="form-control"
            value={option3}
            onChange={(e) => setOption3(e.currentTarget.value)}
          />
        </div>
        <div className="form-group">
          <input
            name="option4"
            type="text"
            className="form-control"
            value={option4}
            onChange={(e) => setOption4(e.currentTarget.value)}
          />
        </div>
      </div>

      {/* 4 text inputs */}

    </div>
  );
};

export default WhatdoyouseeExerciseInput;