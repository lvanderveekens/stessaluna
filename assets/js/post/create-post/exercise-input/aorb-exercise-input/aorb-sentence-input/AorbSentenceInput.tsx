import React, {FC, useMemo} from 'react'
import styles from './AorbSentenceInput.scss?module';
import {withReact} from 'slate-react';
import {withHistory} from 'slate-history';
import {createEditor, Transforms} from 'slate';
import AorbEditor from './aorb-sentence-editor/AorbSentenceEditor';
import AorbChoiceForm from './aorb-choice-form/AorbChoiceForm';
import AorbSentenceInputValue, {AorbChoiceInput} from './aorb-sentence-input.model';
import TextareaAutosize from "react-autosize-textarea";
import {faLightbulb} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classNames from 'classnames/bind';
let cx = classNames.bind(styles);

interface Props {
  value: AorbSentenceInputValue
  onChange: (change: AorbSentenceInputValue) => void
}

const AorbSentenceInput: FC<Props> = ({value, onChange}) => {

  const withAorb = editor => {
    const {isInline, isVoid} = editor;
    editor.isInline = element => {
      return element.type === 'aorb' ? true : isInline(element);
    }
    editor.isVoid = element => {
      return element.type === 'aorb' ? true : isVoid(element)
    }
    return editor;
  }

  const editor = useMemo(() => withAorb(withReact(withHistory(createEditor()))), []);

  const insertAorb = (choice: AorbChoiceInput) => {
    const aorb = {type: 'aorb', a: choice.a, b: choice.b, children: [{text: ''}]}
    Transforms.insertNodes(editor, aorb);
  }

  const aInputGroupClassName = cx(styles.aInputGroup, {
    'correct': (value.choice && value.choice.correct === 'a'),
  });
  const bInputGroupClassName = cx(styles.bInputGroup, {
    'correct': (value.choice && value.choice.correct === 'b'),
  });

  return (
    <div className={styles.aorbSentenceInput}>
      <TextareaAutosize
        className={styles.textBefore}
        value={value.textBefore}
        placeholder="Before"
        onChange={(e) => onChange({...value, textBefore: e.currentTarget.value})}
      />
      <div className={styles.choice}>
        <div className={aInputGroupClassName}>
          <label
            htmlFor="a"
            onClick={() => onChange({...value, choice: {...value.choice, correct: 'a'}})}
          >
            A
          </label>
          <input
            name="a"
            type="text"
            value={value.choice && value.choice.a || ""}
            onChange={(e) => onChange({...value, choice: {...value.choice, a: e.currentTarget.value}})}
          />
        </div>
        <div className={bInputGroupClassName}>
          <label
            htmlFor="b"
            onClick={() => onChange({...value, choice: {...value.choice, correct: 'b'}})}
          >
            B
          </label>
          <input
            name="b"
            type="text"
            value={value.choice && value.choice.b || ""}
            onChange={(e) => onChange({...value, choice: {...value.choice, b: e.currentTarget.value}})}
          />
        </div>
      </div>
      <TextareaAutosize
        className={styles.textAfter}
        value={value.textAfter}
        placeholder="After"
        onChange={(e) => onChange({...value, textAfter: e.currentTarget.value})}
      />
      {value.choice && value.choice.a && value.choice.b && !value.choice.correct && (
        <div className={styles.markAsCorrectHint}>
          <FontAwesomeIcon icon={faLightbulb}/> Click on A or B to mark it as correct.
        </div>
      )}
    </div>
  )
}

export default AorbSentenceInput;