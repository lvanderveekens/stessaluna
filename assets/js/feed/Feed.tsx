import React, {FC} from "react"
import PostInterface from "../post/post.interface"
import styles from './Feed.scss?module'
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import FeedPlaceholder from "./placeholder/FeedPlaceholder";
import moment from "moment";
import Post from "../post/Post";


interface Props {
  loading: boolean
  posts: PostInterface[]
  onLoadMore: () => void
  onDeletePost: (id: number) => void
}

const Feed: FC<Props> = ({loading, posts, onLoadMore, onDeletePost}) => {
  if (loading) {
    return <FeedPlaceholder/>
  }

  return (
    <div className={styles.feed}>
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
                onDelete={() => onDeletePost(post.id)}
                comments={post.comments}
              />
            </CSSTransition>
          ))
        }
      </TransitionGroup>
      <div className={styles.loadMoreWrapper}>
        <button onClick={onLoadMore}>Load more</button>
      </div>
    </div>
  )
}

export default Feed
