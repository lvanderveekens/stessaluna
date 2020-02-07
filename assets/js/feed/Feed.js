import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Post from '../post/Post';
import { connect } from 'react-redux';
import { fetchPosts, deletePost } from '../post/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const Feed = ({ loading, posts, fetchPosts, deletePost }) => {

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Fragment>
      <h4>Feed</h4>

      {loading
        ? (<p><span className="mr-2"><FontAwesomeIcon icon={faCircleNotch} spin={true} /></span>Loading posts...</p>)
        : (posts.length == 0
          ? (<div>No posts found!</div>)
          : posts
            .sort((post, other) => new Date(other.createdAt) - new Date(post.createdAt))
            .map((post) =>
              <Post
                key={post.id}
                id={post.id}
                author={`${post.user.username}`}
                text={post.text}
                image={post.image}
                timestamp={moment(post.createdAt).fromNow()}
                onDelete={() => deletePost(post.id)}
                avatar={post.avatar}
                comments={post.comments}
              />)
        )}
    </Fragment>
  );
};

Feed.propTypes = {
  loading: PropTypes.bool.isRequired,
  posts: PropTypes.array.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
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