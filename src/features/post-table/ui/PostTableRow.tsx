import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import { useModalStore } from '~/features/user-modal/model/userModalStore';

import { deletePost } from '~/entities/post/api/postApi';
import { Post } from '~/entities/post/model/types';
import { fetchUserById } from '~/entities/user/api/userApi';
import { User } from '~/entities/user/model/types';
import { useUserStore } from '~/entities/user/model/userStore';

import { Button } from '~/shared/ui/Button';
import { HighlightText } from '~/shared/ui/HighlightText';
import { TableCell, TableRow } from '~/shared/ui/Table';

export const PostTableRow = ({ post }: { post: Post }) => {
  // URL query params
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const selectedTag = searchParams.get('tag');

  // modal store
  const setShowUserModal = useModalStore.use.setShowUserModal();

  // user store
  const selectUser = useUserStore.use.selectUser();

  // 사용자 모달 열기
  const openUserModal = async (user: User) => {
    try {
      const userData = await fetchUserById(user.id);
      selectUser(userData);
      setShowUserModal(true);
    } catch (error) {
      console.error('사용자 정보 가져오기 오류:', error);
    }
  };

  // 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const data = await fetchAllCommentsByPostId(postId);

      setComments((prev) => ({ ...prev, [postId]: data.comments }));
    } catch (error) {
      console.error('댓글 가져오기 오류:', error);
    }
  };

  // 게시물 상세 보기
  const openPostDetail = (post) => {
    setSelectedPost(post);
    fetchComments(post.id);
    setShowPostDetailDialog(true);
  };

  return (
    <TableRow>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>
            <HighlightText text={post.title} highlight={searchQuery} />
          </div>

          <div className="flex flex-wrap gap-1">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                  selectedTag === tag
                    ? 'text-white bg-blue-500 hover:bg-blue-600'
                    : 'text-blue-800 bg-blue-100 hover:bg-blue-200'
                }`}
                onClick={() => {
                  setSearchParams({ tag: tag });
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(post.author)}>
          <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
          <span>{post.author?.username}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4" />
          <span>{post.reactions?.likes || 0}</span>
          <ThumbsDown className="w-4 h-4" />
          <span>{post.reactions?.dislikes || 0}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
            <MessageSquare className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedPost(post);
              setShowEditDialog(true);
            }}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
