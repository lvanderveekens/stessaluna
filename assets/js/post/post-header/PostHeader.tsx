import React, {FC} from "react";
import styles from "./PostHeader.scss?module";
import Avatar from "../../user/avatar/Avatar";
import ISO6391 from "iso-639-1";
import {getCountryCode} from "../../country/get-country-code";
import ReactCountryFlag from "react-country-flag"
import User from "../../user/user.interface";
import moment from "moment";


interface Props {
  author: User
  channel: string
  createdAt: string
  edited: boolean
}

const PostHeader: FC<Props> = ({author, channel, createdAt, edited}) => {

  const renderUserName = () => {
    if (author.displayName) {
      return <span className={styles.fullName}>{author.displayName}</span>
    } else {
      return <span style={{marginRight: "0.3rem"}}>@{author.username}</span>
    }
  }

  return (
    <div className={styles.postHeader}>
      <div className={styles.avatar}>
        <Avatar src={author.avatar.url} countryCode={author.country}/>
      </div>
      <div className={styles.userNameTimestampWrapper}>
        <div className={styles.userName}>{renderUserName()}</div>
        <div className={styles.channelWrapper}>
          posted in <span className={styles.channel}>{ISO6391.getName(channel)}</span>&nbsp;
          {getCountryCode(channel) && (
            <ReactCountryFlag className={styles.countryFlag} countryCode={getCountryCode(channel)} svg/>
          )}
        </div>
        <span className={styles.timestamp}>{moment(createdAt).fromNow()} {edited && (<span>(edited)</span>)}</span>
      </div>
    </div>
  )
}

export default PostHeader