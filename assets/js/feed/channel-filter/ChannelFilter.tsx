import React, {FC, useState} from "react";
import styles from "./ChannelFilter.scss?module"
import classNames from "classnames/bind"
import ISO6391 from "iso-639-1";
import ChannelFilterModal from "./channel-filter-modal/ChannelFilterModal";

const cx = classNames.bind(styles)

interface Props {

}

const ChannelFilter: FC<Props> = () => {

  const [appliedChannels, setAppliedChannels] = useState([])
  const [showModal, setShowModal] = useState(false)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const handleApply = (selectedChannels) => {
    setAppliedChannels(selectedChannels)
    setShowModal(false)
  }

  return (
    <div className={styles.channelFilter}>
      <button className={cx(styles.button, {on: appliedChannels.length})} onClick={openModal}>
        {appliedChannels.length == 0 && <>Channel</>}
        {appliedChannels.length > 0 && appliedChannels.map((c) => ISO6391.getName(c)).join()}
      </button>
      {showModal && (
        <ChannelFilterModal appliedChannels={appliedChannels} onApply={handleApply} onClose={closeModal}/>
      )}
    </div>
  )
}

export default ChannelFilter