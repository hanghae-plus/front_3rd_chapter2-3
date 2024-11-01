import { DEFAULT_USER_DATA } from "@entities/user/constants"

export const DEFAULT_COMMENT_FORM = {
  body: "",
  postId: -1,
  userId: 1,
}

export const DEFAULT_COMMENT = {
  id: -1,
  body: "",
  likes: 0,
  postId: -1,
  user: DEFAULT_USER_DATA,
}
