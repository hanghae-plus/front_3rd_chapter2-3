import { Post } from "../../../entities/post/model/types"
import { User } from "../../../entities/user/model/types"

export type PostWithUser = Post & { author: User }
