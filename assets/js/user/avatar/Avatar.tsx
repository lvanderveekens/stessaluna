import React, { FC } from 'react';
import styles from './Avatar.scss?module';
import ReactCountryFlag from "react-country-flag";

interface Props {
  src: string
  countryCode?: string
  size?: 'small' | 'normal'
}

const Avatar: FC<Props> = ({ src, countryCode, size = 'normal' }) => {

  const avatarWidth = size === 'normal' ? 50 : 40;
  const flagWidth = size === 'normal' ? 1.3 : 1.0;

  return (
    <div
      className={styles.avatar}
      style={{ width: avatarWidth, height: avatarWidth }}
    >
      <div className={styles.imageWrapper}>
        <img src={src} />
      </div>
      <ReactCountryFlag
        className={styles.flag}
        style={{ width: flagWidth + 'rem' }}
        countryCode={countryCode}
        svg
      />
    </div>
  )
}

export default Avatar;