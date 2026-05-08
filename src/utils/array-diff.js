export const arrayDifference = (a, b) => {
  return a.filter((element) => {
    return !b.includes(element);
  });
};
