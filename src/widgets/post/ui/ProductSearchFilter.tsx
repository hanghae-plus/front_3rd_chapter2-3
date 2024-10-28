import FilterOrder from "@/features/filter-order/ui/FilterOrder";
import FilterSort from "@/features/filter-sort/ui/FilterSort";
import FilterTag from "@/features/filter-tag/ui/FilterTag";
import SearchInput from "@/features/post-search/ui/SearchInput";

const ProductSearchFilter = () => {
  return (
    <div className="flex gap-4">
      <SearchInput />
      <FilterTag />
      <FilterSort />
      <FilterOrder />
    </div>
  );
};

export default ProductSearchFilter;
