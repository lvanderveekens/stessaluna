import React, { FC, useMemo } from 'react'
import styles from './AorbInput.scss?module';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { createEditor, Transforms } from 'slate';
import { AorbInputValue } from './aorb-input.interface';
import AorbEditor from './aorb-editor/AorbEditor';
import AorbForm from './aorb-form/AorbForm';

interface Props {
  value: AorbInputValue
  onChange: (value: AorbInputValue) => void
}

const AorbInput: FC<Props> = ({ value, onChange }) => {

  const withAorb = editor => {
    const { isInline, isVoid } = editor;
    editor.isInline = element => { return element.type === 'aorb' ? true : isInline(element); }
    editor.isVoid = element => { return element.type === 'aorb' ? true : isVoid(element) }
    return editor;
  }

  const editor = useMemo(() => withAorb(withReact(withHistory(createEditor()))), []);

  const insertAorb = (a: string, b: string) => {
    const aorb = { type: 'aorb', a: a, b: b, children: [{ text: '' }] }
    Transforms.insertNodes(editor, aorb);
  }

  return (
    <div className={styles.aorbInput}>
      <AorbEditor editor={editor} value={value} onChange={onChange} />
      <AorbForm choice={value.choice} onSubmit={insertAorb} />
    </div>
  )
}

export default AorbInput;