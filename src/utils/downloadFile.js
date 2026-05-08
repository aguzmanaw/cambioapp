export const downloadFile = async ({ file, filename }) => {
  if (!file && !filename) return;

  let a = document.createElement("a");
  a.href = await URL.createObjectURL(file);
  a.setAttribute("download", filename || "");
  a.click();
};
