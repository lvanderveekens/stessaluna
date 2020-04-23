import React, { FC, useState, useEffect } from "react";
import styles from "./WhatdoyouseeExerciseInput.scss?module";

import WhatdoyouseeExerciseInputValue from "./whatdoyousee-exercise-input.model";
import ExerciseInputHeader from "../exercise-input-header/ExerciseInputHeader";
import ImageInput from "../../../../image/image-input/ImageInput";

interface Props {
  onChange: (change: WhatdoyouseeExerciseInputValue) => void;
  onClose: () => void;
}

const WhatdoyouseeExerciseInput: FC<Props> = ({ onChange, onClose }) => {
  const [image, setImage] = useState<File>(null);
  const [option1, setOption1] = useState<string>("");
  const [option2, setOption2] = useState<string>("");
  const [option3, setOption3] = useState<string>("");
  const [option4, setOption4] = useState<string>("");

  useEffect(() => {
    onChange(new WhatdoyouseeExerciseInputValue(image, option1, option2, option3, option4));
  }, [image, option1, option2, option3, option4]);

  return (
    <div className={styles.whatdoyouseeExerciseInput}>
      <ExerciseInputHeader title="What Do You See" onClose={onClose} />
      <div className={styles.image}>
        <div className={styles.aspectRatioBox}>
          <ImageInput className={styles.imageInput} value={image} onChange={setImage} />
        </div>
      </div>
      <div>
        <div className="d-flex">
          <div className={`${styles.option} form-group`}>
            <input
              name="option1"
              type="text"
              className="form-control"
              value={option1}
              onChange={(e) => setOption1(e.currentTarget.value)}
            />
          </div>
          <div className={`${styles.option} form-group`}>
            <input
              name="option2"
              type="text"
              className="form-control"
              value={option2}
              onChange={(e) => setOption2(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="d-flex">
          <div className={`${styles.option} form-group`}>
            <input
              name="option3"
              type="text"
              className="form-control"
              value={option3}
              onChange={(e) => setOption3(e.currentTarget.value)}
            />
          </div>
          <div className={`${styles.option} form-group`}>
            <input
              name="option4"
              type="text"
              className="form-control"
              value={option4}
              onChange={(e) => setOption4(e.currentTarget.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatdoyouseeExerciseInput;
