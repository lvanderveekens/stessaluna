import {schema} from "normalizr";
import {renameProp} from "../../../util/object";
import {userSchema} from "../../../user/state/user.schema";

const processStrategy = (entity) => {
  renameProp('user', 'userId', entity)
  return entity
}

export const voteSchema = new schema.Entity(
  'votes',
  {
    userId: userSchema
  },
  {processStrategy}
)

