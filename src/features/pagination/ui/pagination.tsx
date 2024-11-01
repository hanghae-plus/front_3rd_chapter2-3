import { postListState } from "@/entities/post/model/post-state";
import { useSearchQuery } from "@/features/post/model/use-search-query";
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui";

export const Pagination = () => {
  const { total } = postListState();
  const { searchQuery, handleChangeQuery } = useSearchQuery();
  const { limit, skip } = searchQuery;
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={value => handleChangeQuery("limit", value)}>
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
          disabled={skip === "0"}
          onClick={() => handleChangeQuery("skip", Math.max(0, Number(skip) - Number(limit)) + "")}
        >
          이전
        </Button>
        <Button
          disabled={Number(skip) + Number(limit) >= total}
          onClick={() => handleChangeQuery("skip", Number(skip) + Number(limit) + "")}
        >
          다음
        </Button>
      </div>
    </div>
  );
};
