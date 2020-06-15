import React, { FC } from 'react';
import styles from './AorbElement.scss?module';

interface Props {
  attributes,
  children,
  element,
  value: AorbSentenceInput,
  onChange: (value: AorbSentenceInput) => void
}

const AorbElement: FC<Props> = ({ attributes, children, element, value, onChange }) => {

  const handleClickOnA = () => {
    value.choice.correct = 'a';
    onChange(value);
  }

  const handleClickOnB = () => {
    value.choice.correct = 'b';
    onChange(value);
  }

  return (
    <span
      {...attributes}
      className={styles.aorbElement}
      contentEditable={false}
    >
      <span className={aClassName} onClick={handleClickOnA}>
        <span className={styles.label}>A</span>
        <span className={styles.content}>{element.a}</span>
      </span>
      <span className={bClassName} onClick={handleClickOnB}>
        <span className={styles.label}>B</span>
        <span className={styles.content}>{element.b}</span>
      </span>
      {children}
    </span>
  )
}

export default AorbElement;