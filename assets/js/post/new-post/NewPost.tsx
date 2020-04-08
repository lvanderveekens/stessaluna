import React, { Fragment, useState, FC } from 'react';
import NewTextPost from './text/NewTextPost';
import NewExercisePost from './exercise/NewExercisePost';

interface Props {
}

const NewPost: FC<Props> = ({ }) => {

  // TODO: change back to text later
  const [type, setType] = useState('text');
  // const [type, setType] = useState('exercise');

  return (
    <Fragment>
      <h4>New post</h4>
      {type === 'text' && (<NewTextPost onExercise={() => setType('exercise')} />)}
      {type === 'exercise' && (<NewExercisePost onClose={() => setType('text')} />)}
    </Fragment>
  );
};

export default NewPost;