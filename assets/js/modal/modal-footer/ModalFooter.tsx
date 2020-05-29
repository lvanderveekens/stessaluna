import React, {FC} from "react";
import styles from './ModalFooter.scss?module';

interface Props {
  children: any
}

const ModalFooter: FC<Props> = ({children}) => {
  return <div className={styles.modalFooter}>{children}</div>
}

export default ModalFooter