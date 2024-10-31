import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUrlParams } from '../../../shared/lib/hooks/useUrlParams';
import { useDebounce } from '../../../shared/lib/hooks/useDebounce';
import { fetchPostsApi, searchPostsApi, fetchPostsByTagApi, addPostApi, updatePostApi, deletePostApi } from '../../../entities/post/api/postApi';
import { fetchTagsApi } from '../../../entities/tag/api/tagApi';
import { Post, NewPost, ReqUpdatePost } from '../../../entities/post/model/types';
import { User } from '../../../entities/user/model/types';
import { fetchCommentsApi } from '../../../entities/comment/api/commentApi';
import { fetchUsersById } from '../../../entities/user/api/userApi';

export function usePost() {
  const queryClient = useQueryClient();
  const { params, updateUrl } = useUrlParams();
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState(params.get('search') || '');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [sortBy, setSortBy] = useState(params.get('sortBy') || '');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>((params.get('sortOrder') as 'asc' | 'desc') || 'asc');
  const [selectedTag, setSelectedTag] = useState(params.get('tag') || '');
  const [limit, setLimit] = useState(parseInt(params.get('limit') || '10'));
  const [skip, setSkip] = useState(parseInt(params.get('skip') || '0'));
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data: postsData, isLoading: isPostsLoading } = useQuery({
    queryKey: ['posts', selectedTag, sortBy, sortOrder, debouncedSearchQuery, limit, skip],
    queryFn: () => selectedTag 
    ? fetchPostsByTagApi(selectedTag)
    : debouncedSearchQuery 
      ? searchPostsApi(debouncedSearchQuery)
      : fetchPostsApi(limit, skip),
  });

  const { data: tagsData } = useQuery({
    queryKey: ['tags'], queryFn: fetchTagsApi
  });

  const addPostMutation = useMutation({
    mutationFn: (newPost: NewPost) => addPostApi(newPost),
    onSuccess: (newPost) => {
        queryClient.setQueryData(['posts'], (oldData: any) => ({
          ...oldData,
          posts: [newPost, ...(oldData?.posts || [])],
        }));
        setPosts((prevPosts) => [newPost, ...prevPosts]);
      },
  });

  const updatePostMutation = useMutation({
    mutationFn: ({ id, post }: { id: number; post: ReqUpdatePost }) => updatePostApi(id, post),
    onSuccess:  () => {
        queryClient.invalidateQueries({queryKey:['posts']});
    },
    onError: (error) => {
        console.error("게시물 추가 오류:", error);
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePostApi,
    onSuccess:  () => {
        queryClient.invalidateQueries({queryKey:['posts']});
      },
  });

  const openPostDetail = async (post: Post) => {
    setSelectedPost(post);
    await queryClient.prefetchQuery({ queryKey: ['comments', post.id], queryFn: () => fetchCommentsApi(post.id)});
  };

  const openUserModal = async (userId: number) => {
    const userData = await queryClient.fetchQuery({ queryKey: ['user', userId], queryFn: () => fetchUsersById(userId)});
    setSelectedUser(userData);
  };

  useEffect(() => {
    updateUrl({
      search: searchQuery,
      sortBy,
      sortOrder,
      tag: selectedTag,
      limit: limit.toString(),
      skip: skip.toString(),
    });
  }, [searchQuery, sortBy, sortOrder, selectedTag, limit, skip]);

  return {
    posts: postsData?.posts || [],
    total: postsData?.total || 0,
    tags: tagsData || [],
    isPostsLoading,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    selectedTag,
    setSelectedTag,
    limit,
    setLimit,
    skip,
    setSkip,
    addPost: (newPost: NewPost) => addPostMutation.mutateAsync(newPost),
    updatePost: updatePostMutation.mutate,
    deletePost: deletePostMutation.mutate,
    openPostDetail,
    openUserModal
  };
}