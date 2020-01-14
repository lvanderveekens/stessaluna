import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Post from '../post/Post';
import { connect } from 'react-redux';
import { fetchPosts, deletePost } from '../post/actions';

const Feed = ({ posts, fetchPosts, deletePost }) => {

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Fragment>
      <h4>Feed</h4>
      {(posts.length > 0)
        ? posts
          .sort((p1, p2) => p2.id - p1.id)
          .map((post, index) =>
            <Post
              key={index}
              userName={post.userName}
              text={post.text}
              imagePath={post.imagePath}
              createdAt={post.createdAt}
              onDelete={() => deletePost(post.id)}
            />)
        : (
          // TODO: loading posts...
          <div>
            No posts found!
          </div>
        )}
    </Fragment>
  );
};

Feed.propTypes = {
  posts: PropTypes.array,
  fetchPosts: PropTypes.func,
  deletePost: PropTypes.func
};

const mapStateToProps = state => ({
  posts: state.posts
});

const actionCreators = {
  fetchPosts,
  deletePost,
};

export default connect(mapStateToProps, actionCreators)(Feed);