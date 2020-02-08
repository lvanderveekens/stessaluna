import React, { Fragment, useEffect, FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import Post from '../post/Post';
import { connect } from 'react-redux';
import { fetchPosts, deletePost } from '../post/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

interface Props {
  loading: boolean
  posts: any[]
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
        ? (<p><span className="mr-2"><FontAwesomeIcon icon={faCircleNotch} spin={true} /></span>Loading posts...</p>)
        : (posts.length == 0
          ? (<div>No posts found!</div>)
          : posts
            .sort((post, other) => new Date(other.createdAt).getTime() - new Date(post.createdAt).getTime())
            .map((post) =>
              <Post
                key={post.id}
                id={post.id}
                author={post.user}
                text={post.text}
                image={post.image}
                timestamp={moment(post.createdAt).fromNow()}
                onDelete={() => deletePost(post.id)}
                comments={post.comments}
              />)
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