import React, {FC} from 'react';
import styles from './ImagePreview.scss?module';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import classNames from "classnames/bind"
const cx = classNames.bind(styles)

interface Props {
  className?: string
  src: string
  overlayEnabled?: boolean
  onDelete?: () => void
}

const ImagePreview: FC<Props> = ({className, src, overlayEnabled = true, onDelete}) => {

  return (
    <div className={cx(styles.imagePreview, className, {overlayEnabled})}>
      <img src={src} alt="Image preview"/>
      {overlayEnabled && (
        <div className={styles.imageOverlay}>
          <span className={styles.removeIcon} onClick={onDelete}>
            <FontAwesomeIcon icon={faTimes}/>
          </span>
        </div>
      )}
    </div>
  )
}

export default ImagePreview;