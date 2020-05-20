import React, {FunctionComponent, useEffect} from "react"
import Post from "../post/Post"
import {connect} from "react-redux"
import {deletePost, fetchPosts} from "../store/post/actions"
import moment from "moment"
import PostInterface from "../post/post.interface"
import {State} from "../store"
import FeedPlaceholder from "./placeholder/FeedPlaceholder"
import FadeIn from "react-fade-in"

interface Props {
  loading: boolean
  posts: PostInterface[]
  fetchPosts: () => void
  deletePost: (id: number) => void
}

const Feed: FunctionComponent<Props> = ({ loading, posts, fetchPosts, deletePost }) => {
  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div id="feed">
      {loading && <FeedPlaceholder />}
      {!loading && posts
        .sort((post, other) => other.id - post.id)
        .map((post) => (
          // TODO: how to fade-in only the newly fetched posts...?
          <Post
            key={post.id}
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
        ))
        // TODO: how to let the newly fetched posts still be a part of 'data' in state

        // How do I know when to stop rendering the "more" button? I guess only when the next page is empty...
        // OR the results is empty
        // onClick=fetchMorePosts()
        // loadingMorePosts
      }
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
