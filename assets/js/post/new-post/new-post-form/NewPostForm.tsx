import React, { useState, FC, useRef, ChangeEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Formik } from 'formik';
import { Form, Button, Dropdown } from 'react-bootstrap';
import styles from './NewPostForm.scss?module';
import User from '../../../user/user.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import ImagePreview from './image-preview/ImagePreview';
import ExerciseInputValue from '../exercise/exercise-input.model';
import AorbExerciseInput from '../exercise/aorb-exercise-input/AorbExerciseInput';
import { schema } from './schema';
import CustomToggle from '../../../dropdown/CustomToggle';

interface Props {
  user: User
  onSubmit: (text?: string, image?: File, exercise?: ExerciseInputValue) => Promise<void>
}

interface Values {
  text?: string
  image?: File
  exercise?: ExerciseInputValue
}

const NewPostForm: FC<Props> = ({ user, onSubmit }) => {

  const fileInput = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [submitError, setSubmitError] = useState(false);
  const [showExercise, setShowExercise] = useState(false);

  const handleChangeImage = (setFieldValue) => (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.currentTarget.files[0];
    if (image) {
      setFieldValue("image", image);
      setImageUrl(URL.createObjectURL(image));
    }
  };

  const handleChangeText = (setFieldValue) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFieldValue("text", value || null)
  }

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

  const handleCloseExercise = (setFieldValue) => () => {
    setShowExercise(false);
    setFieldValue("exercise", null)
  }

  const handleSubmit = ({ text, image, exercise }: Values, resetForm) => {
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

  const allNull = ({ text, image, exercise }: Values) => {
    return text === null && image === null && exercise === null
  }

  return (
    <Formik
      validationSchema={schema}
      onSubmit={({ text, image, exercise }, { resetForm }) => handleSubmit({ text, image, exercise }, resetForm)}
      initialValues={{ text: null, image: null, exercise: null } as Values}
    >
      {({ handleSubmit, setFieldValue, values, isValid }) => (
        <Form className={styles.newPostForm} noValidate onSubmit={handleSubmit}>
          <div className={styles.wrapper}>
            <TextareaAutosize
              className={`${styles.textInput} form-control`}
              type="text"
              name="text"
              value={values.text || ''}
              placeholder={user && `What's new, ${user.username}?`}
              onChange={handleChangeText(setFieldValue)}
            />
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
                  onClose={handleCloseExercise(setFieldValue)}
                />
              </div>
            )}
            <div className={styles.actions}>
              <button className={styles.button} type="button" onClick={handleClickImage} disabled={!!values.image || !!values.exercise}>
                <FontAwesomeIcon icon={faImage} /> Image
              </button>
              <Dropdown className={styles.exerciseDropdown}>
                <Dropdown.Toggle as={CustomToggle} id="something">
                  <button className={styles.button} type="button" disabled={!!values.image || !!values.exercise}>
                    <FontAwesomeIcon icon={faGraduationCap} /> Exercise
                  </button>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => console.log("CLICKED")}>A or B</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* TODO: block submit if while all form values are still null */}
              <button className={styles.submitButton} type="submit" disabled={allNull(values) || !isValid}>Create</button>
            </div>
          </div>
          {submitError && (<div className="alert alert-danger">Something went wrong. Please try again later.</div>)}
        </Form>
      )}
    </Formik>
  );
};

export default NewPostForm;