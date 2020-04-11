import React, { FC, useState } from 'react';
import NewPostForm from './new-post-form';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';

interface Props {
}

const NewPost: FC<Props> = ({ }) => {

  const [top, setTop] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 480 });

  const newPostWrapperStyle = isMobile ? {} : { top: top };
  const newPostWrapperClass = classNames({ 'position-sticky': !isMobile });

  const refCallback = element => {
    if (element) {
      setTop(element.getBoundingClientRect().top);
    }
  };

  return (
    <div ref={refCallback} className={newPostWrapperClass} style={newPostWrapperStyle}>
      <h4>New post</h4>
      <NewPostForm />
    </div>
  )
}

export default NewPost;