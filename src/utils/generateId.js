export const generateId = (data) => {
  if (!Array.isArray(data)) return;

  const lastIndex = data.length ? data.length - 1 : 0;
  const { id } = data[lastIndex];
  const newId = id + 1;
  return newId;
};
