export const getUpdatedUrl = (keyList: string[], valueList: (string | number)[]) => {
  const params = new URLSearchParams();

  keyList.forEach((key, index) => {
    params.set(key, typeof valueList[index] === "number" ? valueList[index].toString() : valueList[index]);
  });

  return params.toString();
};
