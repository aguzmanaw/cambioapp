export const getItemId = (object, itemName) => {
  const item = object.find((item) => item.name.includes(itemName.trim()));
  return item?.id;
};
