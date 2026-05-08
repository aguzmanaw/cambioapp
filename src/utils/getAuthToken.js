export const getAuthToken = () => {
  const result = sessionStorage.getItem("auth");

  if (!result) return;

  const {
    state: { accessToken },
  } = JSON.parse(result);

  return accessToken;
};
