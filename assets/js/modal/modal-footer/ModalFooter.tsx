import React, {FC} from "react";
import styles from './ModalFooter.scss?module';

interface Props {
  className?: string
  children: any
}

const ModalFooter: FC<Props> = ({className, children}) => {
  return <div className={`${styles.modalFooter} ${className}`}>{children}</div>
}

export default ModalFooter