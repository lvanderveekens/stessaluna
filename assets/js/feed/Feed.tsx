import React, {FC, useState} from "react"
import PostInterface from "../post/post.interface"
import styles from './Feed.scss?module'
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import FeedPlaceholder from "./placeholder/FeedPlaceholder";
import moment from "moment";
import Post from "../post/Post";
import ChannelFilter from "./channel-filter/ChannelFilter";


interface Props {
  loading: boolean
  posts: PostInterface[]
  onLoadMore: () => void
  onDeletePost: (id: number) => void
}

const Feed: FC<Props> = ({loading, posts, onLoadMore, onDeletePost}) => {

  console.log(posts)

  return (
    <div className={styles.feed}>
      <div className={styles.filters}>
        <ChannelFilter/>
      </div>
      <TransitionGroup component={null}>
        {posts
          .sort((post, other) => other.id - post.id)
          .map((post) => (
            <CSSTransition key={post.id} in={true} exit={true} appear={true} timeout={200} classNames="fade">
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
      {loading && (<FeedPlaceholder/>)}
      <div className={styles.loadMoreWrapper}>
        <button onClick={onLoadMore}>Load more</button>
      </div>
    </div>
  )
}

export default Feed
