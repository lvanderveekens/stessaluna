import React, { FC } from 'react';
import styles from './Avatar.scss?module';
import ReactCountryFlag from "react-country-flag";

interface Props {
  src: string
  countryCode?: string
  size?: 'xs' | 'sm' | 'md'
}

const Avatar: FC<Props> = ({ src, countryCode, size = 'md' }) => {

  let avatarWidth: number, flagWidth: number;
  switch (size) {
    case 'xs':
      avatarWidth = 30;
      flagWidth = 0.7;
      break;
    case 'sm':
      avatarWidth = 40;
      flagWidth = 1.0;
      break;
    case 'md':
      avatarWidth = 50;
      flagWidth = 1.3;
  }

  return (
    <div
      className={styles.avatar}
      style={{ width: avatarWidth, height: avatarWidth }}
    >
      <div className={styles.imageWrapper}>
        <img src={src} />
      </div>
      {countryCode && (
        <ReactCountryFlag
          className={styles.flag}
          style={{ width: flagWidth + 'rem' }}
          countryCode={countryCode}
          svg
        />
      )}
    </div>
  )
}

export default Avatar;