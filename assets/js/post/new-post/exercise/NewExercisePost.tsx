import React, { FC, useState, Fragment } from 'react';
import ChooseExercise from './choose/ChooseExercise';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './NewExercisePost.scss?module';

interface Props {
  onClose: () => void
}

const NewExercisePost: FC<Props> = ({ onClose }) => {

  const [type, setType] = useState(null);

  return (
    <div className={styles.newExercisePost}>
      <div className={styles.header}>
        <span>New Exercise</span>
        <FontAwesomeIcon className={styles.closeButton} icon={faTimes} onClick={onClose} />
      </div>
      {type === null
        ? <ChooseExercise onChoice={type => setType(type)} onClose={onClose} />
        : (
          <div>
            {type}
          </div>
        )}
    </div>
  );
};

export default NewExercisePost;