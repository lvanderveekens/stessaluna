import React, {FC, useEffect, useRef, useState} from 'react'
import Modal from "../../../modal/Modal";
import ModalHeader from "../../../modal/modal-header/ModalHeader";
import ModalContent from "../../../modal/modal-content/ModalContent";
import ISO6391 from "iso-639-1";
import styles from "./ChannelFilterModal.scss?module";
import ModalFooter from "../../../modal/modal-footer/ModalFooter";
import Button from "../../../button/Button";

interface Props {
  appliedChannels: string[]
  onApply: (channels: string[]) => void
  onClose: () => void
}

const ChannelFilterModal: FC<Props> = ({appliedChannels, onApply, onClose}) => {

  const [selectedChannels, setSelectedChannels] = useState(appliedChannels)
  const modalRef = useRef(null)

  useEffect(() => {
    modalRef.current.focus({preventScroll: true})
  }, [])

  const toggleCheckbox = (channel) => () => {
    if (selectedChannels.includes(channel)) {
      setSelectedChannels(selectedChannels.filter(c => c !== channel))
    } else {
      setSelectedChannels([...selectedChannels, channel])
    }
  };

  const handleReset = () => setSelectedChannels([])

  const handleApply = () => onApply(selectedChannels);

  return (
    <Modal ref={modalRef} className={styles.channelFilterModal} onClose={onClose}>
      <ModalHeader onClose={onClose}>Channel filter</ModalHeader>
      <ModalContent className="mb-3">
        {ISO6391.getLanguages(ISO6391.getAllCodes())
          .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
          .map(({ code, name }) => {
            return (
              <div key={code} className={styles.channelCheckboxWrapper}>
                <input
                  type="checkbox"
                  value={code}
                  checked={selectedChannels.includes(code)}
                  onChange={toggleCheckbox(code)}
                />
                {name}
              </div>
            );
          })}
      </ModalContent>
      <ModalFooter className={styles.footer}>
        <Button onClick={handleReset}>Reset</Button>
        <Button onClick={handleApply}>Apply</Button>
      </ModalFooter>
    </Modal>
  )
}

export default ChannelFilterModal