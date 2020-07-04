import React, {ChangeEvent, FC, useRef, useState} from "react"
import styles from "./ImageInput.scss?module"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTimes, faUpload} from "@fortawesome/free-solid-svg-icons"
import {nextId} from "../../util/id-generator"
import classNames from "classnames/bind"
import Image from "../image.interface";

const cx = classNames.bind(styles)

interface Props {
  className?: string
  value?: Image
  onChange: (image?: Image) => void
  shape?: "square" | "circle"
  overlayDisabled?: boolean
  label?: string
}

const ImageInput: FC<Props> = (
  {
    className,
    value,
    onChange,
    shape = "square",
    overlayDisabled = false,
    label = "Upload image"
  }
) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputId] = useState<string>(() => `input${nextId()}`)
  // const [src, setSrc] = useState(null)

  // useEffect(() => {
  //   const src = value ? URL.createObjectURL(value) : null
  //   setSrc(src)
  // }, [value])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // onChange(event.currentTarget.files[0])
    // TODO
  }

  const handleDelete = () => {
    // inputRef.current.value = null
    // onChange(null)
    // TODO
  }

  return (
    <div className={cx(styles.imageInput, className, shape)}>
      {value ? (
        <div className={styles.imagePreview}>
          <img src={value.url} />
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
            <div>{label}</div>
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
