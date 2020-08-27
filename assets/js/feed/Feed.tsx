import React, {FC} from "react"
import styles from './Feed.scss?module'
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import FeedPlaceholder from "./placeholder/FeedPlaceholder";
import Post from "../post/Post";
import ChannelFilter from "./channel-filter/ChannelFilter";
import Button from "../button/Button";


interface Props {
  loading: boolean
  postIds: number[]
  hasMore: boolean
  onLoadMore: () => void
}

const Feed: FC<Props> = ({loading, postIds, hasMore, onLoadMore}) => {

  return (
    <div className={styles.feed}>
      <div className={styles.filters}>
        <ChannelFilter/>
      </div>
      {!postIds.length && !loading && (
        <div className={styles.noPostsFound}>
          <div className="mb-3">No posts found...</div>
          <div>Take this chance to become the first poster!</div>
        </div>
      )}
      {postIds.length > 0 && (
        <TransitionGroup component={null}>
          {postIds
            .sort((id, other) => other - id)
            .map((id) => (
              <CSSTransition key={id} in={true} exit={true} appear={true} timeout={200} classNames="fade">
                <Post id={id}/>
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
