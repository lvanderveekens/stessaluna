import React, { FC, useMemo, useCallback, useState, useEffect } from 'react'
import styles from './AorbInput.scss?module';
import { withReact, Slate, Editable, useFocused, useSelected } from 'slate-react';
import { withHistory } from 'slate-history';
import { createEditor, Transforms } from 'slate';
import { Node } from 'slate';
import { Button } from 'react-bootstrap';

export interface AorbInputValue {
  textBefore: string
  choice?: { a: string, b: string } 
  textAfter?: string 
}

interface Props {
  value: AorbInputValue
  onChange: (value: AorbInputValue) => void
}

const AorbInput: FC<Props> = ({ value, onChange }) => {
  useEffect(() => {
    console.log("VALUE CHANGE");
  }, [value])

  useEffect(() => {
    console.log("VALUE CHANGE");
  }, [value])

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

  const AorbElement = ({ attributes, children, element }) => {
    return (
      <span
        {...attributes}
        className={styles.aOrB}
        contentEditable={false}
        onClick={() => console.log("CLICKED")}
      >
        <span className={styles.a}>
          <span className={styles.aLabel}>A)</span>
          <span className={styles.aContent}>{element.a}</span>
        </span>
        <span className={styles.b}>
          <span className={styles.bLabel}>B)</span>
          <span className={styles.bContent}>{element.b}</span>
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

  const handleChange = (change: Node[]) => {
    setEditorValue(change);

    const elements = change[0].children;

    let textBefore = "";
    let choice = null;
    let textAfter = null;

    if (elements.length == 1) {
      textBefore = elements[0].text;
    } else if (elements.length === 3) {
      textBefore = elements[0].text;
      choice = { a: elements[1].a, b: elements[1].b };
      textAfter = elements[2].text;
    }
    const realChange = { textBefore, choice, textAfter };

    if (JSON.stringify(value) !== JSON.stringify(realChange)) {
      console.log("DIFFERENT!");
      console.log(value);
      console.log(realChange);
      onChange(realChange);
    }


    // const aorbExists = value[0].children.some(child => child.type === 'aorb')
    // setShowInsertButton(!aorbExists)
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
          onChange={handleChange}
        >
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Type something..."
          />
        </Slate>
      </div>
      <div className={styles.actions}>
        {!value.choice && (
          <div className={styles.insertAorb}>
            <div className={styles.aInputGroup}>
              <label htmlFor="a">A)</label>
              <input
                name="a"
                type="text"
                value={aInput}
                onChange={(e) => setAInput(e.target.value)}
              />
            </div>
            <div className={styles.bInputGroup}>
              <label htmlFor="b">B)</label>
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
      </div>
    </div>
  )

}

export default AorbInput;