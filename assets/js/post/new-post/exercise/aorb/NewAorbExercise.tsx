import React, { FC, useState, useRef, Fragment } from 'react';
import styles from './NewAorbExercise.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import AutosizeInput from 'react-input-autosize';
import { text } from '@fortawesome/fontawesome-svg-core';
import { Button } from 'react-bootstrap';
import TextareaAutosize from 'react-textarea-autosize';

interface Props {
  onClose: () => void
}

const NewAorbExercise: FC<Props> = ({ onClose }) => {

  const [textInputCount, setTextInputCount] = useState(1);
  const [showChoice, setShowChoice] = useState(false);

  const [singleSpanValue, setSingleSpanValue] = useState('');
  const [twoSpansValue1, setTwoSpansValue1] = useState('');
  const [twoSpansValue2, setTwoSpansValue2] = useState('');

  const myRef = useRef(null);
  const twoSpansLeftRef = useRef(null);
  const twoSpansRightRef = useRef(null);

  const [a, setA] = useState('');
  const [b, setB] = useState('');

  const insertChoice = () => {
    const text = myRef.current.textContent;
    const sel = window.getSelection();

    setTwoSpansValue1(text.slice(0, sel.anchorOffset));
    setTwoSpansValue2(text.slice(sel.anchorOffset));
    setShowChoice(true);
  };

  const handleDeleteChoice = () => {
    const combinedText = twoSpansLeftRef.current.textContent + twoSpansRightRef.current.textContent;
    setSingleSpanValue(combinedText)
    setShowChoice(false);
  }

  const renderInputSentences = () => {
    let sentences = []
    for (let i = 0; i < textInputCount; i++) {
      sentences.push(
        <div key={i}>
          <div className={styles.inputSentence}>
            <div className={styles.inputIndex}>{i + 1}.</div>
            <div className={styles.inputWrapper}>
              {showChoice
                ? (
                  <>
                    <span ref={twoSpansLeftRef} contentEditable suppressContentEditableWarning>{twoSpansValue1}</span>
                    <span className={styles.aOrB}>
                      <span className={styles.a}>A)<span contentEditable /></span>  
                      <span className={styles.b}>B)<span contentEditable /></span>  
                    </span>
                    <span ref={twoSpansRightRef} contentEditable suppressContentEditableWarning>{twoSpansValue2}</span>
                  </>
                )
                : (
                  <span ref={myRef} className={styles.singleSpan} contentEditable suppressContentEditableWarning>{singleSpanValue}</span> 
                )}
            </div>

          </div>
          <div className={styles.actions}>
            <Button onClick={insertChoice} disabled={showChoice}>A or B</Button>
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