import React, {FC} from "react"
import styles from "./Comment.scss?module"
import Avatar from "../../user/avatar/Avatar"
import CommentToolbar from "./comment-toolbar/CommentToolbar";
import moment from "moment";
import Comment from "./comment.interface";
import {State} from "../../store";
import {connect, useSelector} from "react-redux";

interface OwnProps {
  id: number
  onDelete: () => void
}

interface StateProps {
  comment: Comment
}

type Props = OwnProps & StateProps

const Comment: FC<Props> = ({comment, onDelete}) => {

  const {id, userId, createdAt, text, voteIds} = comment
  const author = useSelector((state: State) => state.entities.usersById[userId])

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
        <CommentToolbar id={id} author={author} voteIds={voteIds} onDelete={onDelete}/>
      </div>
    </div>
  )
}

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => ({
  comment: state.entities.commentsById[ownProps.id]
})

export default connect<StateProps, {}, OwnProps>(mapStateToProps, null)(Comment)
