import { CardContent } from "@/shared/ui";
import { PostTable } from "@/widgets/post/ui/post-table";
import { useSearchPostList } from "@/features/post/model/use-search-post-list";
import PostListSearch from "@/features/post/ui/post-list-search";
import { Pagination } from "@/features/pagination/ui/pagination";

const BoardContent = () => {
  const { isLoading } = useSearchPostList();

  return (
    <CardContent>
      <div className="flex flex-col gap-4">
        <PostListSearch />
        {isLoading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}
        <Pagination />
      </div>
    </CardContent>
  );
};

export default BoardContent;
