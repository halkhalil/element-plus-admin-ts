import {
  StrictUseAxiosReturn,
  UseAxiosReturn,
  useAxios as VueUseAxios
} from '@vueuse/integrations/useAxios'
import axios from "~/utils/axios";
import {AxiosInstance, AxiosRequestConfig} from "axios";
import {Ref, unref} from "vue";

interface UseAxiosOptions {
  immediate?: boolean;
}

function useAxios<T = any>(url: Ref<string> | string, config?: AxiosRequestConfig, options?: UseAxiosOptions): StrictUseAxiosReturn<T> & PromiseLike<StrictUseAxiosReturn<T>> {
  return VueUseAxios(unref(url), <AxiosRequestConfig>config, axios, options)
}

export {
  AxiosRequestConfig,
  UseAxiosOptions,
  AxiosInstance,
  // UseAxiosReturn,
  useAxios
}
