import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

export function createService(handleResponse?: any, handleErroe?: any) {
  const service = axios.create()
  service.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  )
  service.interceptors.response.use(
    (response) => handleResponse(response),
    (error) => handleErroe(error)
    /*{
      return Promise.reject(error)
    }*/
  )
  return service
}

export function createRequest(service: AxiosInstance, url: string) {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    const defaultConfig = {
      timeout: 5000,
      baseURL: url,
      data: {}
    }
    const mergeConfig = { ...defaultConfig, ...config }
    return service(mergeConfig)
  }
}
