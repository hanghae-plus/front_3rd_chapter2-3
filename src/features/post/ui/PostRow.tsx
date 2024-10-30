import { TableRow, TableCell } from "../../../shared/ui/Table"
import { Button } from "../../../shared/ui/Button/Button"
import { ThumbsUp, ThumbsDown, Edit2, Trash2, MessageSquare } from "lucide-react"
import Tag from "./Tag"
import { useAtom } from "jotai"
import usePostMutations from "../model/usePostMutations"
import { searchQueryAtom, selectedPostAtom, showEditDialogAtom, showPostDetailDialogAtom } from '../../../entities/post/model/postAtom';
import { highlightText } from "../../../shared/utils"
import { selectedTagAtom } from "../../../entities/tag/model/tagAtom"
import useUserModal from "../model/useUserModal"
import { Post } from "../../../entities/post/api/types"
import { useMutation } from "@tanstack/react-query"
import { fetchComments } from "../../../entities/comment/api/commentApi"
import { selectedUserAtom } from "../../../entities/user/model/userAtom"
import useUser from "../../user/model/useUser"
import useComments from "../../comment/model/useComments"
import useCommentModal from "../../comment/model/useCommentModal"

interface PostRowProps {
  post: Post
  // onEdit: (post: Post) => void
  // onDelete: (postId: number) => void
  // onDetail: (post: Post) => void
  // onTagSelect: (tag: string) => void
  // selectedTag: string
  // highlightText: (text: string, highlight: string) => React.ReactNode
  // searchQuery: string
  // openUserModal: (user: User) => void
}


const PostRow: React.FC<PostRowProps> = ({
  post,
  // selectedTag,
  // highlightText,
  // searchQuery,
  // openUserModal
}) => {
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom);
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom);
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom);

  // const {data:allUsers,isSuccess} = useUser().fetchAllUser;

  const { deletePostMutation } = usePostMutations();
  const { openUserModal } = useUserModal();
  const { data: allUsersData, isLoading: allUserLoading } = useUser();
  const {openCommentModal} = useCommentModal();
  const getUserProfile = (postUsrId:number) => allUsersData?.users.find(item => item.id === post.userId)

  const openPostDetail = (post) => {
    setSelectedPost(post);
    setShowPostDetailDialog(true);
    // 댓글을 불러오는 로직은 상위 컴포넌트에서 처리
  };

  // 댓글 데이터 패칭 Mutation
  // const fetchCommentsMutation = useMutation<Comment,Error>({
  //   mutationFn: (postId) => fetchComments(postId),
  //   onSuccess: (data, postId) => {
  //     setComments((prev) => ({ ...prev, [postId]: data.comments }));
  //   },
  // });
  
  return (
  <TableRow key={post.id}>
  <TableCell>{post.id}</TableCell>
  <TableCell>
    <div className="space-y-1">
      <div>{highlightText(post.title, searchQuery)}</div>
      <div className="flex flex-wrap gap-1">
        {post.tags.map((tag,idx) => (
          <Tag tag={tag} key={idx}/>
        ))}
      </div>
    </div>
  </TableCell>
  <TableCell>
    <div
      className="flex items-center space-x-2 cursor-pointer"
      onClick={() => openUserModal(post.userId)}
    >
    <img
      src={getUserProfile(post.userId)?.image}
      alt={getUserProfile(post.userId)?.username}
      className="w-8 h-8 rounded-full" />
    <span>{getUserProfile(post.userId)?.username}</span>

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
      <Button variant="ghost" size="sm" onClick={() => {
        openPostDetail(post);
        openCommentModal(post.id);
        // if (!comments[post.id]) fetchCommentsMutation.mutate(post.id);
      }}>
        <MessageSquare className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {openPostDetail(post)}}
      >
        <Edit2 className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => deletePostMutation.mutate(post.id)}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  </TableCell>
</TableRow>
)}

export default PostRow