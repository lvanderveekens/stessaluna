import React, { FC, useMemo } from 'react'
import styles from './AorbSentenceInput.scss?module';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { createEditor, Transforms } from 'slate';
import AorbEditor from './aorb-sentence-editor/AorbSentenceEditor';
import AorbChoiceForm from './aorb-choice-form/AorbChoiceForm';
import AorbSentenceInputValue, { AorbChoiceInput } from './aorb-sentence-input.model';

interface Props {
  value: AorbSentenceInputValue
  onChange: (change: AorbSentenceInputValue) => void
}

const AorbSentenceInput: FC<Props> = ({ value, onChange }) => {

  const withAorb = editor => {
    const { isInline, isVoid } = editor;
    editor.isInline = element => { return element.type === 'aorb' ? true : isInline(element); }
    editor.isVoid = element => { return element.type === 'aorb' ? true : isVoid(element) }
    return editor;
  }

  const editor = useMemo(() => withAorb(withReact(withHistory(createEditor()))), []);

  const insertAorb = (choice: AorbChoiceInput) => {
    const aorb = { type: 'aorb', a: choice.a, b: choice.b, children: [{ text: '' }] }
    Transforms.insertNodes(editor, aorb);
  }

  return (
    <div className={styles.aorbInput}>
      <AorbEditor editor={editor} value={value} onChange={onChange} />
      <AorbChoiceForm choice={value.choice} onSubmit={insertAorb} />
    </div>
  )
}

export default AorbSentenceInput;