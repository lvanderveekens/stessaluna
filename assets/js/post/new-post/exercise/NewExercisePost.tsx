import React, { FC, useState, Fragment } from 'react';
import ChooseExercise from './choose/ChooseExercise';

interface Props {
  onClose: () => void
}

const NewExercisePost: FC<Props> = ({ onClose }) => {

  const [type, setType] = useState(null);

  return (
    <Fragment>
      {type === null
        ? <ChooseExercise onChoice={type => setType(type)} onClose={onClose} />
        : (<div>{type}</div>)}
    </Fragment>
  );
};

export default NewExercisePost;