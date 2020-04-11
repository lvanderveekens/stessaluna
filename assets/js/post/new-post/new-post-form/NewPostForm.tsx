import React, { Fragment, useState, FC, useRef } from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import styles from './NewPostForm.scss?module';
import * as yup from 'yup';
import User from '../../../user/user.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faGraduationCap, faTimes } from '@fortawesome/free-solid-svg-icons';
import Exercise from '../../../exercise/exercise.interface';

interface Props {
  user: User
  onSubmit: (text?: string, image?: File, exercise?: Exercise) => void
}

const schema = yup.object({
  text: yup.string(),
  image: yup.mixed(),
  exercise: yup.mixed(),
});

const NewPostForm: FC<Props> = ({ user, onSubmit }) => {

  const fileInput = useRef(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (setFieldValue) => (e) => {
    const image = e.currentTarget.files[0];
    if (image) {
      setFieldValue("image", image);
      setImageUrl(URL.createObjectURL(image));
    }
  };

  const handleDeleteImageClick = (setFieldValue) => (e) => {
    setFieldValue("image", null);
    fileInput.current.value = null;
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={({ text, image, exercise }) => onSubmit(text, image, exercise)}
      initialValues={{ text: '', image: null, exercise: null }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleSubmit, handleChange, setFieldValue, values }) => (
        <Form className={styles.newPostForm} noValidate onSubmit={handleSubmit}>
          <div className={styles.inputBox}>
            <TextareaAutosize
              className={`${styles.textInput} form-control`}
              type="text"
              name="text"
              value={values.text}
              placeholder={user && `What's new, ${user.username}?`}
              onChange={handleChange}
            />
            <Form.Control
              className={styles.imageInput}
              id="image"
              name="image"
              type="file"
              onChange={handleImageChange(setFieldValue)}
              accept=".jpg,.png"
              ref={fileInput}
            />
            {values.image && (
              <div className={styles.images}>
                <div className={styles.imageContainer}>
                  <img src={imageUrl} />
                  <div className={styles.imageOverlay}>
                    <FontAwesomeIcon className={styles.removeIcon} icon={faTimes} onClick={handleDeleteImageClick(setFieldValue)} />
                  </div>
                </div>
              </div>
            )}
            <div className={styles.actions}>
              <Form.Label htmlFor="image">
                <span><FontAwesomeIcon icon={faImage} />Image</span>
              </Form.Label>
              <span onClick={() => console.log("CLICKED")}>
                <FontAwesomeIcon icon={faGraduationCap} />Exercise
              </span>
            </div>
          </div>
          <Button className="btn btn-dark mb-2" type="submit">Create</Button>
        </Form>
      )}
    </Formik>
  );
};

export default NewPostForm;