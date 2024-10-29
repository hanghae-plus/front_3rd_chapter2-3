import React from "react"
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../../../shared/ui"
  
  import { Post, User } from "../../../shared/types"
  import { highlightText } from "../../../shared/model/HighlightText"

  interface PostTableProps {
    posts: Post[];
    searchQuery: string;
    selectedTag: string;
    onSelectTag: (tag: string) => void;
    onOpenUserModal: (user: User) => void;
    onOpenPostDetail: (post: Post) => void;
    onEditPost: (post: Post) => void;
    onDeletePost: (id: number) => void;
    // onupdateURL: () => void;
  }

  // 게시물 테이블 렌더링
  const PostTableWidget: React.FC<PostTableProps> = ({
    posts,
    searchQuery,
    selectedTag,
    onSelectTag,
    onOpenUserModal,
    onOpenPostDetail,
    onEditPost,
    onDeletePost,
    // onupdateURL
  }) => {

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
                              ? "text-white bg-blue-500 hover:bg-blue-600"
                              : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                          }`}
                          onClick={() => {
                            onSelectTag(tag)
                            // onupdateURL()
                          }}
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        onEditPost(post)
                        setShowEditDialog(true)
                      }}
                    >
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
      )
  }

  export default PostTableWidget;