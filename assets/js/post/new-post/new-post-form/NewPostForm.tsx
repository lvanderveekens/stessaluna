import React, { useState, FC, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import styles from './NewPostForm.scss?module';
import User from '../../../user/user.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import ImagePreview from './image-preview/ImagePreview';
import Exercise from '../../../exercise/exercise.model';
import ExerciseInputValue from '../exercise/exercise-input.model';
import AorbExerciseInput from '../exercise/aorb-exercise-input/AorbExerciseInput';
import { schema } from './schema';

interface Props {
  user: User
  onSubmit: (text?: string, image?: File, exercise?: ExerciseInputValue) => Promise<void>
}

const NewPostForm: FC<Props> = ({ user, onSubmit }) => {

  const fileInput = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [submitError, setSubmitError] = useState(false);
  const [showExercise, setShowExercise] = useState(false);

  const handleChangeImage = (setFieldValue) => (e) => {
    const image = e.currentTarget.files[0];
    if (image) {
      setFieldValue("image", image);
      setImageUrl(URL.createObjectURL(image));
    }
  };

  const handleChangeExercise = (setFieldValue) => (change: ExerciseInputValue) => {
    setFieldValue("exercise", change);
  };

  const handleDeleteImage = (setFieldValue) => () => {
    setFieldValue("image", null);
    fileInput.current.value = null;
  };

  const handleClickImage = () => {
    fileInput.current.click();
  }

  const handleClickExercise = () => {
    console.log("CLICKED");
    // TODO: later let the user choose via a dropdown, but for now insert the aorb exercise

    setShowExercise(true);
  }

  const handleSubmit = ({ text, image, exercise }, resetForm) => {
    setSubmitError(false);

    onSubmit(text, image, exercise).
      then(() => {
        fileInput.current.value = null;
        resetForm();
        setShowExercise(false);
      })
      .catch((e) => {
        console.log(e);
        setSubmitError(true);
      })
  }

  return (
    <Formik
      validationSchema={schema}
      onSubmit={({ text, image, exercise }, { resetForm }) => handleSubmit({ text, image, exercise }, resetForm)}
      initialValues={{ text: null, image: null, exercise: null } as { text?: string, image?: File, exercise?: ExerciseInputValue }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }) => (
        <Form className={styles.newPostForm} noValidate onSubmit={handleSubmit}>
          <div className={styles.wrapper}>
            <TextareaAutosize
              className={`${styles.textInput} form-control`}
              type="text"
              name="text"
              value={values.text || ''}
              placeholder={user && `What's new, ${user.username}?`}
              onChange={handleChange}
            />
            {touched.text && errors.text && (<div>{errors.text}</div>)}
            <Form.Control
              className={styles.imageInput}
              id="image"
              name="image"
              type="file"
              onChange={handleChangeImage(setFieldValue)}
              accept=".jpg,.png"
              ref={fileInput}
            />
            {values.image && (
              <div className={styles.images}>
                <ImagePreview src={imageUrl} onDelete={handleDeleteImage(setFieldValue)} />
              </div>
            )}
            {showExercise && (
              <div className={styles.exercise}>
                <AorbExerciseInput
                  onChange={handleChangeExercise(setFieldValue)}
                  onClose={() => setShowExercise(false)}
                />
              </div>
            )}
            {touched.exercise && errors.exercise && (<div>{JSON.stringify(errors.exercise)}</div>)}
            <div className={styles.actions}>
              <button className={styles.button} type="button" onClick={handleClickImage} disabled={!!values.image || showExercise}>
                <FontAwesomeIcon icon={faImage} /> Image
              </button>
              <button className={styles.button} type="button" onClick={handleClickExercise} disabled={!!values.image || showExercise}>
                <FontAwesomeIcon icon={faGraduationCap} /> Exercise
              </button>
              {/* TODO: block submit if while all form values are still null */}
              <button className={styles.submitButton} type="submit">Create</button>
            </div>
          </div>
          {submitError && (<div className="alert alert-danger">Something went wrong. Please try again later.</div>)}
        </Form>
      )}
    </Formik>
  );
};

export default NewPostForm;