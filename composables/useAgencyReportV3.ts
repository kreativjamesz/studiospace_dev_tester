import { ref } from "vue";
import axios from "axios";

const config = useRuntimeConfig();
const ENDPOINT = `${config.public.apiBaseUrl}/listings/list-agencies`;
const PAGE_SIZE = 12;
const REGIONS = ["AU", "GB", "US"];
const SERVICE_GROUPS = ["Advertising, Brand & Creative", "Media, PR & Events"];

// Define types
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
    const allAgencies: Agency[] = [];

    try {
      do {
        const response = await axios.get<ApiResponse>(ENDPOINT, {
          params: { skip },
        });

        // Ensure data and agencies exist
        if (!response.data || !response.data.agencies) {
          throw new Error("Unexpected API response format");
        }

        allAgencies.push(...response.data.agencies);
        total = response.data.total || 0;
        skip += PAGE_SIZE;
      } while (allAgencies.length < total);

      processAgencies(allAgencies);
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "An unknown error occurred.";
    } finally {
      isLoading.value = false;
    }
  };

  const processAgencies = (agencies: Agency[]): void => {
    const regionCounts: Record<Region, number> = {
      AU: 0,
      GB: 0,
      US: 0,
      Other: 0,
    };

    agencies.forEach((agency) => {
      const hasRelevantServices = agency.agencyService.some((service) =>
        SERVICE_GROUPS.includes(service.service.serviceGroup.name)
      );

      const regions = agency.locations
        .map((location) => location.country.code)
        .filter((code) => REGIONS.includes(code));

      if (regions.length === 0 || !hasRelevantServices) {
        regionCounts.Other += 1;
      } else {
        regions.forEach((region) => {
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
