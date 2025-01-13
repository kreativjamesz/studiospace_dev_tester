import { storeToRefs } from "pinia";
import { useAgencyDataStore } from "@/stores/agencyDataStore";

export const useAgencyReport = () => {
  const store = useAgencyDataStore();
  const { report, isLoading, error } = storeToRefs(store);

  const fetchReport = async (): Promise<void> => {
    await store.fetchAgencies();
  };

  return {
    report,
    isLoading,
    error,
    fetchReport,
  };
};
