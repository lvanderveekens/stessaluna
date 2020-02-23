import React, { FC, useState, useRef } from 'react';
import styles from './NewAorbExercise.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import ContentEditable from 'react-contenteditable'
import { renderToString } from 'react-dom/server'

interface Props {
  onClose: () => void
}

const NewAorbExercise: FC<Props> = ({ onClose }) => {

  const [textInputCount, setTextInputCount] = useState(1);
  const [showChoice, setShowChoice] = useState(false);

  const insertChoice = () => {
    const sel = window.getSelection();
    // const range = sel.getRangeAt(0);
    const aOrBInput = renderToString(
      <span className={styles.aOrB} contentEditable={false}>
        <span className={styles.a}>
          <span className={styles.aLabel} >A</span>
          <span className={styles.aContent} contentEditable />
        </span>
        <span className={styles.b}>
          <span className={styles.bLabel}>B</span>
          <span className={styles.bContent} contentEditable />
        </span>
      </span>
    )
    setHtml(html.slice(0, sel.anchorOffset) + aOrBInput + html.slice(sel.anchorOffset));
  };

  const contentEditableRef = useRef(null);
  const [html, setHtml] = useState('');
  const handleChange = e => {
    setHtml(e.target.value.replace(/&nbsp;/, ' '));
  };

  const renderInputSentences = () => {
    let sentences = []
    for (let i = 0; i < textInputCount; i++) {
      sentences.push(
        <div key={i}>
          <div className={styles.inputSentence}>
            <div className={styles.inputIndex}>{i + 1}.</div>
            <div className={styles.inputWrapper}>
              <ContentEditable
                innerRef={contentEditableRef}
                html={html} // innerHTML of the editable div
                onChange={handleChange} // handle innerHTML change
              />
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