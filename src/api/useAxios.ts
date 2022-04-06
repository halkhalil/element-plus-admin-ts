import {StrictUseAxiosReturn, useAxios as VueUseAxios, UseAxiosOptions} from '@vueuse/integrations/useAxios'
import axios from "~/utils/axios";
import {AxiosInstance, AxiosRequestConfig} from "axios";
import exp from "constants";

export interface AxiosOptions extends AxiosRequestConfig, UseAxiosOptions {
  url: string;
}

export function useAxios<T = any>(options: AxiosOptions): StrictUseAxiosReturn<T> & PromiseLike<StrictUseAxiosReturn<T>> {

  const {url, immediate, ...config} = options

  return VueUseAxios(url as string, config as AxiosRequestConfig, axios as AxiosInstance, {immediate} as UseAxiosOptions)
}
