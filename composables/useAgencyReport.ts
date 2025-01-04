import { ref } from "vue";
import axios from "axios";

const ENDPOINT = "https://api.app.studiospace.com/listings/list-agencies";
const PAGE_SIZE = 12;
const REGIONS = ["AU", "GB", "US"];
const SERVICE_GROUPS = ["Advertising, Brand & Creative", "Media, PR & Events"];

type Region = "AU" | "GB" | "US" | "Other";

interface Location {
  country?: {
    code?: string;
  };
}

interface ServiceGroup {
  name?: string;
}

interface Service {
  service?: {
    serviceGroup?: ServiceGroup;
  };
}

interface Agency {
  id: string;
  companyName: string;
  locations: Location[];
  agencyService: Service[];
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

  const fetchAgencies = async (): Promise<Agency[]> => {
    let skip = 0;
    const agencies: Agency[] = [];

    try {
      while (true) {
        const { data } = await axios.get<[Agency[], number]>(ENDPOINT, {
          params: { skip },
        });
        const [batch, total] = data;

        if (!Array.isArray(batch)) {
          throw new Error(
            "Unexpected response format: agencies is not an array."
          );
        }

        agencies.push(...batch);
        if (agencies.length >= total) break;

        skip += PAGE_SIZE;
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = "An unknown error occurred while fetching agencies.";
      }
    }

    return agencies;
  };

  const generateReport = (agencies: Agency[]): void => {
    const regionCounts: Record<Region, number> = {
      AU: 0,
      GB: 0,
      US: 0,
      Other: 0,
    };

    agencies.forEach((agency) => {
      // Check if the agency has relevant services
      const hasRelevantServices = agency.agencyService.some((service) =>
        SERVICE_GROUPS.includes(service.service?.serviceGroup?.name || "")
      );

      // Determine the regions the agency belongs to
      const regions = agency.locations
        .map((location) => location.country?.code || "")
        .filter((code) => REGIONS.includes(code));

      if (!regions.length || !hasRelevantServices) {
        // No regions or no relevant services -> count as Other
        regionCounts.Other += 1;
      } else {
        // Increment counts for each matching region
        regions.forEach((region) => {
          regionCounts[region as Region] += 1;
        });
      }
    });

    report.value = regionCounts;
  };

  const fetchReport = async (): Promise<void> => {
    isLoading.value = true;
    error.value = null;

    try {
      const agencies = await fetchAgencies();
      generateReport(agencies);
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = "Failed to generate report.";
      }
    } finally {
      isLoading.value = false;
    }
  };

  return {
    report,
    isLoading,
    error,
    fetchReport,
  };
};
