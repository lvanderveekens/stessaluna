import React, { FC, useCallback, useState } from 'react';
import styles from './AorbEditor.scss?module';
import { Slate, Editable, ReactEditor } from 'slate-react';
import Element from './element/Element';
import Leaf from './leaf/Leaf';
import { Node } from 'slate';
import { AorbInputValue } from '../aorb-input.interface';

interface Props {
  editor: ReactEditor
  value: AorbInputValue,
  onChange: (value: AorbInputValue) => void;
}

const AorbEditor: FC<Props> = ({ editor, value, onChange }) => {

  const renderElement = props => <Element {...props} value={value} onChange={onChange} />;
  const renderLeaf = useCallback(props => { return <Leaf {...props} /> }, []) 

  const [editorValue, setEditorValue] = useState(() => {
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
  });

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

  return (
    <div className={styles.aorbEditor}>
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
  )
}

export default AorbEditor;