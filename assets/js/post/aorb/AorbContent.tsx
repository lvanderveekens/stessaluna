import React, { FunctionComponent } from 'react';
import { AorbSentence as AorbSentenceInterface } from '../post.interface';

interface Props {
  sentences: AorbSentenceInterface[]
};

const AorbContent: FunctionComponent<Props> = ({ sentences }) => {

  return (
    <div>
      {sentences.map((sentence, index) => (
        <p>{index + 1}: {sentence.textBefore} A:({sentence.choice.a}) B:({sentence.choice.b}) {sentence.textAfter}</p>
      ))}
    </div>
  );
};

export default AorbContent;