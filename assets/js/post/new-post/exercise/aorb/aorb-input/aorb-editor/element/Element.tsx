import React, { FC } from 'react';
import AorbElement from '../aorb-element/AorbElement';
import { AorbInputValue } from '../../aorb-input.interface';

interface Props {
  attributes,
  element,
  children
  value: AorbInputValue,
  onChange: (value: AorbInputValue) => void
}

const Element: FC<Props> = (props) => {
  const { attributes, element, children } = props
  switch (element.type) {
    case 'aorb':
      return <AorbElement {...props} />
    default:
      return <div {...attributes}>{children}</div>
  }
}

export default Element;