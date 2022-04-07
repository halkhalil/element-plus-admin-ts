import {
  EasyUseAxiosReturn,
  StrictUseAxiosReturn,
  UseAxiosOptions,
  UseAxiosReturn,
  useAxios as VueUseAxios
} from '@vueuse/integrations/useAxios'
import axios from "~/utils/axios";
import {AxiosInstance, AxiosRequestConfig} from "axios";

export interface AxiosOptions extends AxiosRequestConfig, UseAxiosOptions {
  url: string;
}

function useAxios<T = any>(url: string, config?: AxiosRequestConfig, options?: UseAxiosOptions): StrictUseAxiosReturn<T> & PromiseLike<StrictUseAxiosReturn<T>> {
  return VueUseAxios(url, <AxiosRequestConfig>config, axios, options)
}

export {
  AxiosRequestConfig,
  UseAxiosOptions,
  AxiosInstance,
  UseAxiosReturn,
  EasyUseAxiosReturn,
  useAxios
}
