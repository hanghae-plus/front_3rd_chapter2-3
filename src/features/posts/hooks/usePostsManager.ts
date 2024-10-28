import { useState, useCallback } from 'react'
import { Post, NewPost } from '../../../entity/post/model'
import { Tag } from '../../../entity/tag/model'
import { postsApi } from '../api'
import { useQueryParams } from '../../../shared/lib/hooks/useQueryParams'

export const usePostsManager = () => {
  const { getParam } = useQueryParams()

  // 기본 상태
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [skip, setSkip] = useState(parseInt(getParam("skip", "0")))
  const [limit, setLimit] = useState(parseInt(getParam("limit", "10")))
  const [searchQuery, setSearchQuery] = useState(getParam("search", ""))
  const [selectedTag, setSelectedTag] = useState(getParam("tag", ""))
  const [sortBy, setSortBy] = useState(getParam("sortBy", ""))
  const [sortOrder, setSortOrder] = useState(getParam("sortOrder", "asc"))
  const [tags, setTags] = useState<Tag[]>([])

  // API 호출 함수들
  const fetchPosts = useCallback(async () => {
    setLoading(true)
    try {
      const result = await postsApi.fetchPosts(limit, skip)
      setPosts(result.posts)
      setTotal(result.total)
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }, [limit, skip])

  const searchPosts = useCallback(async () => {
    if (!searchQuery) {
      fetchPosts()
      return
    }
    
    setLoading(true)
    try {
      const result = await postsApi.searchPosts(searchQuery)
      setPosts(result.posts)
      setTotal(result.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    } finally {
      setLoading(false)
    }
  }, [searchQuery, fetchPosts])

  const fetchPostsByTag = useCallback(async (tag: string) => {
    try {
      const result = await postsApi.fetchPostsByTag(tag)
      setPosts(result.posts)
      setTotal(result.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchTags = useCallback(async () => {
    try {
      const data = await postsApi.fetchTags()
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }, [])

  // 게시물 추가
  const addPost = useCallback(async (newPost: NewPost) => {
    setLoading(true);
    try {
      const result = await postsApi.addPost(newPost);
      setPosts(prevPosts => [result, ...prevPosts]);
      setTotal(prevTotal => prevTotal + 1);
      return result;
    } catch (error) {
      console.error("게시물 추가 오류:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // 게시물 수정
  const updatePost = useCallback(async (post: Post) => {
    setLoading(true);
    try {
      const updatedPost = await postsApi.updatePost(post);
      setPosts(prevPosts => 
        prevPosts.map(p => p.id === updatedPost.id ? updatedPost : p)
      );
      return updatedPost;
    } catch (error) {
      console.error("게시물 수정 오류:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // 게시물 삭제
  const deletePost = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await postsApi.deletePost(id);
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
      setTotal(prevTotal => prevTotal - 1);
    } catch (error) {
      console.error("게시물 삭제 오류:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    // 상태
    posts,
    total,
    loading,
    skip,
    limit,
    searchQuery,
    selectedTag,
    sortBy,
    sortOrder,
    tags,

    // 상태 업데이트 함수
    setSkip,
    setLimit,
    setSearchQuery,
    setSelectedTag,
    setSortBy,
    setSortOrder,

    // API 함수
    fetchPosts,
    searchPosts,
    fetchPostsByTag,
    fetchTags,
    addPost,
    updatePost,
    deletePost,
  }
}
