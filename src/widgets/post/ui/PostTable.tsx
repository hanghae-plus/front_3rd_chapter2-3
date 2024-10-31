import { Post } from '../../../entities/post/model/types';
import { PostDeleteButton } from '../../../features/post/postDelete';
import { PostEditButton } from '../../../features/post/postEdit/ui/PostEditButton';
import { UserDetailDialog } from '../../../features/user/userDetail/ui/UserDetailDialog';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/ui';
import { MessageSquare, ThumbsDown, ThumbsUp } from 'lucide-react';

interface Props {
  posts: Post[];
  searchQuery: string;
  selectedTag: string;
  onClickTag: (tag: string) => void;
  onClickCommentButton: (post: Post) => void;
  onDeletePost: (deletedPost: Post) => void;
}

export const PostTable = ({
  posts,
  searchQuery,
  selectedTag,
  onClickTag,
  onClickCommentButton,
  onDeletePost,
}: Props) => {
  const highlightText = (text: string, highlight: string) => {
    if (!text) return null;
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
      </span>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>{highlightText(post.title, searchQuery)}</div>

                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? 'text-white bg-blue-500 hover:bg-blue-600'
                          : 'text-blue-800 bg-blue-100 hover:bg-blue-200'
                      }`}
                      onClick={() => onClickTag(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>

            {/* 아바타 */}
            <TableCell>{post.author && <UserDetailDialog user={post.author} />}</TableCell>

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
                {/* 게시글 상세 보기 */}
                <Button variant="ghost" size="sm" onClick={() => onClickCommentButton(post)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>

                {/* 게시글 수정 */}
                <PostEditButton post={post} />

                {/* 게시글 삭제 */}
                <PostDeleteButton post={post} onDelete={onDeletePost} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
