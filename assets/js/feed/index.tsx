import React, {FC, useEffect, useState} from "react";
import Feed from "./Feed";
import {fetchPosts} from "../post/state/post.actions";
import {State} from "../store";
import {connect} from 'react-redux'
import {Filters} from "./state/feed.reducer";

interface Props {
  loading: boolean
  postIds: number[]
  hasMore: boolean
  filters: Filters
  fetchPosts: (channels?: string[], limit?: number, beforeId?: number, append?: boolean) => void
  loggedIn: boolean
  userId: number
}

const FETCH_SIZE = 10;

const FeedContainer: FC<Props> = ({loading, postIds, hasMore, filters, fetchPosts, userId, loggedIn}) => {

  const [waitingForInitialFetch, setWaitingForInitialFetch] = useState(true)

  useEffect(() => {
    if (!loggedIn || userId) {
      fetchPosts(filters.channel, FETCH_SIZE)
      setWaitingForInitialFetch(false)
    }
  }, [filters, loggedIn, userId])

  const handleLoadMore = () => {
    const oldestPostInFeed = Math.min(...postIds)
    fetchPosts(filters.channel, FETCH_SIZE, oldestPostInFeed, true)
  }

  return (
    <Feed
      loading={waitingForInitialFetch || loading}
      postIds={postIds}
      hasMore={hasMore}
      onLoadMore={handleLoadMore}
    />
  )
}

const mapStateToProps = (state: State) => ({
  loading: state.feed.loading,
  postIds: state.feed.postIds,
  hasMore: state.feed.hasNextPage,
  filters: state.feed.filters,
  loggedIn: state.auth.loggedIn,
  userId: state.auth.userId,
})

const actionCreators = {
  fetchPosts,
}

export default connect(mapStateToProps, actionCreators)(FeedContainer)
