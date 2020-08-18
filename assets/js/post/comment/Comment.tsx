import React, {FunctionComponent} from "react"
import styles from "./Comment.scss?module"
import User from "../../user/user.interface"
import {Dropdown} from "react-bootstrap"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons"
import CustomToggle from "../../dropdown/custom-toggle/CustomToggle"
import Avatar from "../../user/avatar/Avatar"
import Vote, {VoteType} from "../vote/vote.interface";

interface Props {
  author: User
  timestamp: string
  text: string
  user?: User
  votes: Vote[]
  onDelete: () => void
}

const Comment: FunctionComponent<Props> = ({author, timestamp, text, user, votes, onDelete}) => {
  return (
    <div className={styles.comment}>
      <div className={styles.avatarWrapper}>
        <Avatar src={author.avatar.url} countryCode={author.country} size="sm"/>
      </div>
      <div>
        <div className={styles.header}>
          <span className={styles.userName}>
            {author.displayName ? author.displayName : <>@{author.username}</>}
          </span>
          <span className={styles.timestamp}>{timestamp}</span>
        </div>
        <div className={styles.text}>
          {text}
        </div>
        <div className={styles.icons}>
          <div className={styles.likeIcon}>
            <svg viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.54618 5.65984C3.54618 5.65984 5.93762 5.65216 5.93762 1.9707C5.93762 -1.2912 10.421 1.66617 9.18322 4.42052C15.2387 4.42052 11.7368 11.9234 8.64228 11.9234H3.54618M3.54618 5.65984V11.9234M3.54618 5.65984V4.99187H0.5V8.76531V12.5388L3.54618 12.5387V11.9234" stroke="#838383"/>
            </svg>
            {votes.filter((v: Vote) => v.type == VoteType.UP).length}
          </div>
          <div className={styles.dislikeIcon}>
            <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.95382 7.87891C9.95382 7.87891 7.56238 7.88659 7.56238 11.5681C7.56238 14.83 3.07896 11.8726 4.31678 9.11823C-1.73867 9.11823 1.76315 1.61531 4.85772 1.61531L9.95382 1.61531M9.95382 7.87891L9.95382 1.61531M9.95382 7.87891V8.54688H13L13 4.77344V1.00001L9.95382 1.00003V1.61531" stroke="#838383"/>
            </svg>
            {votes.filter((v: Vote) => v.type == VoteType.DOWN).length}
          </div>
          {user && user.id == author.id && (
            <div className={styles.moreIcon}>
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="something">
                  <FontAwesomeIcon icon={faEllipsisH}/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={onDelete}>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Comment
