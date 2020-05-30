import React, {FC, useState} from "react";
import styles from "./ChannelFilter.scss?module"
import classNames from "classnames/bind"
import ISO6391 from "iso-639-1";
import ChannelFilterModal from "./channel-filter-modal/ChannelFilterModal";
import { connect } from "react-redux"
import {applyChannelFilter} from "../../store/post/actions";
import {State} from "../../store";

const cx = classNames.bind(styles)

interface Props {
  appliedChannels: string[]
  applyChannelFilter: (channels: string[]) => void
}

const ChannelFilter: FC<Props> = ({appliedChannels, applyChannelFilter}) => {

  const [showModal, setShowModal] = useState(false)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const handleApply = (selectedChannels) => {
    applyChannelFilter(selectedChannels)
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

const mapStateToProps = (state: State) => ({
  appliedChannels: state.post.filters.channel
})

const actionCreators = {
  applyChannelFilter,
}

export default connect(mapStateToProps, actionCreators)(ChannelFilter)