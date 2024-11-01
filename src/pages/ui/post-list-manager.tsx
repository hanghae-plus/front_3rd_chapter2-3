import { Edit2, MessageSquare, Plus, Search, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { useState } from "react";
import { renderHighlightText } from "../../shared/lib";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
} from "../../shared/ui";

import { CommentType } from "../../entities/comment";
import { PostType, TagType } from "../../entities/post";
import { useComment } from "../../features/comment";
import { usePost } from "../../features/post";
import { useUser } from "../../features/user";
import {
  useCommentListQuery,
  useCommentMutations,
} from "../../hooks/queries/use-comment-list-query";
import { useTagListQuery } from "../../features/post/model/use-tag-list-query";
import { usePostMutations } from "../../hooks/queries/use-post-mutations";
import { usePostQuery } from "../../features/post/model/use-post-query";

export const PostListManager = () => {
  const { setShowAddDialog } = usePost();

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <SearchBar />

          {/* 게시물 테이블 */}
          <PostTable />

          {/* 페이지네이션 */}
          <PostPagination />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <PostAddDialog />
      {/* 게시물 수정 대화상자 */}
      <PostEditDialog />
      {/* 댓글 추가 대화상자 */}
      <CommentAddDialog />
      {/* 댓글 수정 대화상자 */}
      <CommentEditDialog />
      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog />
      {/* 사용자 모달 */}
      <UserDialog />
    </Card>
  );
};

const CommentAddDialog = () => {
  const { showAddCommentDialog, setShowAddCommentDialog, newComment, setNewComment } = useComment();

  const { postCommentMutation } = useCommentMutations();

  const handleAddComment = () => {
    postCommentMutation.mutate(newComment);
    setShowAddCommentDialog(false);
  };

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={e => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={handleAddComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const PostEditDialog = () => {
  const { showEditDialog, setShowEditDialog } = usePost();

  const { selectedPost, setSelectedPost } = usePost();

  const { updatePostMutation } = usePostMutations();

  const handleUpdatePost = (selectedPost: PostType | null) => {
    if (selectedPost) {
      updatePostMutation.mutate(selectedPost);
      setShowEditDialog(false);
    }
  };

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={e => {
              if (selectedPost) {
                setSelectedPost({ ...selectedPost, title: e.target.value });
              }
            }}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={e => {
              if (selectedPost) {
                setSelectedPost({ ...selectedPost, body: e.target.value });
              }
            }}
          />
          <Button onClick={() => handleUpdatePost(selectedPost)}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const PostAddDialog = () => {
  const { showAddDialog, setShowAddDialog } = usePost();

  const [newPost, setNewPost] = useState<Omit<PostType, "id">>({
    title: "",
    body: "",
    userId: 1,
    tags: [],
    views: 0,
    reactions: {
      likes: 0,
      dislikes: 0,
    },
  });

  const { postNewPostMutation } = usePostMutations();

  const handleAddPost = () => {
    postNewPostMutation.mutate(newPost);
    setShowAddDialog(false);
  };

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={e => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={e => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={e => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={handleAddPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const PostPagination = () => {
  const { limit, skip, total, setLimit, setSkip } = usePost();

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={value => setLimit(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={() => setSkip(skip + limit)}>
          다음
        </Button>
      </div>
    </div>
  );
};

interface CommentEditDialogPropsType {}

const CommentEditDialog = (props: CommentEditDialogPropsType) => {
  const {} = props;

  const { showEditCommentDialog, setShowEditCommentDialog, selectedComment, setSelectedComment } =
    useComment();

  const handleUpdateComment = () => {
    // updateComment();
    setShowEditCommentDialog(false);
  };

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={e => {
              if (selectedComment) {
                setSelectedComment({ ...selectedComment, body: e.target.value });
              }
            }}
          />
          <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const PostDetailDialog = () => {
  const { searchQuery } = usePostQuery();
  const { showPostDetailDialog, setShowPostDetailDialog, selectedPost } = usePost();

  if (!selectedPost) return null;

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{renderHighlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{renderHighlightText(selectedPost?.body, searchQuery)}</p>
          <CommentList />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const UserDialog = () => {
  const { showUserModal, setShowUserModal, selectedUser } = useUser();

  return (
    <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <img
            src={selectedUser?.image}
            alt={selectedUser?.username}
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h3 className="text-xl font-semibold text-center">{selectedUser?.username}</h3>
          <div className="space-y-2">
            <p>
              <strong>이름:</strong> {selectedUser?.firstName || ""} {selectedUser?.lastName || ""}
            </p>
            <p>
              <strong>나이:</strong> {selectedUser?.age || ""}
            </p>
            <p>
              <strong>이메일:</strong> {selectedUser?.email || ""}
            </p>
            <p>
              <strong>전화번호:</strong> {selectedUser?.phone || ""}
            </p>
            <p>
              <strong>주소:</strong> {selectedUser?.address?.address || ""},{" "}
              {selectedUser?.address?.city || ""}, {selectedUser?.address?.state || ""}
            </p>
            <p>
              <strong>직장:</strong> {selectedUser?.company?.name || ""} -{" "}
              {selectedUser?.company?.title || ""}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface PostTableRowPropsType {
  post: PostType;
}

const PostTableRow = (props: PostTableRowPropsType) => {
  const { post } = props;

  const { setSelectedPost, setShowPostDetailDialog } = usePost();
  const { openUserModal } = useUser();

  const { updateParams, searchQuery, selectedTag } = usePostQuery();

  const handleOpenPostDetail = (post: PostType) => {
    setSelectedPost(post);
    useCommentListQuery(post.id);
    setShowPostDetailDialog(true);
  };

  const { deletePostMutation } = usePostMutations();

  const { setShowEditDialog } = usePost();

  const handleDeletePost = (id: number) => {
    deletePostMutation.mutate(id);
  };

  return (
    <TableRow>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>{renderHighlightText(post.title, searchQuery)}</div>

          <div className="flex flex-wrap gap-1">
            {(post?.tags || []).map((tag: string) => (
              <span
                key={tag}
                className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                  selectedTag === tag
                    ? "text-white bg-blue-500 hover:bg-blue-600"
                    : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                }`}
                onClick={() => {
                  updateParams({ tag: tag });
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => openUserModal(post.author?.id ?? 0)}
        >
          <img
            src={post.author?.image || ""}
            alt={post.author?.username || ""}
            className="w-8 h-8 rounded-full"
          />
          <span>{post.author?.username || ""}</span>
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
          <Button variant="ghost" size="sm" onClick={() => handleOpenPostDetail(post)}>
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
          <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

interface CommentPropsType {
  comment: CommentType;
}

const Comment = (props: CommentPropsType) => {
  const { comment } = props;

  const { searchQuery } = usePostQuery();
  const { setSelectedComment, setShowEditCommentDialog } = useComment();
  const { selectedUser } = useUser();

  const { postCommentLikeMutation, deleteCommentMutation } = useCommentMutations();

  const handleLikeComment = (comment: CommentType) => {
    postCommentLikeMutation.mutate(comment);
  };
  const handleDeleteComment = (comment: CommentType) => {
    deleteCommentMutation.mutate(comment);
  };

  return (
    <div className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{selectedUser?.username}:</span>
        <span className="truncate">{renderHighlightText(comment.body, searchQuery)}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={() => handleLikeComment(comment)}>
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{comment.likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedComment(comment);
            setShowEditCommentDialog(true);
          }}
        >
          <Edit2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => handleDeleteComment(comment)}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

// 댓글 렌더링
const CommentList = () => {
  const { selectedPost } = usePost();

  // const { searchQuery } = usePostQuery();

  const { commentList, setNewComment, setShowAddCommentDialog } = useComment();

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment(prev => ({ ...prev, postId: selectedPost?.id || 0 }));
            setShowAddCommentDialog(true);
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {(commentList || []).map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

// 게시물 테이블 렌더링
const PostTable = () => {
  const { data: postList, isLoading } = usePostQuery();

  console.log(postList);

  if (isLoading) return <div className="flex justify-center p-4">로딩 중...</div>;

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
        {(postList || []).map((post: PostType) => (
          <PostTableRow key={post.id} post={post} />
        ))}
      </TableBody>
    </Table>
  );
};

const SearchBar = () => {
  const { setSearchQuery, searchQuery, selectedTag, updateParams, sortBy, sortOrder } =
    usePostQuery();

  const { data: tagList } = useTagListQuery();

  return (
    <div className="flex gap-4">
      {/* 게시물 검색 */}
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyPress={e => e.key === "Enter" && setSearchQuery(e.currentTarget.value)}
          />
        </div>
      </div>

      <Select value={selectedTag} onValueChange={value => updateParams({ tag: value })}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {(tagList || []).map((tag: TagType) => (
            <SelectItem key={tag.url} value={tag.slug}>
              {tag.slug}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sortBy} onValueChange={value => updateParams({ sortBy: value })}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">없음</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="reactions">반응</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sortOrder} onValueChange={value => updateParams({ sortOrder: value })}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">오름차순</SelectItem>
          <SelectItem value="desc">내림차순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
