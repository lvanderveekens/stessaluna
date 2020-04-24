import React, { FC, useState, useEffect } from "react";
import styles from "./WhatdoyouseeExerciseInput.scss?module";
import WhatdoyouseeExerciseInputValue from "./whatdoyousee-exercise-input.model";
import ExerciseInputHeader from "../exercise-input-header/ExerciseInputHeader";
import ImageInput from "../../../../image/image-input/ImageInput";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

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
  const [correct, setCorrect] = useState<number>(null);

  useEffect(() => {
    onChange(new WhatdoyouseeExerciseInputValue(image, option1, option2, option3, option4, correct));
  }, [image, option1, option2, option3, option4, correct]);

  const option1ClassName = cx("option", { correct: correct === 1 });
  const option2ClassName = cx("option", { correct: correct === 2 });
  const option3ClassName = cx("option", { correct: correct === 3 });
  const option4ClassName = cx("option", { correct: correct === 4 });

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
          <div className={option1ClassName}>
            <label onClick={() => setCorrect(1)}>1</label>
            <input name="option1" type="text" value={option1} onChange={(e) => setOption1(e.currentTarget.value)} />
          </div>
          <div className={option2ClassName}>
            <label onClick={() => setCorrect(2)}>2</label>
            <input name="option2" type="text" value={option2} onChange={(e) => setOption2(e.currentTarget.value)} />
          </div>
        </div>
        <div className="d-flex">
          <div className={option3ClassName}>
            <label onClick={() => setCorrect(3)}>3</label>
            <input name="option3" type="text" value={option3} onChange={(e) => setOption3(e.currentTarget.value)} />
          </div>
          <div className={option4ClassName}>
            <label onClick={() => setCorrect(4)}>4</label>
            <input name="option4" type="text" value={option4} onChange={(e) => setOption4(e.currentTarget.value)} />
          </div>
        </div>
      </div>
      {!correct && <div className={styles.hint}>Click on the index to mark an option as correct.</div>}
    </div>
  );
};

export default WhatdoyouseeExerciseInput;
