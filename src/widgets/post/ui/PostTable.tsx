import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Button } from "../../../shared/ui";
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { Post, ReqUpdatePost } from '../../../entities/post/model/types';
import { User } from '../../../entities/user/model/types';
import { highlightText } from '../../../shared/lib/utils/text';

interface PostTableProps {
  posts: ReqUpdatePost[];
  searchQuery: string;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  onEditPost: (post: Post) => void;
  onDeletePost: (id: number) => void;
  onOpenPostDetail: (post: Post) => void;
  onOpenUserModal: (user: User) => void;
}

export default function PostTable ({
  posts,
  searchQuery,
  selectedTag,
  setSelectedTag,
  onEditPost,
  onDeletePost,
  onOpenPostDetail,
  onOpenUserModal,
}: PostTableProps) {
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
                  {post.tags && post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => setSelectedTag(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onOpenUserModal(post.author)}>
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
                <Button variant="ghost" size="sm" onClick={() => onOpenPostDetail(post)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onEditPost(post)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDeletePost(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};