export const API_ENDPOINTS = {
  COMMENTS: "/comments",
  COMMENTS_ADD: "/comments/add",
  COMMNETS_POST: "/comments/post",
  COMMENTS_UPDATE: (id: number) => `/comments/${id}`,
  COMMENTS_DELETE: (id: number) => `/comments/${id}`,
}
