import {faGraduationCap, faImage} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Formik} from "formik"
import React, {ChangeEvent, FC, useRef, useState} from "react"
import {Alert, Dropdown, Form} from "react-bootstrap"
import ReactCountryFlag from "react-country-flag"
import TextareaAutosize from "react-textarea-autosize"
import Button from "../../button/Button"
import CustomToggle from "../../dropdown/custom-toggle/CustomToggle"
import {ExerciseType} from "../../exercise/exercise.model"
import LanguageSelect from "../../language/language-select/LanguageSelect"
import ExerciseInputValues from "./exercise-input/exercise-input.model"
import {schema} from "./schema"
import styles from "./PostForm.scss?module"
import ImagePreview from "./image-preview/ImagePreview"
import {getCountryCode} from "../../country/get-country-code"
import Image from "../../image/image.interface";
import ImageInput from "../../image/image-input/ImageInput";
import {renderExerciseInput} from "./exercise-input/exercise-input.helper";
import AorbExerciseInputValues from "./exercise-input/aorb-exercise-input/aorb-exercise-input.model";

interface Props {
  initialValues: Values
  onSubmit: (values: Values) => Promise<void>
  submitLabel: string
}

export interface Values {
  channel?: string
  text?: string
  image?: Image
  exercise?: ExerciseInputValues
}

const PostForm: FC<Props> = ({initialValues, onSubmit, submitLabel}) => {
  const imageInputRef = useRef<HTMLInputElement>(null)
  const [submitError, setSubmitError] = useState(false)

  const actionsDisabled = (values: Values) => values.image != null || values.exercise != null

  const handleChangeText = (setFieldValue) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFieldValue("text", value)
  }

  const handleChangeImage = (setFieldValue) => (image: Image) => setFieldValue("image", image)

  const handleDeleteImage = (setFieldValue) => () => setFieldValue("image", null)

  const handleClickImage = () => imageInputRef.current.click()

  const handleSubmit = (values: Values, {setSubmitting, resetForm}) => {
    setSubmitError(false)

    onSubmit(values)
      .catch((e) => {
        console.log(e)
        setSubmitError(true)
        setSubmitting(false)
      })

  }

  const allNull = (...values) => values.every((element) => element === null)

  const createExercise = (type: string, setFieldValue) => {
    let exercise;
    switch (type) {
      case ExerciseType.A_OR_B:
        exercise = new AorbExerciseInputValues([{}])
        break;
      case ExerciseType.WHAT_DO_YOU_SEE:
      case ExerciseType.MISSING_WORD:
        exercise = {type}
        break;
    }
    return setFieldValue("exercise", exercise);
  }

  const handleChangeExercise = (setFieldValue) => (change: ExerciseInputValues) => setFieldValue("exercise", change)

  const handleCloseExercise = (setFieldValue) => () => setFieldValue("exercise", null)

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, {setSubmitting, resetForm}) => handleSubmit({...values}, {setSubmitting, resetForm})}
      initialValues={initialValues}
    >
      {({handleSubmit, setFieldValue, values, isValid, isSubmitting, errors, dirty}) => (
        <Form className={styles.postForm} noValidate onSubmit={handleSubmit}>
          <div className={styles.channelWrapper}>
            <label>In</label>
            <LanguageSelect
              className={`${styles.channelSelect} form-control`}
              name="channel"
              placeholder="Select channel"
              value={values.channel}
              onChange={(value) => setFieldValue("channel", value)}
            />
            {values.channel && getCountryCode(values.channel) && (
              <ReactCountryFlag className={styles.countryFlag} countryCode={getCountryCode(values.channel)} svg/>
            )}
          </div>
          <div className={styles.wrapper}>
            <div className={styles.content}>
              <TextareaAutosize
                className={`${styles.textInput} form-control`}
                type="text"
                name="text"
                value={values.text || ""}
                placeholder="What's new?"
                onChange={handleChangeText(setFieldValue)}
              />
              {!values.image && (
                <ImageInput
                  ref={imageInputRef}
                  onChange={handleChangeImage(setFieldValue)}
                />
              )}
              {values.image && (
                <div className={styles.imagePreview}>
                  <ImagePreview src={values.image.url} onDelete={handleDeleteImage(setFieldValue)}/>
                </div>
              )}
              {values.exercise && (
                <div className={styles.exercise}>{
                  renderExerciseInput(
                    values.exercise,
                    handleChangeExercise(setFieldValue),
                    handleCloseExercise(setFieldValue)
                  )
                }</div>
              )}
            </div>
            <div className={styles.actions}>
              <button className={styles.button} type="button" onClick={handleClickImage}
                      disabled={actionsDisabled(values)}>
                <span className="mr-2">
                  <FontAwesomeIcon icon={faImage}/>
                </span>
                Image
              </button>
              <Dropdown className={styles.exerciseDropdown}>
                <Dropdown.Toggle as={CustomToggle} id="something">
                  <button className={styles.button} type="button" disabled={actionsDisabled(values)}>
                    <span className="mr-2">
                      <FontAwesomeIcon icon={faGraduationCap}/>
                    </span>
                    Exercise
                  </button>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => createExercise(ExerciseType.A_OR_B, setFieldValue)}>
                    A or B
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => createExercise(ExerciseType.WHAT_DO_YOU_SEE, setFieldValue)}>
                    What do you see
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => createExercise(ExerciseType.MISSING_WORD, setFieldValue)}>
                    Missing word
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <Button
            className={styles.submitButton}
            type="submit"
            disabled={allNull(values.text, values.image, values.exercise) || !isValid || isSubmitting || !dirty}
          >
            {submitLabel}
          </Button>
          {submitError && (
            <Alert
              className={styles.alert}
              variant="danger"
              onClose={() => setSubmitError(false)}
              dismissible
            >
              Something went wrong. Please try again later.
            </Alert>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default PostForm
