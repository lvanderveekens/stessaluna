import {schema} from "normalizr";
import {renameProp} from "../../../util/object";
import {userSchema} from "../../../user/state/user.schema";
import {voteSchema} from "../../vote/state/vote.schema";

const processStrategy = (entity) => {
  renameProp('user', 'userId', entity)
  renameProp('votes', 'voteIds', entity)
  return entity
}

export const commentSchema = new schema.Entity(
  'comments',
  {
    userId: userSchema,
    voteIds: [voteSchema]
  },
  {processStrategy}
)
