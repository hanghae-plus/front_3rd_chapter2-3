import { Post, Page, NewPost } from "../model/types"

export interface PostsData {
  posts: Post[]
  total: number
  limit: number
  skip: number
}

/**
 * 페이지에 해당하는 게시물을 가져옵니다.
 * @param {Page} 게시물 페이지네이션 범위
 * @returns {Promise<Post[]>} 게시물 목록
 */
export const fetchPostsApi = async ({ limit, skip }: Page): Promise<PostsData> => {
  try {
    const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(`게시물 가져오기 오류: ${error}`)
  }
}

/**
 * 검색 내용에 해당하는 게시물을 가져옵니다.
 * @param searchQuery 검색문의내용
 * @returns {Promise<Post[]>} 검색 내용에 해당하는 게시물 목록
 */
export const searchPostsApi = async (searchQuery: string): Promise<PostsData> => {
  try {
    const response = await fetch(`/api/posts/search?q=${searchQuery}`)
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(`게시물 검색 오류: ${error}`)
  }
}

// TODO feature
/**
 * 태그에 해당하는 게시물을 가져옵니다.
 * @param {string} tag 태그
 * @returns {Promise<Post[]>} 태그 별 게시물 목록
 */
export const fecthPostsByTagApi = async (tag: string): Promise<PostsData> => {
  try {
    const response = await fetch(`/api/posts/tag/${tag}`)
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(`태그별 게시물 가져오기 오류: ${error}`)
  }
}

// TODO feature
/**
 * 게시물을 추가합니다.
 * @param {NewPost} newPost 추가할 새 게시물
 * @returns {Promise<Post>} 추가된 게시물
 */
export const createPostApi = async (newPost: NewPost): Promise<Post> => {
  try {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(`게시물 추가 오류: ${error}`)
  }
}

// TODO feature
/**
 * 게시물을 업데이트합니다.
 * @param {Post} updatingPost 업데이트할 게시물
 * @returns {Promise<Post>} 업데이트된 게시물
 */
export const updatePostApi = async (updatingPost: Post): Promise<Post> => {
  try {
    const response = await fetch(`/api/posts/${updatingPost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatingPost),
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(`게시물 업데이트 오류: ${error}`)
  }
}

/**
 * 게시물을 삭제합니다.
 * @param postId 게시물 번호
 * @returns {void}
 */
export const deletePostApi = async (postId: number): Promise<void> => {
  try {
    await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    })
  } catch (error) {
    throw new Error(`게시물 삭제 오류: ${error}`)
  }
}
