export const removeEmpty = (fields) => {
  const validFields = {};

  Object.keys(fields).forEach((key) => {
    if (fields[key] !== null && fields[key] !== undefined) {
      validFields[key] = fields[key];
    }
  });

  return validFields;
};
