import { AllowedContentTypes } from "./constants";

export const checkResponseBolb = (response) => {
  let result = false;
  for (let entries of response.headers.entries()) {
    const [key, value] = entries;
    if (
      key === "content-type" &&
      Object.values(AllowedContentTypes).includes(value)
    ) {
      result = true;
      console.log(`Found...${value}`);
      break;
    }
  }
  return result;
};
