export const removeAuthToken = (item = "auth") => {
  const result = sessionStorage.getItem(item);

  if (!result) return;

  sessionStorage.removeItem(item);
};
