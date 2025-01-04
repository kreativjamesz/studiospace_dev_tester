import { ref } from "vue";
import axios from "axios";

const API_BASE_URL = useRuntimeConfig().public.API_BASE_URL;
const ENDPOINT = `${API_BASE_URL}/listings/list-agencies`;
const PAGE_SIZE = 12;
const REGIONS = ["AU", "GB", "US"];
const SERVICE_GROUPS = ["Advertising, Brand & Creative", "Media, PR & Events"];

// Define the types
type Region = "AU" | "GB" | "US" | "Other";

interface Location {
  country: {
    code: string;
    name: string;
  };
}

interface ServiceGroup {
  id: number;
  name: string;
}

interface Service {
  service: {
    id: number;
    name: string;
    serviceGroup: ServiceGroup;
  };
}

interface Agency {
  id: string;
  companyName: string;
  locations: Location[];
  agencyService: Service[];
}

interface ApiResponse {
  agencies: Agency[];
  total: number;
}

export const useAgencyReport = () => {
  const report = ref<Record<Region, number>>({
    AU: 0,
    GB: 0,
    US: 0,
    Other: 0,
  });
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchReport = async (): Promise<void> => {
    isLoading.value = true;
    error.value = null;

    let skip = 0;
    let total = 0;
    let agencies: Agency[] = [];

    try {
      do {
        const { data } = await axios.get(ENDPOINT, { params: { skip } });
        agencies = agencies.concat(data.agencies || []);
        total = data.total || 0;
        skip += PAGE_SIZE;
      } while (agencies.length < total);

      processAgencies(agencies);
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = "Failed to fetch agencies.";
      }
    } finally {
      isLoading.value = false;
    }
  };

  const processAgencies = (agencies: any[]) => {
    const regionCounts: Record<Region, number> = {
      AU: 0,
      GB: 0,
      US: 0,
      Other: 0,
    };

    agencies.forEach((agency) => {
      const hasRelevantServices = agency.agencyService.some((service: any) =>
        SERVICE_GROUPS.includes(service.service.serviceGroup.name)
      );

      const regions = agency.locations
        .map((location: any) => location.country.code)
        .filter((code: string) => REGIONS.includes(code));

      if (regions.length === 0 || !hasRelevantServices) {
        regionCounts.Other += 1;
      } else {
        regions.forEach((region: string) => {
          if (region in regionCounts) {
            regionCounts[region as Region] += 1;
          } else {
            regionCounts.Other += 1;
          }
        });
      }
    });

    report.value = regionCounts;
  };

  return {
    report,
    isLoading,
    error,
    fetchReport,
  };
};
