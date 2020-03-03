import React, { FC, useMemo, useCallback, useState } from 'react'
import styles from './AorbInput.scss?module';
import { withReact, Slate, Editable, useFocused, useSelected } from 'slate-react';
import { withHistory } from 'slate-history';
import { createEditor, Transforms } from 'slate';
import { Node } from 'slate';
import { Button } from 'react-bootstrap';

interface Props {
  index: number
}

const AorbInput: FC<Props> = ({ index }) => {

  const [showInsertButton, setShowInsertButton] = useState(true);

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

  const handleChange = (value: Node[]) => {
    setValue(value);

    const aorbExists = value[0].children.some(child => child.type === 'aorb')
    setShowInsertButton(!aorbExists)
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
    <div>
      <div className={styles.inputSentence}>
        {/* TODO: move index to parent? */}
        <div className={styles.inputIndex}>{index}.</div>
        <div className={styles.inputWrapper}>
          <Slate
            editor={editor}
            value={value}
            onChange={handleChange}
          >
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="Enter some text..."
            />
          </Slate>
        </div>
      </div>
      <div className={styles.actions}>
        {showInsertButton && (
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
            <Button className={styles.insertButton} onClick={insertAorb}>Insert</Button>
          </div>
        )}
      </div>
    </div>
  )

}

export default AorbInput;