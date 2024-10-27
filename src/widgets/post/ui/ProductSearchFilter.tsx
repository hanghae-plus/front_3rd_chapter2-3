import FilterOrder from "@/features/filter/ui/FilterOrder";
import FilterSort from "@/features/filter/ui/FilterSort";
import FilterTags from "@/features/filter/ui/FilterTags";
import SearchInput from "@/features/search/ui/SearchInput";

const ProductSearchFilter = () => {
  return (
    <div className="flex gap-4">
      <SearchInput />
      <FilterTags />
      <FilterSort />
      <FilterOrder />
    </div>
  );
};

export default ProductSearchFilter;
