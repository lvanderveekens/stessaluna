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
    const aOrBInput = renderToString(
      <span className={styles.aOrB} contentEditable={false} onClick={() => console.log("CLICKED")}>
        <span className={styles.a}>
          <span className={styles.aLabel}>A</span>
          <span className={styles.aContent} contentEditable={true} />
        </span>
        <span className={styles.b}>
          <span className={styles.bLabel}>B</span>
          <span className={styles.bContent} contentEditable={true} />
        </span>
      </span>
    )
    setHtml(html.slice(0, sel.anchorOffset) + aOrBInput + html.slice(sel.anchorOffset));
    setChoiceInserted(true);
  };

  const contentEditableRef = useRef(null);
  const [html, setHtml] = useState('');

  const [choiceInserted, setChoiceInserted] = useState(false);

  const handleChange = e => {
    const newHtml = e.target.value.replace(/&nbsp;/, ' ')
    console.log("HANDLING CHANGE");
    console.log(newHtml);
    setHtml(newHtml);
  };

  const handleKeyDown = e => {


    // TODO: On delete, we need to update the html state too?

    if (e.key == "Backspace") {
      var selection = document.getSelection();

      if (selection.rangeCount) {
        var selRange = selection.getRangeAt(0);
        console.log(selRange);
        if (selection.anchorNode.nodeName === "#text") {
          var textNode = (selection.anchorNode as Text);
          var previousSibling = textNode.previousElementSibling as HTMLElement;

          if (selRange.startOffset === 0 && previousSibling && previousSibling.contentEditable === "false") {
              e.preventDefault();
              console.log('DELETE NOW: after A or B');
              previousSibling.remove();
          }
        } else if (selection.anchorNode.nodeName === "DIV") {
          var divNode = (selection.anchorNode as HTMLDivElement)
          if (divNode.className === 'myWrapper') {
            if (selRange.startOffset > 0) {
              var lastChild = (divNode.lastElementChild as HTMLElement);
              if (lastChild && lastChild.contentEditable === 'false') {
                e.preventDefault();
                console.log('DELETE NOW: end of input');
                lastChild.remove();
              }
            }
          }
        }
      }
    } else if (e.key == "Delete") {

      var selection = document.getSelection();
      console.log(selection);
      console.log(selection.anchorNode);

      if (selection.rangeCount) {
        var selRange = selection.getRangeAt(0);

        if (selection.anchorNode.nodeName === "#text") {
          var textNode = (selection.anchorNode as Text);
          var nextSibling = (selection.anchorNode.nextSibling as HTMLElement);
          if (selRange.startOffset === textNode.length && nextSibling.contentEditable === "false") {
            e.preventDefault();
            console.log("DELETE NOW: before A and B");
            nextSibling.remove();
          }
        } else if (selection.anchorNode.nodeName === "DIV") {
          var divNode = (selection.anchorNode as HTMLDivElement)
          if (divNode.className === 'myWrapper') {

            if (selRange.startOffset === 0) {

              var firstChild = (selection.anchorNode.firstChild as HTMLElement);
              if (firstChild && firstChild.contentEditable === 'false') {
                e.preventDefault();
                console.log('DELETE NOW: beginning of input');
                firstChild.remove();
              }
            }
          }
        }
      }
    }
        // console.log(previous);
        // var previousPrevious = previous.previousSibling;
        // console.log(previousPrevious);

        // .parentNode.removeChild(selection.anchorNode.previousSibling)
      // }
  }

  const renderInputSentences = () => {
    let sentences = []
    for (let i = 0; i < textInputCount; i++) {
      sentences.push(
        <div key={i}>
          <div className={styles.inputSentence}>
            <div className={styles.inputIndex}>{i + 1}.</div>
            <div className={styles.inputWrapper}>
              <ContentEditable
                className="myWrapper"
                innerRef={contentEditableRef}
                html={html} // innerHTML of the editable div
                onChange={handleChange} // handle innerHTML change
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <div className={styles.actions}>
            <Button onClick={insertChoice} >A or B</Button>
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