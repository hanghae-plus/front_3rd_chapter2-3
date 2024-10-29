import FilterOrder from "@/features/filter/ui/FilterOrder";
import FilterSort from "@/features/filter/ui/FilterSort";
import FilterTag from "@/features/filter/ui/FilterTag";
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
