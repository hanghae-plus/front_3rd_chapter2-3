import { TableRow, TableCell } from "../../../shared/ui/Table"
import { Button } from "../../../shared/ui/Button/Button"
import { ThumbsUp, ThumbsDown, Edit2, Trash2, MessageSquare } from "lucide-react"
import Tag from "./Tag"
import { useAtom } from "jotai"
import usePostMutations from "../model/usePostMutations"
import { searchQueryAtom, selectedPostAtom, showEditDialogAtom, showPostDetailDialogAtom } from '../../../entities/post/model/postAtom';
import { highlightText } from "../../../shared/utils"
import { EnrichedPost, Post } from "../../../entities/post/api/types"
import { showUserModalAtom } from "../../../entities/user/model/userAtom"

interface PostRowProps {
  post: EnrichedPost
}


const PostRow: React.FC<PostRowProps> = ({
  post
}) => {
  const [, setSelectedPost] = useAtom(selectedPostAtom);
  const [, setShowEditDialog] = useAtom(showEditDialogAtom);
  const [, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom);
  const [, setShowUserModal] = useAtom(showUserModalAtom);


  const [searchQuery, ] = useAtom(searchQueryAtom);

  const { deletePostMutation } = usePostMutations();

  const openPostDetail = (post:Post) => {
    setSelectedPost(post);
    setShowPostDetailDialog(true);
  };
  
  const openPostEdit = (post:Post) => {
    setSelectedPost(post);
    setShowEditDialog(true); 
  };
  
  const openUserModal = (post:Post) => {
    setSelectedPost(post);
    setShowUserModal(true); 
  };
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
      onClick={() => openUserModal(post)}
    >
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
      <Button variant="ghost" size="sm" onClick={() => {
        openPostDetail(post);
      }}>
        <MessageSquare className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {openPostEdit(post)}}
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