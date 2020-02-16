import React, { FC, useState, Fragment } from 'react';
import ChooseExercise from './choose/ChooseExercise';
import styles from './NewExercisePost.scss?module';
import ExerciseType from './type';
import NewAorbExercise from './aorb/NewAorbExercise';

interface Props {
  onClose: () => void
}

const NewExercisePost: FC<Props> = ({ onClose }) => {

  // TODO: change back to null later
  const [type, setType] = useState(ExerciseType.A_OR_B);

  const renderNewExercise = () => {
    switch (type) {
      case ExerciseType.A_OR_B: return <NewAorbExercise onClose={onClose} />;
    }
  }

  return (
    <div className={styles.newExercisePost}>
      {type === null
        ? <ChooseExercise onChoice={type => setType(type)} onClose={onClose} />
        : renderNewExercise()}
    </div>
  );
};

export default NewExercisePost;