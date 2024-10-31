import { useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/ui/Card';
import { Button } from '../shared/ui/Button/Button';
import { Plus } from 'lucide-react';
import { useAtom } from 'jotai';
import {
  skipAtom,
  limitAtom,
  searchQueryAtom,
  sortByAtom,
  sortOrderAtom,
  showAddDialogAtom,
  postsAtom,
} from '../entities/post/model/postAtom';
import { selectedTagAtom, tagsAtom } from '../entities/tag/model/tagAtom';
import { useLocation, useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../shared/ui/Select';
import PostsTable from '../features/post/ui/PostsTable';
import useTags from '../features/post/model/useTags.tsx';
import { FetchPostsParams } from '../entities/post/api/types.ts';
import PostDetailDialog from '../features/post/ui/PostDetailDialog.tsx';
import AddCommentDialog from '../features/comment/ui/AddCommentDialog.tsx';
import EditCommentDialog from '../features/comment/ui/EditCommentDialog.tsx';
import EditPostDialog from '../features/post/ui/EditPostDialog.tsx';
import AddPostDialog from '../features/post/ui/AddPostDialog.tsx';
import UserDetailDialog from '../features/user/ui/UserDetailDialog.tsx';
import SearchBar from '../widgets/post/SearchBar.tsx';
import usePosts from '../features/post/model/usePost.tsx';

const PostsManagerPage = () => {
  console.log('PostsManagerPage')
  const navigate = useNavigate();
  const location = useLocation();

  // Jotai 상태
  const [skip, setSkip] = useAtom(skipAtom);
  const [limit, setLimit] = useAtom(limitAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom);
  const [, setShowAddDialog] = useAtom(showAddDialogAtom);

  const [, setTags] = useAtom(tagsAtom);
  const [posts, setPosts] = useAtom(postsAtom);
  
  const params = {
    limit,
    skip,
    tag: selectedTag,
    search: searchQuery,
    sortBy,
    sortOrder,
  };

  const { data: postsData, isLoading: postsLoading } = usePosts(params);
  const { data: tagsData } = useTags();

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
    setSortOrder(params.get("sortOrder") as FetchPostsParams['sortOrder'] || "asc");
    setSelectedTag(params.get("tag") || "");
  }, [location.search, setLimit, setSearchQuery, setSelectedTag, setSkip, setSortBy, setSortOrder]);

  // 게시물 데이터 로드 성공 시 태그 설정
  useEffect(() => {
    if (postsData) {
      const uniqueTags = Array.from(new Set(postsData.flatMap(post => post.tags)));
      setPosts(postsData)
      setTags(uniqueTags);
    }
  }, [postsData, setPosts, setTags]);

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
              <SearchBar />
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
                {tagsData?.map((tag) => (
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
            <Select value={sortOrder} onValueChange={(value:'asc' | 'desc') => {
                  setSortOrder(value);
                }}>
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
            <PostsTable posts={posts} />
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
                disabled={skip + limit >= (postsData?.length || 0)}
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
      <AddPostDialog />

      {/* 게시물 수정 대화상자 */}
      <EditPostDialog />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog />
      
      <AddCommentDialog />
      <EditCommentDialog />

    
      {/* 사용자 모달 */}
      <UserDetailDialog />
    </Card>
  );
};

export default PostsManagerPage;