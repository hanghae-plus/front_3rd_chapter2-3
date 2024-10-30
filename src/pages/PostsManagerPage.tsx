// src/pages/PostsManagerPage
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/ui/Card';
import { Button } from '../shared/ui/Button/Button';
import { Plus, Search } from 'lucide-react';
import { useAtom } from 'jotai';
import {
  skipAtom,
  limitAtom,
  searchQueryAtom,
  sortByAtom,
  sortOrderAtom,
  showAddDialogAtom,
} from '../entities/post/model/postAtom';
import { selectedTagAtom, tagsAtom } from '../entities/tag/model/tagAtom';
import { commentAtom } from '../entities/comment/model/commentAtom';
import { useLocation, useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../shared/ui/Select';
import PostsTable from '../features/post/ui/PostsTable';
import PostForm from '../features/post/ui/PostForm';
import PostDetail from '../features/post/ui/PostDeatil';
import { Textarea } from '../shared/ui/Textarea/Textarea';
import { highlightText } from '../shared/utils/index.tsx';
import usePosts from '../features/post/model/usePost';
import useComments from '../features/comment/model/useComments';
import usePostMutations from '../features/post/model/usePostMutations';
import useCommentMutations from '../features/comment/model/useCommentMutations';
import {
  Dialog,
  DialogContents,
  DialogHeader,
  DialogTitle,
} from "../shared/ui/Dialog";
import { Input } from "../shared/ui/InputBox/InputBox";
import CommentList from '../features/comment/ui/CommentList.tsx';
import { selectedUserAtom, showUserModalAtom } from '../entities/user/model/userAtom.ts';

const PostsManagerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Jotai 상태
  const [skip, setSkip] = useAtom(skipAtom);
  const [limit, setLimit] = useAtom(limitAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom);
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom);
  const [showUserModal, setShowUserModal] = useAtom(showUserModalAtom);
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom);

  const [tags, setTags] = useAtom(tagsAtom);
  const [comments, setComments] = useAtom(commentAtom);

  // React Query Hooks
  const { data: postsData, isLoading: postsLoading } = usePosts({ limit, skip, tag: selectedTag, search: searchQuery, sortBy, sortOrder });
  // const { data: tagsData, isLoading: tagsLoading } = usePosts({ limit: 0, skip: 0, tag: 'all', search: '', sortBy: '', sortOrder: 'asc' }); // fetchTags is handled in usePosts
  // const { data: usersData, isLoading: usersLoading } = usePosts({ limit: 0, skip: 0, tag: 'all', search: '', sortBy: '', sortOrder: 'asc' }); // fetchUsers is handled in usePosts

  // Mutations
  const postMutations = usePostMutations();
  const commentMutations = useCommentMutations();

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams();
    if (skip) params.set("skip", skip.toString());
    if (limit) params.set("limit", limit.toString());
    if (searchQuery) params.set("search", searchQuery);
    if (sortBy) params.set("sortBy", sortBy);
    if (sortOrder) params.set("sortOrder", sortOrder);
    if (selectedTag) params.set("tag", selectedTag);
    navigate(`?${params.toString()}`);
  };

  // URL 파라미터 동기화
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSkip(parseInt(params.get("skip") || "0"));
    setLimit(parseInt(params.get("limit") || "10"));
    setSearchQuery(params.get("search") || "");
    setSortBy(params.get("sortBy") || "");
    setSortOrder(params.get("sortOrder") || "asc");
    setSelectedTag(params.get("tag") || "");
  }, [location.search, setSkip, setLimit, setSearchQuery, setSortBy, setSortOrder, setSelectedTag]);
 
  // 게시물 데이터 로드 성공 시 태그 설정
  useEffect(() => {
    if (postsData) {
      const uniqueTags = Array.from(new Set(postsData.flatMap(post => post.tags)));
      setTags(uniqueTags);
    }
  }, [postsData, setTags]);

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
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="게시물 검색..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && updateURL()}
                />
              </div>
            </div>
            <Select
              value={selectedTag}
              onValueChange={(value) => {
                setSelectedTag(value);
                updateURL();
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="태그 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 태그</SelectItem>
                {tags.map((tag) => (
                  <SelectItem key={tag.url} value={tag.slug}>
                    {tag.slug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
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
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 순서" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">오름차순</SelectItem>
                <SelectItem value="desc">내림차순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 게시물 테이블 */}
          {postsLoading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostsTable
              posts={postsData}
            />
          )}

          {/* 페이지네이션 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              <Select
                value={limit.toString()}
                onValueChange={(value) => {
                  setLimit(Number(value));
                  updateURL();
                }}
              >
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
              <Button
                disabled={skip === 0}
                onClick={() => {
                  setSkip(Math.max(0, skip - limit));
                  updateURL();
                }}
              >
                이전
              </Button>
              <Button
                disabled={skip + limit >= (postsData?.total || 0)}
                onClick={() => {
                  setSkip(skip + limit);
                  updateURL();
                }}
              >
                다음
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContents>
          <DialogHeader>
            <DialogTitle>새 게시물 추가</DialogTitle>
          </DialogHeader>
          <PostForm />
        </DialogContents>
      </Dialog>

      {/* 게시물 수정 대화상자 */}
      <Dialog open={postMutations.updatePostMutation.isLoading || postMutations.addPostMutation.isLoading} onOpenChange={() => {}}>
        <DialogContents>
          <DialogHeader>
            <DialogTitle>게시물 {postMutations.updatePostMutation.isLoading ? '업데이트 중' : '추가 중'}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center p-4">처리 중...</div>
        </DialogContents>
      </Dialog>

      {/* 게시물 상세 보기 대화상자 */}
      <Dialog open={postMutations.showPostDetailDialog} onOpenChange={postMutations.setShowPostDetailDialog}>
        <DialogContents className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{highlightText(postMutations.selectedPost?.title, searchQuery)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText(postMutations.selectedPost?.body, searchQuery)}</p>
            {/* 댓글 렌더링 */}
            {/* <CommentList comments={comments[postMutations.selectedPost.id] || []} searchQuery={searchQuery} /> */}
          </div>
        </DialogContents>
      </Dialog>

      {/* 사용자 모달 */}
      <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <DialogContents>
          <DialogHeader>
            <DialogTitle>사용자 정보</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <img src={selectedUser?.image} alt={selectedUser?.username} className="w-24 h-24 rounded-full mx-auto" />
            <h3 className="text-xl font-semibold text-center">{selectedUser?.username}</h3>
            <div className="space-y-2">
              <p>
                <strong>이름:</strong> {selectedUser?.firstName} {selectedUser?.lastName}
              </p>
              <p>
                <strong>나이:</strong> {selectedUser?.age}
              </p>
              <p>
                <strong>이메일:</strong> {selectedUser?.email}
              </p>
              <p>
                <strong>전화번호:</strong> {selectedUser?.phone}
              </p>
              <p>
                <strong>주소:</strong> {selectedUser?.address?.address}, {selectedUser?.address?.city},{" "}
                {selectedUser?.address?.state}
              </p>
              <p>
                <strong>직장:</strong> {selectedUser?.company?.name} - {selectedUser?.company?.title}
              </p>
            </div>
          </div>
        </DialogContents>
      </Dialog>
    </Card>
  );
};

export default PostsManagerPage;