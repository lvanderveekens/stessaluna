import React, { Fragment, useEffect, FunctionComponent } from 'react';
import Post from '../post/Post';
import { connect } from 'react-redux';
import { fetchPosts, deletePost } from '../store/post/actions';
import moment from 'moment';
import { Spinner } from 'react-bootstrap';
import PostInterface from '../post/post.interface';
import AorbExercise from '../exercise/aorb/AorbExercise';

interface Props {
  loading: boolean
  posts: PostInterface[]
  fetchPosts: () => void
  deletePost: (id: number) => void
};

const Feed: FunctionComponent<Props> = ({ loading, posts, fetchPosts, deletePost }) => {

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Fragment>
      <h4>Feed</h4>

      {loading
        ? <Spinner animation="border" variant="warning" />
        : (posts.length == 0
          ? (<div>No posts found!</div>)
          : posts
            .sort((post, other) => new Date(other.createdAt).getTime() - new Date(post.createdAt).getTime())
            .map((post) =>
              <Post
                key={post.id}
                id={post.id}
                author={post.user}
                // text={post.text}
                // image={post.image}
                timestamp={moment(post.createdAt).fromNow()}
                onDelete={() => deletePost(post.id)}
                comments={post.comments}
              >
                {post.type == 'exercise' && post.exercise.type == 'aorb' && (<AorbExercise sentences={post.exercise.sentences} />)}
              </Post>
            )
        )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  loading: state.post.loading,
  posts: state.post.items,
});

const actionCreators = {
  fetchPosts,
  deletePost,
};

export default connect(mapStateToProps, actionCreators)(Feed);