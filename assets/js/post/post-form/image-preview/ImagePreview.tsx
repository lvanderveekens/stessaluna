import React, { FC } from 'react';
import styles from './ImagePreview.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  src: string
  onDelete: () => void;
}

const ImagePreview: FC<Props> = ({ src, onDelete }) => {

  return (
    <div className={styles.imagePreview}>
      <img src={src} />
      <div className={styles.imageOverlay}>
        <FontAwesomeIcon className={styles.removeIcon} icon={faTimes} onClick={onDelete} />
      </div>
    </div>
  )
}

export default ImagePreview;