import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle, SearchInput } from "../shared/ui";
import { PostDetailModal } from "../features/post-detail/ui/PostDetailModal";
import { PostTable } from "../widgets/PostTable";
import { UserModal } from "../features/user/ui/UserModal";
import { PostAddModal } from "../features/post-add/ui/PostAddModal";
import { Pagination } from "../features/post-pagination/ui/Pagination";
import { TagSelect } from "../features/post-filter/ui/TagSelect";
import { SelectSortStandard } from "../features/post-sort/ui/SelectSortStandard";
import { SelectSortOrder } from "../features/post-sort/ui/SelectSortOrder";
import { PostEditModal } from "../features/post-edit/ui/PostEditModal";
import { usePosts } from "../features/post/model/postStore";
import { usePostParams } from "../features/post/model/postParamsStore";
import { usePostQuery } from "../features/post/model/postQueryStore";

const PostsManager = () => {
  const [loading] = useState(false);
  const [searchQueryInput, setSearchQueryInput] = useState("");

  const { setShowAddDialog } = usePosts();
  const { skip, limit, searchQuery, setSearchQuery, sortBy, sortOrder, selectedTag, updateURL } = usePostParams();
  const { setActiveQuery } = usePostQuery();

  // 게시물 검색
  const searchPosts = () => {
    setActiveQuery("search");
    setSearchQuery(searchQueryInput);
  };

  useEffect(() => {
    updateURL();
  }, [skip, limit, sortBy, sortOrder, selectedTag, searchQuery, updateURL]);

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
            <SearchInput
              value={searchQueryInput}
              placeholder="게시물 검색..."
              onChange={(e) => setSearchQueryInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && searchPosts()}
            />
            <TagSelect />
            <SelectSortStandard />
            <SelectSortOrder />
          </div>
          {/* 게시물 테이블 */}
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}
          <Pagination />
        </div>
      </CardContent>
      <PostAddModal />
      <PostEditModal />
      <PostDetailModal />
      <UserModal />
    </Card>
  );
};

export default PostsManager;
