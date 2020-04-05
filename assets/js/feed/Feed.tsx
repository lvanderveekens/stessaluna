import React, { Fragment, useEffect, FunctionComponent } from 'react';
import Post from '../post/Post';
import { connect } from 'react-redux';
import { fetchPosts, deletePost } from '../store/post/actions';
import moment from 'moment';
import { Spinner } from 'react-bootstrap';
import PostInterface from '../post/post.interface';
import AorbExercise from '../exercise/aorb/aorb-exercise';
import ExercisePostInterface from '../post/exercise/exercise-post.interface';
import TextContent from '../post/text/TextContent';

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

  const renderPostContent = (post: PostInterface) => {
    switch(post.type) {
      case 'text':
        return <TextContent text={post.text} imageSrc={post.imagePath} />;
      case 'exercise':
        return renderExercise(post);
    }
  }

  const renderExercise = (post: ExercisePostInterface) => {
    switch(post.exercise.type) {
      case 'aorb':
        return <AorbExercise id={post.exercise.id} sentences={post.exercise.sentences} />
    }
  }

  const byDateDescending = (post: PostInterface, other: PostInterface) => (
    new Date(other.createdAt).getTime() - new Date(post.createdAt).getTime()
  );

  return (
    <Fragment>
      <h4>Feed</h4>

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
                author={post.author}
                timestamp={moment(post.createdAt).fromNow()}
                onDelete={() => deletePost(post.id)}
                comments={post.comments}
              >
                {renderPostContent(post)}
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