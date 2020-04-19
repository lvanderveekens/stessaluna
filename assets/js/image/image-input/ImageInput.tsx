import React, { FC, useState, ChangeEvent, useRef, useEffect } from 'react';
import styles from './ImageInput.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';
import { nextId } from '../../util/id-generator';

interface Props {
  value?: File
  onChange: (image?: File) => void
  overlayDisabled?: boolean
}

const ImageInput: FC<Props> = ({ value, onChange, overlayDisabled = false }) => {

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputId] = useState<string>(() => `input${nextId()}`);
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const src = value ? URL.createObjectURL(value) : null
    setSrc(src);
  }, [value])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.files[0]);
  }

  const handleDelete = () => {
    inputRef.current.value = null;
    onChange(null);
  }

  return (
    <div>
      <div className={styles.imageInput}>
        <div className={styles.aspectRatioBox}>
          {src
            ? (
              <>
                <img src={src} />
                {!overlayDisabled && (
                  <div className={styles.overlay}>
                    <FontAwesomeIcon className={styles.deleteIcon} icon={faTimes} onClick={handleDelete} />
                  </div>
                )}
              </>
            ) : (
              <label className={styles.uploadIconWrapper} htmlFor={inputId}>
                <FontAwesomeIcon className={styles.uploadIcon} icon={faUpload} />
              </label>
            )}
        </div>
      </div>
      <input
        ref={inputRef}
        id={inputId}
        name="image"
        type="file"
        className="form-control d-none"
        onChange={handleChange}
      />
    </div>
  );
}

export default ImageInput;