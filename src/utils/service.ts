import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

const handleErr = (error: any) => {
  const status = error.response.status
  switch (status) {
    case 400:
      error.message = '401 - bad request'
      break
    case 403:
      error.message = '403 - request forbidden'
      break
    case 404:
      error.message = '404 - not found'
      break
    case 500:
      error.message = '500 - internal server error'
      break
    case 502:
      error.message = '502 - bad gateway'
      break
  }
  return Promise.reject(error)
}

export function createService(handleResponse?: any, handleError: any = handleErr) {
  const service = axios.create()
  service.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  )
  service.interceptors.response.use(
    (response) => handleResponse(response),
    (error) => handleError(error)
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
