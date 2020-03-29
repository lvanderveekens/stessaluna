import React, { FC, useMemo, useCallback, useState, useEffect } from 'react'
import styles from './AorbInput.scss?module';
import { withReact, Slate, Editable, useFocused, useSelected } from 'slate-react';
import { withHistory } from 'slate-history';
import { createEditor, Transforms } from 'slate';
import { Node } from 'slate';
import { Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import actionTypes from '../../../../store/auth/actionTypes';
import { AorbInputValue } from './aorb-input.interface';
let cx = classNames.bind(styles);

interface Props {
  value: AorbInputValue
  onChange: (value: AorbInputValue) => void
}

const AorbInput: FC<Props> = ({ value, onChange }) => {

  const [aInput, setAInput] = useState('');
  const [bInput, setBInput] = useState('');

  const renderElement = props => <Element {...props} />;

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
    Transforms.insertNodes(editor, aorb);

    // reset form
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

  const handleClickOnA = () => {
    value.choice.correct = 'a';
    onChange(value);
  }

  const handleClickOnB = () => {
    value.choice.correct = 'b';
    onChange(value);
  }

  const AorbElement = ({ attributes, children, element }) => {
    const aClassName = cx('a', {
      'correct': (value.choice && value.choice.correct === 'a'),
      'incorrect': (value.choice && value.choice.correct === 'b')
    });
    const bClassName = cx('b', {
      'correct': (value.choice && value.choice.correct === 'b'),
      'incorrect': (value.choice && value.choice.correct === 'a')
    });

    return (
      <span
        {...attributes}
        className={styles.aOrB}
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

  const createInitialValue = () => {
    if (value.choice) {
      return [{
        children: [
          { text: value.textBefore },
          { type: 'aorb', a: value.choice.a, b: value.choice.b, children: [{ text: '' }] },
          { text: value.textAfter }
        ]
      }] as any
    } else {
      return [{
        children: [{ text: value.textBefore }]
      }] as any
    }
  }

  const [editorValue, setEditorValue] = useState(createInitialValue());

  const handleEditorChange = (change: Node[]) => {
    // only update state on actual change to avoid focus issues when switching between inputs
    if (JSON.stringify(editorValue) !== JSON.stringify(change)) {
      setEditorValue(change);

      const elements = change[0].children;

      let textBefore = "";
      let choice = null;
      let textAfter = null;

      if (elements.length == 1) {
        textBefore = elements[0].text;
      } else if (elements.length === 3) {
        textBefore = elements[0].text;
        choice = { ...value.choice, a: elements[1].a, b: elements[1].b };
        textAfter = elements[2].text;
      }
      const realChange = { textBefore, choice, textAfter };
      onChange(realChange);
    }
  };

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  const Leaf = props => {
    return (
      <span
        {...props.attributes}
        className={styles.leaf}
      >
        {props.children}
      </span>
    )
  }

  return (
    <div className={styles.aorbInput}>
      <div className={styles.editorWrapper}>
        <Slate
          editor={editor}
          value={editorValue}
          onChange={handleEditorChange}
        >
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Type something..."
          />
        </Slate>
      </div>
      <div className={styles.actions}>
        {/* TODO: is this the right place? Maybe lift this logic out of this component. 
        It's not necessarily part of the input. It only helps to fill it. */}
        {!value.choice && (
          <div className={styles.insertAorb}>
            <div className={styles.aInputGroup}>
              <label htmlFor="a">A</label>
              <input
                name="a"
                type="text"
                value={aInput}
                onChange={(e) => setAInput(e.target.value)}
              />
            </div>
            <div className={styles.bInputGroup}>
              <label htmlFor="b">B</label>
              <input
                name="b"
                type="text"
                value={bInput}
                onChange={(e) => setBInput(e.target.value)}
              />
            </div>
            <Button className={`${styles.insertButton} btn btn-dark`} onClick={insertAorb}>Add</Button>
          </div>
        )}
        {value.choice && !value.choice.correct && (
          <span className={styles.markAsCorrectHint}>Click on A or B to mark it as correct.</span>
        )}
      </div>
    </div>
  )

}

export default AorbInput;