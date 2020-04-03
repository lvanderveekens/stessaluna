import React from 'react';
import styles from './Leaf.scss?module'

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

export default Leaf;