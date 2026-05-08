export const getValue = (element, key) => {
  return (typeof element === "object" ? element?.[key] : element) ?? null;
};
