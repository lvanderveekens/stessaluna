import React, { FC } from 'react';
import styles from './AorbElement.scss?module';
import { AorbInputValue } from '../../aorb-input.interface';
import classNames from 'classnames/bind';
let cx = classNames.bind(styles);

interface Props {
  attributes,
  children,
  element,
  value: AorbInputValue,
  onChange: (value: AorbInputValue) => void
}

const AorbElement: FC<Props> = ({ attributes, children, element, value, onChange }) => {

  const aClassName = cx('a', {
    'correct': (value.choice && value.choice.correct === 'a'),
    'incorrect': (value.choice && value.choice.correct === 'b')
  });
  const bClassName = cx('b', {
    'correct': (value.choice && value.choice.correct === 'b'),
    'incorrect': (value.choice && value.choice.correct === 'a')
  });

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