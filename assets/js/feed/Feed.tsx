import React, {FC} from "react"
import PostInterface from "../post/post.interface"
import styles from './Feed.scss?module'
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import FeedPlaceholder from "./placeholder/FeedPlaceholder";
import Post from "../post/Post";
import ChannelFilter from "./channel-filter/ChannelFilter";
import Button from "../button/Button";


interface Props {
  loading: boolean
  posts: PostInterface[]
  hasMore: boolean
  onLoadMore: () => void
}

const Feed: FC<Props> = ({loading, posts, hasMore, onLoadMore}) => {

  return (
    <div className={styles.feed}>
      <div className={styles.filters}>
        <ChannelFilter/>
      </div>
      {!posts.length && !loading && (
        <div className={styles.noPostsFound}>
          <div className="mb-3">No posts found...</div>
          <div>Take this chance to become the first poster!</div>
        </div>
      )}
      {posts.length > 0 && (
        <TransitionGroup component={null}>
          {posts
            .sort((post, other) => other.id - post.id)
            .map((post) => (
              <CSSTransition key={post.id} in={true} exit={true} appear={true} timeout={200} classNames="fade">
                <Post
                  id={post.id}
                  createdAt={post.createdAt}
                  edited={post.createdAt != post.modifiedAt}
                  author={post.author}
                  channel={post.channel}
                  text={post.text}
                  image={post.image}
                  votes={post.votes}
                  exercise={post.exercise}
                  comments={post.comments}
                />
              </CSSTransition>
            ))
          }
        </TransitionGroup>
      )}
      {loading && (<FeedPlaceholder/>)}
      {!loading && hasMore && (
        <div className={styles.loadMoreWrapper}>
          <Button variant="transparent-light" onClick={onLoadMore}>Load more</Button>
        </div>
      )}
    </div>
  )
}

export default Feed
