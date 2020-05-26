import React, {FC, useEffect} from "react";
import Feed from "./Feed";
import {deletePost, fetchPosts} from "../store/post/actions";
import {State} from "../store";
import {connect} from 'react-redux'
import Post from "../post/post.interface";

interface Props {
  loading: boolean
  posts: Post[]
  fetchPosts: (limit?: number, beforeId?: number) => void
  deletePost: (id: number) => void
}

const FeedContainer: FC<Props> = ({loading, posts, fetchPosts, deletePost}) => {

  useEffect(() => {
    fetchPosts(10)
  }, [])

  const handleLoadMore = () => {
    const oldestPostIdInFeed = Math.min(...posts.map((post) => post.id))
    fetchPosts(10, oldestPostIdInFeed)
  }

  return (
    <Feed loading={loading} posts={posts} onLoadMore={handleLoadMore} onDeletePost={deletePost}/>
  )
}

const mapStateToProps = (state: State) => ({
  loading: state.post.loading,
  posts: state.post.data,
})

const actionCreators = {
  fetchPosts,
  deletePost,
}

export default connect(mapStateToProps, actionCreators)(FeedContainer)
