import {faGraduationCap, faImage} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Formik} from "formik"
import React, {ChangeEvent, FC, useEffect, useRef, useState} from "react"
import {Alert, Dropdown, Form} from "react-bootstrap"
import ReactCountryFlag from "react-country-flag"
import TextareaAutosize from "react-textarea-autosize"
import Button from "../../button/Button"
import CustomToggle from "../../dropdown/custom-toggle/CustomToggle"
import {ExerciseType} from "../../exercise/exercise.model"
import LanguageSelect from "../../language/language-select/LanguageSelect"
import AorbExerciseInput from "./exercise-input/aorb-exercise-input/AorbExerciseInput"
import ExerciseInputValues from "./exercise-input/exercise-input.model"
import MissingwordExerciseInput from "./exercise-input/missingword-exercise-input/MissingwordExerciseInput"
import WhatdoyouseeExerciseInput from "./exercise-input/whatdoyousee-exercise-input/WhatdoyouseeExerciseInput"
import {schema} from "./schema"
import styles from "./PostForm.scss?module"
import ImagePreview from "./image-preview/ImagePreview"
import {getCountryCode} from "../../country/get-country-code"
import AorbExerciseInputValues from "./exercise-input/aorb-exercise-input/aorb-exercise-input.model";
import WhatdoyouseeExerciseInputValues
  from "./exercise-input/whatdoyousee-exercise-input/whatdoyousee-exercise-input.model";
import MissingwordExerciseInputValues
  from "./exercise-input/missingword-exercise-input/missingword-exercise-input.model";

interface Props {
  initialValues: Values
  onSubmit: (values: Values) => Promise<void>
}

export interface Values {
  channel?: string
  text?: string
  image?: File
  exercise?: ExerciseInputValues
}

const PostForm: FC<Props> = ({initialValues, onSubmit}) => {
  const fileInput = useRef(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [submitError, setSubmitError] = useState(false)
  const [exerciseType, setExerciseType] = useState<ExerciseType>(null)

  const actionsDisabled = (fileInput.current && fileInput.current.value) || exerciseType != null

  useEffect(() => {
    const {image, exercise} = initialValues
    if (image) {
      setImageUrl(URL.createObjectURL(image))
    }
    if (exercise) {
      setExerciseType(exercise.type)
      console.log(exercise.type)
    }
  }, [initialValues])

  const handleChangeImage = (setFieldValue) => (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.currentTarget.files[0]
    if (image) {
      setFieldValue("image", image)
      setImageUrl(URL.createObjectURL(image))
    }
  }

  const handleChangeText = (setFieldValue) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFieldValue("text", value || null)
  }

  const handleChangeExercise = (setFieldValue) => (change: ExerciseInputValues) => {
    setFieldValue("exercise", change)
  }

  const handleDeleteImage = (setFieldValue) => () => {
    setFieldValue("image", null)
    setImageUrl(null)
    fileInput.current.value = null
  }

  const handleClickImage = () => fileInput.current.click()

  const handleCloseExercise = (setFieldValue) => () => {
    setExerciseType(null)
    setFieldValue("exercise", null)
  }

  const handleSubmit = (values: Values, { setSubmitting, resetForm }) => {
    setSubmitError(false)

    onSubmit(values)
      .then(() => {
        if (fileInput.current != null) {
          fileInput.current.value = null
        }
        resetForm()
        setExerciseType(null)
      })
      .catch((e) => {
        console.log(e)
        setSubmitError(true)
        setSubmitting(false)
      })
  }

  const allNull = (...values) => {
    return values.every((element) => element === null)
  }

  const renderExerciseInput = (exerciseInputValues: ExerciseInputValues, setFieldValue) => {
    const otherProps = {
      onChange: handleChangeExercise(setFieldValue),
      onClose: handleCloseExercise(setFieldValue)
    }

    switch (exerciseInputValues.type) {
      case ExerciseType.A_OR_B: {
        const initialValues = exerciseInputValues as AorbExerciseInputValues
        return <AorbExerciseInput initialValues={initialValues} {...otherProps} />
      }
      case ExerciseType.WHAT_DO_YOU_SEE: {
        const initialValues = exerciseInputValues as WhatdoyouseeExerciseInputValues
        return <WhatdoyouseeExerciseInput initialValues={initialValues} {...otherProps} />
      }
      case ExerciseType.MISSING_WORD: {
        const initialValues = exerciseInputValues as MissingwordExerciseInputValues
        return <MissingwordExerciseInput initialValues={initialValues} {...otherProps} />
      }
      default:
        throw new Error(`Cannot render unsupported exercise type: ${exerciseInputValues.type}`)
    }
  }

  const createExercise = (type: string, setFieldValue) => {
    const exercise = {type}
    setFieldValue("exercise", exercise)
  }

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, { setSubmitting, resetForm }) => handleSubmit({ ...values }, { setSubmitting, resetForm })}
      initialValues={initialValues}
    >
      {({ handleSubmit, setFieldValue, values, isValid, isSubmitting, errors }) => (
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
              <ReactCountryFlag className={styles.countryFlag} countryCode={getCountryCode(values.channel)} svg />
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
              <Form.Control
                className={styles.imageInput}
                name="image"
                type="file"
                onChange={handleChangeImage(setFieldValue)}
                accept=".jpg,.png"
                ref={fileInput}
              />
              {values.image && (
                <ImagePreview
                  className={styles.imagePreview}
                  src={imageUrl}
                  onDelete={handleDeleteImage(setFieldValue)}
                />
              )}
              {values.exercise && (
                <div className={styles.exercise}>{renderExerciseInput(values.exercise, setFieldValue)}</div>
              )}
          </div>
            <div className={styles.actions}>
              <button className={styles.button} type="button" onClick={handleClickImage} disabled={actionsDisabled}>
                <span className="mr-2">
                  <FontAwesomeIcon icon={faImage} />
                </span>
                Image
              </button>
              <Dropdown className={styles.exerciseDropdown}>
                <Dropdown.Toggle as={CustomToggle} id="something">
                  <button className={styles.button} type="button" disabled={actionsDisabled}>
                    <span className="mr-2">
                      <FontAwesomeIcon icon={faGraduationCap} />
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
            disabled={allNull(values.text, values.image, values.exercise) || !isValid || isSubmitting}
          >
            Post
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
