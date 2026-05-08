import { fetchBase } from "../utils/fetchBase";

const pathURL = "jobs";

export const fetchJobs = () => {
  return fetchBase({
    path: pathURL,
  });
};
