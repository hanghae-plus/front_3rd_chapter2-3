export const findById = <T extends { id: number }>(items: T[], id: number): T | undefined => {
  return items.find((item) => item.id === id);
};

export const filterByID = <T extends { id: number }>(baseList: T[], id: number) => {
  return baseList.filter((c) => c.id !== id);
};

export const updateByID = <T extends { id: number }>(baseList: T[], base: T) => {
  return baseList.map((c) => (c.id === base.id ? base : c));
};

export const addItemInArray = <T>(baseList: T[], item: T, direction: "start" | "end" = "end") => {
  return direction === "start" ? [item, ...baseList] : [...baseList, item];
};
