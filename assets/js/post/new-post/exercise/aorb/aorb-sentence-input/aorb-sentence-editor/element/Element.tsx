import React, { FC } from 'react';
import AorbElement from '../aorb-element/AorbElement';
import AorbSentenceInput from '../../aorb-sentence-input.model';

interface Props {
  attributes,
  element,
  children
  value: AorbSentenceInput,
  onChange: (value: AorbSentenceInput) => void
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