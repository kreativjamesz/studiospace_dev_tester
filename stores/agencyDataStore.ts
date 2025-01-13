import { defineStore } from "pinia";
import { useAxios } from "@/composables/useAxios";
import type { Agency } from "@/types/agency"; // We'll create this type file next

type Region = "AU" | "GB" | "US" | "Other";
type RegionReport = Record<Region, number>;

interface AgencyState {
  agencies: Agency[];
  report: RegionReport;
  totalAgencies: number;
  isLoading: boolean;
  error: string | null;
}

const { API_BASE_URL } = useRuntimeConfig().public;
const PAGE_SIZE = 12;
const REGIONS = ["AU", "GB", "US"];
const SERVICE_GROUPS = ["Advertising, Brand & Creative", "Media, PR & Events"];

export const useAgencyDataStore = defineStore("agencyData", {
  state: (): AgencyState => ({
    agencies: [],
    report: {
      AU: 0,
      GB: 0,
      US: 0,
      Other: 0,
    },
    totalAgencies: 0,
    isLoading: false,
    error: null,
  }),

  getters: {
    getAgencyById: (state) => {
      return (id: string) => state.agencies.find((agency) => agency.id === id);
    },
    getReport: (state) => state.report,
    getTotalAgencies: (state) => state.totalAgencies,
  },

  actions: {
    async fetchAgencies() {
      const { execute, isLoading, error } = useAxios<[Agency[], number]>({
        baseURL: API_BASE_URL,
        method: "GET",
        url: "/listings/list-agencies",
      });

      this.isLoading = true;
      this.error = null;
      this.agencies = [];

      try {
        let skip = 0;

        while (true) {
          const response = await execute({ params: { skip } });
          if (!response) break;

          const [batch, total] = response.data;
          this.agencies.push(...batch);
          this.totalAgencies = total;

          if (this.agencies.length >= total) break;
          skip += PAGE_SIZE;
        }

        this.generateReport();
      } catch (err) {
        this.error =
          err instanceof Error ? err.message : "Failed to fetch agencies";
      } finally {
        this.isLoading = false;
      }
    },

    generateReport() {
      const regionCounts: RegionReport = {
        AU: 0,
        GB: 0,
        US: 0,
        Other: 0,
      };

      this.agencies.forEach((agency) => {
        const hasRelevantServices = agency.agencyService.some((service) =>
          SERVICE_GROUPS.includes(service.service?.serviceGroup?.name || "")
        );

        const regions = agency.locations
          .map((location) => location.country?.code || "")
          .filter((code) => REGIONS.includes(code));

        if (!regions.length || !hasRelevantServices) {
          regionCounts.Other += 1;
        } else {
          regions.forEach((region) => {
            regionCounts[region as Region] += 1;
          });
        }
      });

      this.report = regionCounts;
    },

    async createAgency(agencyData: Partial<Agency>) {
      const { execute, error } = useAxios<Agency>({
        baseURL: API_BASE_URL,
        method: "POST",
        url: "/listings/agencies",
      });

      try {
        const response = await execute({ data: agencyData });
        if (response) {
          this.agencies.push(response.data);
          this.generateReport();
        }
        return response;
      } catch (err) {
        this.error =
          err instanceof Error ? err.message : "Failed to create agency";
        return null;
      }
    },

    async updateAgency(id: string, agencyData: Partial<Agency>) {
      const { execute, error } = useAxios<Agency>({
        baseURL: API_BASE_URL,
        method: "PUT",
        url: `/listings/agencies/${id}`,
      });

      try {
        const response = await execute({ data: agencyData });
        if (response) {
          const index = this.agencies.findIndex((a) => a.id === id);
          if (index !== -1) {
            this.agencies[index] = response.data;
          }
          this.generateReport();
        }
        return response;
      } catch (err) {
        this.error =
          err instanceof Error ? err.message : "Failed to update agency";
        return null;
      }
    },

    async deleteAgency(id: string) {
      const { execute, error } = useAxios<void>({
        baseURL: API_BASE_URL,
        method: "DELETE",
        url: `/listings/agencies/${id}`,
      });

      try {
        const response = await execute();
        if (response) {
          this.agencies = this.agencies.filter((a) => a.id !== id);
          this.generateReport();
        }
        return response;
      } catch (err) {
        this.error =
          err instanceof Error ? err.message : "Failed to delete agency";
        return null;
      }
    },
  },
});
