import React, { Fragment } from 'react';
import axios from '../axios/client';
import PropTypes from 'prop-types';
import Post from '../post/Post';

const Feed = ({posts, fetchPosts}) => {

  const handleDeletePost = (postId) => {
    // TODO: move to redux to get rid of fetchPosts()?
    axios.delete('/api/posts/' + postId)
      .then(res => console.log(res.data))
      .catch(error => console.log(error));

    fetchPosts();
  };

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
              onDelete={() => handleDeletePost(post.id)}
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
  fetchPosts: PropTypes.func
};

export default Feed;