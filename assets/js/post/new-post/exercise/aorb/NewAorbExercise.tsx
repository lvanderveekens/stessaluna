import React, { FC, useMemo, useCallback, useRef, useEffect, useState } from 'react'
import styles from './NewAorbExercise.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import ContentEditable from 'react-contenteditable';
import { renderToString } from 'react-dom/server';
import { Editor, Transforms, Range, createEditor } from 'slate';
import { withHistory } from 'slate-history';
import {
  Slate,
  Editable,
  ReactEditor,
  withReact,
  useSelected,
  useFocused,
} from 'slate-react';

interface Props {
  onClose: () => void
}

const NewAorbExercise: FC<Props> = ({ onClose }) => {

  const [textInputCount, setTextInputCount] = useState(1);
  const [showChoice, setShowChoice] = useState(false);

  const [aInput, setAInput] = useState('');
  const [bInput, setBInput] = useState('');

  const renderElement = useCallback(props => <Element {...props} />, [])

  const withAorb = editor => {
    const { isInline, isVoid } = editor;
  
    editor.isInline = element => {
      return element.type === 'aorb' ? true : isInline(element);
    }
  
    editor.isVoid = element => {
      return element.type === 'aorb' ? true : isVoid(element)
    }
  
    return editor;
  }

  const editor = useMemo(
    () => withAorb(withReact(withHistory(createEditor()))),
    []
  )

  const insertAorb = (e) => {
    const aorb = { type: 'aorb', a: aInput, b: bInput, children: [{ text: '' }] }
    Transforms.insertNodes(editor, aorb)
    Transforms.move(editor)
    // TODO: form reset instead of?
    setAInput('');
    setBInput('');
  }
  
  const Element = props => {
    const { attributes, children, element } = props
    switch (element.type) {
      case 'aorb':
        return <AorbElement {...props} />
      default:
        return <div {...attributes}>{children}</div>
    }
  }

  const AorbElement = ({ attributes, children, element }) => {
    const selected = useSelected()
    const focused = useFocused()
    return (
      <span
        {...attributes}
        className={styles.aOrB}
        contentEditable={false}
        onClick={() => console.log("CLICKED")}
      >
        <span className={styles.a}>
          <span className={styles.aLabel}>A</span>
          <span className={styles.aContent}>{element.a}</span>
        </span>
        <span className={styles.b}>
          <span className={styles.bLabel}>B</span>
          <span className={styles.bContent}>{element.b}</span>
        </span>
        {children}
      </span>
    )
  }

  const initialValue = [
    {
      children: [{ text: '' }]
    },
  ] as any;

  const [value, setValue] = useState(initialValue)

  const renderInputSentences = () => {
    let sentences = []
    for (let i = 0; i < textInputCount; i++) {
      sentences.push(
        <div key={i}>
          <div className={styles.inputSentence}>
            <div className={styles.inputIndex}>{i + 1}.</div>
            <div className={styles.inputWrapper}>
              <Slate
                editor={editor}
                value={value}
                onChange={value => { setValue(value) }}
              >
                <Editable
                  renderElement={renderElement}
                  // onKeyDown={onKeyDown}
                  placeholder="Enter some text..."
                />
              </Slate>
            </div>
          </div>
          <div className={styles.actions}>
            <div className={styles.insertAorb}>
              <div>
                <label htmlFor="a">A)</label>
                <input
                  name="a"
                  type="text"
                  value={aInput}
                  onChange={(e) => setAInput(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="b">B)</label>
                <input
                  name="b"
                  type="text"
                  value={bInput}
                  onChange={(e) => setBInput(e.target.value)}
                />
              </div>
              <Button onClick={insertAorb}>Insert</Button>
            </div>
          </div>
        </div>
      )
    }
    return sentences;
  };

  return (
    <div className={styles.newAorbExercise}>
      <div className={styles.header}>
        <span>A or B</span>
        <FontAwesomeIcon className={styles.closeButton} icon={faTimes} onClick={onClose} />
      </div>
      <div className={styles.sentences}>
        {renderInputSentences()}
      </div>
      <div className={styles.addSentence}>
        <span className={styles.addIcon} onClick={() => setTextInputCount(textInputCount + 1)}>
          <FontAwesomeIcon icon={faPlus} />
        </span>
      </div>
    </div>
  );
};

export default NewAorbExercise;