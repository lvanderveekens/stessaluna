import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useFormik } from "formik"
import PropTypes from "prop-types"
import React, { FunctionComponent } from "react"
import TextareaAutosize from "react-textarea-autosize"
import * as yup from "yup"
import styles from "./NewCommentForm.scss?module"

interface Props {
  onSubmit: (comment: string) => Promise<void>
  avatar: string
}

const NewCommentForm: FunctionComponent<Props> = ({ onSubmit, avatar }) => {
  const handleKeyDown = (submit: () => void) => (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      submit()
    }
  }

  const handleSubmit = async (values, { resetForm }) => {
    await onSubmit(values.text)
    resetForm()
  }

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    isInitialValid: false,
    validationSchema: yup.object().shape({ text: yup.string().required() }),
    onSubmit: handleSubmit,
  })

  return (
    <form className={styles.newCommentForm} onSubmit={formik.handleSubmit}>
      <div className="d-flex">
        <div className={styles.avatar}>
          <img src={avatar} />
        </div>
        <div className={styles.inputWrapper}>
          <TextareaAutosize
            className="form-control"
            type="text"
            name="comment"
            value={formik.values.text}
            onChange={formik.handleChange("text")}
            onKeyDown={handleKeyDown(formik.handleSubmit)}
            placeholder="Write a comment..."
          />
        </div>
        <div className={styles.submit}>
          <button type="submit" disabled={!formik.isValid}>
            <FontAwesomeIcon icon={faArrowCircleRight} />
          </button>
        </div>
      </div>
    </form>
  )
}

NewCommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default NewCommentForm