import React, {FC, useState} from "react";
import styles from "./ChannelFilter.scss?module"
import classNames from "classnames/bind"
import Modal from "../../modal/Modal";
import CreatePostForm from "../../post/create-post/create-post-form";
import ISO6391 from "iso-639-1";
import ModalHeader from "../../modal/modal-header/ModalHeader";
import ModalContent from "../../modal/modal-content/ModalContent";
import ModalFooter from "../../modal/modal-footer/ModalFooter";

const cx = classNames.bind(styles)

interface Props {

}

const ChannelFilter: FC<Props> = () => {

  const [channels, setChannels] = useState([])
  const [showModal, setShowModal] = useState(false)


  const handleModalClose = () => {
    setShowModal(false)
  }

  return (
    <div className={styles.channelFilter}>
      <button className={cx({on: channels.length})} onClick={() => setShowModal(true)}>
        {channels.length == 0 && <>Channel</>}
        {channels.length > 0 && channels.join()}
      </button>
      {showModal && (
        <Modal onClose={handleModalClose}>
          <ModalHeader onClose={handleModalClose}>Channel filter</ModalHeader>
          <ModalContent>
            {ISO6391.getLanguages(ISO6391.getAllCodes())
              .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
              .map(({ code, name }) => (
                <div key={code}>
                  <input
                    value={code}
                    name={name}
                    type="checkbox"
                    checked={false}
                    onChange={() => {
                      console.log("CHANGED")
                    }}
                  />
                  {name}
                </div>
              ))}
          </ModalContent>
          <ModalFooter>reset,apply</ModalFooter>
        </Modal>
      )}
    </div>
  )
}

export default ChannelFilter