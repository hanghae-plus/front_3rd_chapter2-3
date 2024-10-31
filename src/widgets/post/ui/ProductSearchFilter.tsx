import FilterOrder from "@/features/filter/ui/FilterOrder";
import FilterSort from "@/features/filter/ui/FilterSort";
import FilterTag from "@/features/filter/ui/FilterTag";
import PostSearchInput from "@/features/post/ui/PostSearchInput";

const ProductSearchFilter = () => {
  return (
    <div className="flex gap-4">
      <PostSearchInput />
      <FilterTag />
      <FilterSort />
      <FilterOrder />
    </div>
  );
};

export default ProductSearchFilter;
