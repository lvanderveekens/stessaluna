import React, {FunctionComponent, useEffect} from "react"
import {connect} from "react-redux"
import {deletePost, fetchPosts} from "../store/post/actions"
import PostInterface from "../post/post.interface"
import {State} from "../store"
import styles from './Feed.scss?module'
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import FeedPlaceholder from "./placeholder/FeedPlaceholder";
import moment from "moment";
import Post from "../post/Post";


interface Props {
  loading: boolean
  posts: PostInterface[]
  fetchPosts: () => void
  deletePost: (id: number) => void
}

const Feed: FunctionComponent<Props> = ({loading, posts, fetchPosts, deletePost}) => {
  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className={styles.feed}>

      {loading && <FeedPlaceholder />}

      {!loading && (
        <TransitionGroup component={null}>
          {posts
            .sort((post, other) => other.id - post.id)
            .map((post) => (
              <CSSTransition key={post.id} in={true} appear={true} timeout={1000} classNames="fade">
                <Post
                  id={post.id}
                  timestamp={moment(post.createdAt).fromNow()}
                  author={post.author}
                  channel={post.channel}
                  text={post.text}
                  image={post.image}
                  exercise={post.exercise}
                  onDelete={() => deletePost(post.id)}
                  comments={post.comments}
                />
              </CSSTransition>
            ))
          }
        </TransitionGroup>
      )}
    </div>
  )
}

const mapStateToProps = (state: State) => ({
  loading: state.post.loading || !state.auth.user,
  posts: state.post.data,
})

const actionCreators = {
  fetchPosts,
  deletePost,
}

export default connect(mapStateToProps, actionCreators)(Feed)
