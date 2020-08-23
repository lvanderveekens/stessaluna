import React, {FC} from "react"
import styles from "./Comment.scss?module"
import User from "../../user/user.interface"
import Avatar from "../../user/avatar/Avatar"
import Vote from "../vote/vote.interface";
import CommentToolbar from "./comment-toolbar/CommentToolbar";
import moment from "moment";

interface Props {
  id: number
  author: User
  createdAt: string
  text: string
  votes: Vote[]
  onDelete: () => void
}

const Comment: FC<Props> = (
  {
    id,
    author,
    createdAt,
    text,
    votes,
    onDelete,
  }
) => {

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
          <span className={styles.timestamp}>{moment(createdAt).fromNow()}</span>
        </div>
        <div className={styles.text}>
          {text}
        </div>
        <CommentToolbar id={id} author={author} votes={votes} onDelete={onDelete}/>
      </div>
    </div>
  )
}

export default Comment
