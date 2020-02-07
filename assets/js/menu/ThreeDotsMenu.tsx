import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import styles from './ThreeDotsMenu.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
var classNames = require('classnames/dedupe');

interface Props {
  hidden?: boolean
  open: boolean
  setOpen: (open: boolean) => void
};

const ThreeDotsMenu: FunctionComponent<Props> = ({ children, hidden = false, open, setOpen }) => {

  const menuRef = useRef(null)

  const menuIconClass = classNames(styles.menuIcon, { 'invisible': hidden })

  function handleClickOutside(event) {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => { document.removeEventListener("mousedown", handleClickOutside); };
  });

  return (
    <div ref={menuRef} className={menuIconClass} onClick={() => setOpen(!open)}>
      <div className="position-relative">
        <FontAwesomeIcon icon={faEllipsisV} />
        {open && (
          <div className={styles.menuPopup} onClick={() => setOpen(false)}>
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

export default ThreeDotsMenu;