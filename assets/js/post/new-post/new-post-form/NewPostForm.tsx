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
import { ExerciseType } from '../../../exercise/exercise.model';

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
  const [exerciseType, setExerciseType] = useState<ExerciseType>(null);

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

  const handleCloseExercise = (setFieldValue) => () => {
    setExerciseType(null);
    setFieldValue("exercise", null)
  }

  const handleSubmit = ({ text, image, exercise }: Values, resetForm) => {
    setSubmitError(false);

    onSubmit(text, image, exercise).
      then(() => {
        fileInput.current.value = null;
        resetForm();
        setExerciseType(null);
      })
      .catch((e) => {
        console.log(e);
        setSubmitError(true);
      })
  }

  const allNull = ({ text, image, exercise }: Values) => {
    return text === null && image === null && exercise === null
  }

  const renderExerciseInput = (setFieldValue) => {
    switch (exerciseType) {
      case ExerciseType.AORB:
        return (
          <AorbExerciseInput
            onChange={handleChangeExercise(setFieldValue)}
            onClose={handleCloseExercise(setFieldValue)}
          />
        )
      default:
        break;
    }
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
            {exerciseType && (
              <div className={styles.exercise}>
                {renderExerciseInput(setFieldValue)}
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
                  <Dropdown.Item onClick={() => setExerciseType(ExerciseType.AORB)}>A or B</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <button className={styles.submitButton} type="submit" disabled={allNull(values) || !isValid}>Create</button>
            </div>
          </div>
          {submitError && (<div className="alert alert-danger">Something went wrong. Please try again later.</div>)}
        </Form>
      )
      }
    </Formik >
  );
};

export default NewPostForm;