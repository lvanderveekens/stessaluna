import {faArrowCircleRight} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {useFormik} from "formik"
import React, {FC} from "react"
import TextareaAutosize from "react-textarea-autosize"
import * as yup from "yup"
import styles from "./NewCommentForm.scss?module"

interface Props {
  onSubmit: (comment: string) => Promise<void>
  avatar: string
}

const NewCommentForm: FC<Props> = ({onSubmit, avatar}) => {
  const handleKeyDown = (isSubmitting: boolean, handleSubmit: () => void) => (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (!isSubmitting) {
        handleSubmit()
      }
    }
  }

  const handleSubmit = (values, {resetForm, setSubmitting}) => {
    onSubmit(values.text)
      .then(() => {
        resetForm()
        setSubmitting(false)
      })
      .catch(() => {
        setSubmitting(false)
      })
  }

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    isInitialValid: false,
    validationSchema: yup.object().shape({text: yup.string().required()}),
    onSubmit: handleSubmit,
  })

  return (
    <form className={styles.newCommentForm} onSubmit={formik.handleSubmit}>
      <div className="d-flex">
        <div className={styles.avatar}>
          <img src={avatar}/>
        </div>
        <div className={styles.inputWrapper}>
          <TextareaAutosize
            className="form-control"
            type="text"
            name="comment"
            value={formik.values.text}
            onChange={formik.handleChange("text")}
            onKeyDown={handleKeyDown(formik.isSubmitting, formik.handleSubmit)}
            placeholder="Add a comment..."
          />
        </div>
        <div className={styles.submit}>
          <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
            <FontAwesomeIcon icon={faArrowCircleRight}/>
          </button>
        </div>
      </div>
    </form>
  )
}

export default NewCommentForm
