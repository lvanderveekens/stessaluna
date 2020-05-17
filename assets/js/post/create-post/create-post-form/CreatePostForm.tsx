import { faGraduationCap, faImage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Formik } from "formik"
import React, { ChangeEvent, FC, useRef, useState } from "react"
import { Dropdown, Form } from "react-bootstrap"
import ReactCountryFlag from "react-country-flag"
import TextareaAutosize from "react-textarea-autosize"
import Button from "../../../button/Button"
import CustomToggle from "../../../dropdown/custom-toggle/CustomToggle"
import { ExerciseType } from "../../../exercise/exercise.model"
import LanguageSelect from "../../../language/language-select/LanguageSelect"
import AorbExerciseInput from "../exercise-input/aorb-exercise-input/AorbExerciseInput"
import ExerciseInputValue from "../exercise-input/exercise-input.model"
import MissingwordExerciseInput from "../exercise-input/missingword-exercise-input/MissingwordExerciseInput"
import WhatdoyouseeExerciseInput from "../exercise-input/whatdoyousee-exercise-input/WhatdoyouseeExerciseInput"
import { schema } from "./create-post-form.schema"
import styles from "./CreatePostForm.scss?module"
import ImagePreview from "./image-preview/ImagePreview"

interface Props {
  onSubmit: (channel: string, text?: string, image?: File, exercise?: ExerciseInputValue) => Promise<void>
}

interface Values {
  channel: string
  text?: string
  image?: File
  exercise?: ExerciseInputValue
}

const CreatePostForm: FC<Props> = ({ onSubmit }) => {
  const fileInput = useRef(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [submitError, setSubmitError] = useState(false)
  const [exerciseType, setExerciseType] = useState<ExerciseType>(null)

  const actionsDisabled = (fileInput.current && fileInput.current.value) || exerciseType != null

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

  const handleChangeExercise = (setFieldValue) => (change: ExerciseInputValue) => {
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

  const handleSubmit = ({ channel, text, image, exercise }: Values, { setSubmitting, resetForm }) => {
    setSubmitError(false)

    onSubmit(channel, text, image, exercise)
      .then(() => {
        fileInput.current.value = null
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

  const renderExerciseInput = (setFieldValue) => {
    const props = { onChange: handleChangeExercise(setFieldValue), onClose: handleCloseExercise(setFieldValue) }
    switch (exerciseType) {
      case ExerciseType.A_OR_B:
        return <AorbExerciseInput {...props} />
      case ExerciseType.WHAT_DO_YOU_SEE:
        return <WhatdoyouseeExerciseInput {...props} />
      case ExerciseType.MISSING_WORD:
        return <MissingwordExerciseInput {...props} />
      default:
        throw new Error(`Cannot render unsupported exercise type: ${exerciseType}`)
    }
  }

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, { setSubmitting, resetForm }) => handleSubmit({ ...values }, { setSubmitting, resetForm })}
      initialValues={{ channel: null, text: null, image: null, exercise: null } as Values}
    >
      {({ handleSubmit, setFieldValue, values, isValid, isSubmitting, errors }) => (
        <Form className={styles.createPostForm} noValidate onSubmit={handleSubmit}>
          <div className={styles.channelWrapper}>
            <label>In</label>
            <LanguageSelect
              className={`${styles.channelSelect} form-control`}
              name="channel"
              placeholder="Select channel"
              value={values.channel}
              valueType="long"
              onChange={(value) => setFieldValue("channel", value)}
            />
          </div>
          <div className={styles.wrapper}>
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
              <div className={styles.images}>
                <ImagePreview src={imageUrl} onDelete={handleDeleteImage(setFieldValue)} />
              </div>
            )}
            {exerciseType && <div className={styles.exercise}>{renderExerciseInput(setFieldValue)}</div>}
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
                  <Dropdown.Item onClick={() => setExerciseType(ExerciseType.A_OR_B)}>A or B</Dropdown.Item>
                  <Dropdown.Item onClick={() => setExerciseType(ExerciseType.WHAT_DO_YOU_SEE)}>
                    What do you see
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setExerciseType(ExerciseType.MISSING_WORD)}>Missing word</Dropdown.Item>
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
          {submitError && <div className="alert alert-danger">Something went wrong. Please try again later.</div>}
          {/* <div>{JSON.stringify(errors)}</div> */}
        </Form>
      )}
    </Formik>
  )
}

export default CreatePostForm
