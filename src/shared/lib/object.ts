export const addItemInObject = <T>(
  baseList: Record<number, T[]>,
  item: Record<number, T[]>,
  direction: "start" | "end" = "end",
) => {
  return direction === "start" ? { ...item, ...baseList } : { ...baseList, ...item };
};
