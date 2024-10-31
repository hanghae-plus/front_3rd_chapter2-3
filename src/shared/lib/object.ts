export const addItemInObject = <T>(
  baseList: Record<number, T[]>,
  item: Record<number, T[]>,
  direction: "start" | "end" = "end",
) => {
  return direction === "start" ? { ...item, ...baseList } : { ...baseList, ...item };
};

export const merge = <T>(base: T, key: keyof T, item: T[keyof T]) => {
  return {
    ...base,
    [key]: item,
  };
};

export const shallowMerge = <T>(base: T, item: T) => {
  return { ...base, ...item };
};
