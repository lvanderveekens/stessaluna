import React, { FC, useState, ChangeEvent, useRef, useEffect } from "react"
import styles from "./ImageInput.scss?module"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faUpload } from "@fortawesome/free-solid-svg-icons"
import { nextId } from "../../util/id-generator"
import classNames from "classnames/bind"
const cx = classNames.bind(styles)

interface Props {
  className?: string
  value?: File
  onChange: (image?: File) => void
  shape?: "square" | "circle"
  overlayDisabled?: boolean
}

const ImageInput: FC<Props> = ({ className, value, onChange, shape = "square", overlayDisabled = false }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputId] = useState<string>(() => `input${nextId()}`)
  const [src, setSrc] = useState(null)

  useEffect(() => {
    const src = value ? URL.createObjectURL(value) : null
    setSrc(src)
  }, [value])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.files[0])
  }

  const handleDelete = () => {
    inputRef.current.value = null
    onChange(null)
  }

  return (
    <div className={cx(styles.imageInput, className, shape)}>
      {src ? (
        <div className={styles.imagePreview}>
          <img src={src} />
          {!overlayDisabled && (
            <div className={styles.overlay}>
              <FontAwesomeIcon className={styles.deleteIcon} icon={faTimes} onClick={handleDelete} />
            </div>
          )}
        </div>
      ) : (
        <label className={styles.uploadImageWrapper} htmlFor={inputId}>
          <div className={styles.uploadImage}>
            <FontAwesomeIcon icon={faUpload} />
            <div>Upload image</div>
          </div>
        </label>
      )}
      <input
        ref={inputRef}
        id={inputId}
        name="image"
        type="file"
        className="form-control d-none"
        onChange={handleChange}
      />
    </div>
  )
}

export default ImageInput
