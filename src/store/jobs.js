import { create } from "zustand";
import { fetchJobs } from "../services/jobs";

export const useJobsStore = create(
  (set, get) => {
    return {
      loading: false,
      jobs: [],

      getJobs: async () => {
        set({ loading: true }, false, "FETCH_JOBS");
        let jobs = [];
        const prevJobs = get().jobs;
        if (prevJobs && prevJobs.length) jobs = prevJobs;
        else jobs = await fetchJobs();

        set({ jobs, loading: false }, false, "FETCH_JOBS");
      },
    };
  },
  {
    name: "jobs",
  }
);
