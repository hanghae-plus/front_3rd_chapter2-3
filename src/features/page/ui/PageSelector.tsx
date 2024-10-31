import { Selector } from "../../../shared/ui/Selector"
import { useRouterQueries } from "../../post/model/routerStore";

export const PageSelector = () => {

  const {
    limit,
    setLimit,
  } = useRouterQueries();

  return (
    <div className="flex items-center gap-2">
      <span>표시</span>
      <Selector
        value={limit.toString()}
        onValueChange={(value: string) => setLimit(Number(value))}
        placeHolder={"10"}
        optionItems={[
          { value: "10", text: "10" },
          { value: "20", text: "20" },
          { value: "30", text: "30" },
        ]}
      />
      <span>항목</span>
    </div>
  )
}
