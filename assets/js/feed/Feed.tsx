import React, { Fragment, useEffect, FunctionComponent } from 'react';
import Post from '../post/Post';
import { connect } from 'react-redux';
import { fetchPosts, deletePost } from '../store/post/actions';
import moment from 'moment';
import { Spinner } from 'react-bootstrap';
import PostInterface from '../post/post.interface';
import { State } from '../store';

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

  const byDateDescending = (post: PostInterface, other: PostInterface) => (
    new Date(other.createdAt).getTime() - new Date(post.createdAt).getTime()
  );

  return (
    <Fragment>
      {loading
        ? <Spinner animation="border" variant="warning" />
        : (posts.length == 0
          ? (<div>No posts found!</div>)
          : posts
            .sort(byDateDescending)
            .map((post) =>
              <Post
                key={post.id}
                id={post.id}
                timestamp={moment(post.createdAt).fromNow()}
                author={post.author}
                text={post.text}
                image={post.image}
                exercise={post.exercise}
                onDelete={() => deletePost(post.id)}
                comments={post.comments}
              />
            )
        )}
    </Fragment>
  );
};

const mapStateToProps = (state: State) => ({
  loading: state.post.loading || !state.auth.user,
  posts: state.post.items,
});

const actionCreators = {
  fetchPosts,
  deletePost,
};

export default connect(mapStateToProps, actionCreators)(Feed);