export const isEmptyObject = (obj) => {
  return obj instanceof Object && Object.entries(obj).length === 0;
};
