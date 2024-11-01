export const mutateKeys = {
  PUT_COMMENT_LIKES_KEY: (id: number, likes: number) => ["PUT_COMMENT_LIKES_KEY", id, likes],
  DELETE_COMMENT_LIKES_KEY: (id: number) => ["DELETE_COMMENT_LIKES_KEY", id],
  CREATE_COMMENT_LIKES_KEY: (comment: string) => ["CREATE_COMMENT_LIKES_KEY", comment],
}
