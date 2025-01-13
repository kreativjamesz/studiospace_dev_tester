import { ref } from "vue";
import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

interface UseAxiosReturn<T> {
  data: Ref<T | null>;
  error: Ref<string | null>;
  isLoading: Ref<boolean>;
  execute: (config?: AxiosRequestConfig) => Promise<AxiosResponse<T> | null>;
}

export const useAxios = <T>(
  defaultConfig?: AxiosRequestConfig
): UseAxiosReturn<T> => {
  const data = ref<T | null>(null) as Ref<T | null>;
  const error = ref<string | null>(null);
  const isLoading = ref(false);

  const execute = async (
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T> | null> => {
    isLoading.value = true;
    error.value = null;

    try {
      const mergedConfig = { ...defaultConfig, ...config };
      const response = await axios(mergedConfig);
      data.value = response.data;
      return response;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "An unknown error occurred";
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    data,
    error,
    isLoading,
    execute,
  };
};
