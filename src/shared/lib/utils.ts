export const mixinClasses = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};
