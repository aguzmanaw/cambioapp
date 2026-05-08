export const getSchemaError = (issues) => {
  if (!Array.isArray(issues)) return;

  const error = issues.length
    ? {
        code: issues[0].validation,
        message: issues[0].message,
      }
    : undefined;

  return error;
};
