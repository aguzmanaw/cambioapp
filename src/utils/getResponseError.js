export const getResponseError = async (response) => {
  if (!(response instanceof Response)) {
    return;
  }
  if (response.ok) {
    return;
  }
  const { statusText, status } = response;

  const result = await response.json();

  const { message } = result;
  const text = message ? message : statusText;
  return {
    code: `Error (${status}) ${statusText}`,
    message: `${text}`,
  };
};
