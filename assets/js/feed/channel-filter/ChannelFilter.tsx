import React, {FC, useState} from "react";
import styles from "./ChannelFilter.scss?module"
import classNames from "classnames/bind"
import Modal from "../../modal/Modal";
import CreatePostForm from "../../post/create-post/create-post-form";
import ISO6391 from "iso-639-1";
import ModalHeader from "../../modal/modal-header/ModalHeader";
import ModalContent from "../../modal/modal-content/ModalContent";
import ModalFooter from "../../modal/modal-footer/ModalFooter";
import Button from "../../button/Button";

const cx = classNames.bind(styles)

interface Props {

}

const ChannelFilter: FC<Props> = () => {

  const [channels, setChannels] = useState([])
  const [showModal, setShowModal] = useState(false)



  const handleModalClose = () => {
    setShowModal(false)
  }

  const toggleCheckbox = (channel) => () => {
    if (channels.includes(channel)) {
      setChannels(channels.filter(c => c !== channel))
    } else {
      setChannels([...channels, channel])
    }
  };

  return (
    <div className={styles.channelFilter}>
      <button className={cx(styles.button, {on: channels.length})} onClick={() => setShowModal(true)}>
        {channels.length == 0 && <>Channel</>}
        {channels.length > 0 && channels.map((c) => ISO6391.getName(c)).join()}
      </button>
      {showModal && (
        <Modal onClose={handleModalClose}>
          <ModalHeader onClose={handleModalClose}>Channel filter</ModalHeader>
          <ModalContent className="mb-3">
            {ISO6391.getLanguages(ISO6391.getAllCodes())
              .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
              .map(({ code, name }) => {
                return (
                  <div key={code} className={styles.channelCheckboxWrapper}>
                    <input
                      type="checkbox"
                      value={code}
                      checked={channels.includes(code)}
                      onChange={toggleCheckbox(code)}
                    />
                    {name}
                  </div>
                );
              })}
          </ModalContent>
          <ModalFooter className={styles.footer}>
            <Button>Reset</Button>
            <Button>Apply</Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  )
}

export default ChannelFilter