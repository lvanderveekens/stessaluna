import React, {FC, useState} from "react"
import styles from "./CommentToolbar.scss?module"
import {Dropdown} from "react-bootstrap"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons"
import {ReactComponent as LikeIcon} from "../../../../images/icon/like.svg";
import {ReactComponent as DislikeIcon} from "../../../../images/icon/dislike.svg";
import {connect, useSelector} from "react-redux"
import Vote, {VoteType} from "../../vote/vote.interface";
import User from "../../../user/user.interface";
import LoginSignupModal from "../../../exercise/login-signup-modal/LoginSignupModal";
import {State} from "../../../store";
import CustomToggle from "../../../dropdown/custom-toggle/CustomToggle";
import classNames from "classnames/bind"
import {undoVoteOnComment, updateVoteOnComment, voteOnComment} from "../../vote/state/vote.actions";

const cx = classNames.bind(styles)

interface Props {
  id: number
  author: User
  voteIds: number[]
  onDelete: () => void
  loggedIn: boolean
  user?: User
  voteOnComment: (commentId: number, type: VoteType) => Promise<void>
  updateVoteOnComment: (commentId: number, voteId: number, type: VoteType) => Promise<void>
  undoVoteOnComment: (commentId: number, voteId: number) => Promise<void>
}

const CommentToolbar: FC<Props> = (
  {
    id,
    author,
    voteIds,
    onDelete,
    loggedIn,
    user,
    voteOnComment,
    updateVoteOnComment,
    undoVoteOnComment
  }
) => {

  const [showLoginSignupModal, setShowLoginSignupModal] = useState(false)
  const [loginSignupModalText, setLoginSignupModalText] = useState(null)

  const votes: Vote[] = useSelector((state: State) => voteIds.map(id => state.entities.votesById[id]))
  const existingVote = votes.find((vote) => user && user.id == vote.userId)

  const [submittingVote, setSubmittingVote] = useState(false)

  const handleVoteClick = (type: VoteType) => () => {
    if (!loggedIn) {
      setLoginSignupModalText("Log in or sign up to vote on comments")
      setShowLoginSignupModal(true)
      return
    }

    setSubmittingVote(true)
    vote(type)
      .then(() => setSubmittingVote(false))
  }

  const vote = (type: VoteType): Promise<void> => {
    if (existingVote) {
      if (existingVote.type == type) {
        return undoVoteOnComment(id, existingVote.id)
      } else {
        return updateVoteOnComment(id, existingVote.id, type)
      }
    } else {
      return voteOnComment(id, type)
    }
  }

  return (
    <div className={styles.commentToolbar}>
      <button className={styles.likeIcon} disabled={submittingVote} onClick={handleVoteClick(VoteType.UP)}>
        <LikeIcon className={cx({voted: existingVote && existingVote.type === VoteType.UP})}/>
        {votes.filter((v: Vote) => v.type == VoteType.UP).length}
      </button>
      <button className={styles.dislikeIcon} disabled={submittingVote} onClick={handleVoteClick(VoteType.DOWN)}>
        <DislikeIcon className={cx({voted: existingVote && existingVote.type === VoteType.DOWN})}/>
        {votes.filter((v: Vote) => v.type == VoteType.DOWN).length}
      </button>
      {user && user.id == author.id && (
        <div className={styles.moreIcon}>
          <Dropdown className="h-100">
            <Dropdown.Toggle className="h-100 d-flex align-items-center" as={CustomToggle} id="something">
              <FontAwesomeIcon icon={faEllipsisH}/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={onDelete}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
      {showLoginSignupModal && (
        <LoginSignupModal text={loginSignupModalText} onClose={() => setShowLoginSignupModal(false)}/>
      )}
    </div>
  )
}

const actionCreators = {
  voteOnComment,
  updateVoteOnComment,
  undoVoteOnComment
}

const mapStateToProps = (state: State) => ({
  user: state.auth.userId && state.entities.usersById[state.auth.userId],
  loggedIn: state.auth.loggedIn,
})

export default connect(mapStateToProps, actionCreators)(CommentToolbar)
