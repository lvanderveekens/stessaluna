import React, { FC } from 'react';
import styles from './ImagePreview.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  className?: string
  src: string
  onDelete: () => void;
}

const ImagePreview: FC<Props> = ({className, src, onDelete}) => {

  return (
    <div className={`${styles.imagePreview} ${className}`}>
      <div className={styles.aspectRatioBox}>
        <img src={src} alt="Post image preview"/>
        <div className={styles.imageOverlay}>
          <span className={styles.removeIcon} onClick={onDelete}>
            <FontAwesomeIcon icon={faTimes}/>
          </span>
        </div>
      </div>
    </div>
  )
}

export default ImagePreview;