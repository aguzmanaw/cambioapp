import { useEffect } from "react";
import { useJobsStore } from "../store/jobs";

export const useJobsData = () => {
  const jobs = useJobsStore((state) => state.jobs);
  const loading = useJobsStore((state) => state.loading);
  const getJobs = useJobsStore((state) => state.getJobs);

  useEffect(() => {
    getJobs();
  }, []);

  return {
    jobs,
    loading,
  };
};
