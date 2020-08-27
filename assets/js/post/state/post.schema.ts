import {schema} from "normalizr";
import {renameProp} from "../../util/object";
import {commentSchema} from "../comment/state/comment.schema";
import {voteSchema} from "../vote/state/vote.schema";
import {userSchema} from "../../user/state/user.schema";
import {exerciseSchema} from "../../exercise/state/exercise.schema";

const processStrategy = (entity) => {
  renameProp('author', 'authorId', entity)
  renameProp('exercise', 'exerciseId', entity)
  renameProp('comments', 'commentIds', entity)
  renameProp('votes', 'voteIds', entity)
  return entity
}

export const postSchema = new schema.Entity(
  'posts',
  {
    authorId: userSchema,
    exerciseId: exerciseSchema,
    commentIds: [commentSchema],
    voteIds: [voteSchema]
  },
  {processStrategy}
)
