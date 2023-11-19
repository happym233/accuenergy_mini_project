import { createService, createRequest } from '@/utils/service'

const proxyurl = 'https://cors-anywhere.herokuapp.com/'
const googeMapApi = 'https://maps.googleapis.com/maps/api/'
const googleMapPlaceService = createService((response: any) => {
  const data = response.data
  const status = data.status
  switch (status) {
    //https://developers.google.com/maps/documentation/places/web-service/search-find-place
    case 'OK':
      return data.candidates[0]
    case 'ZERO_RESULTS':
      data.message = 'Place not found'
      return Promise.reject(data)
    case 'INVALID_REQUEST':
      data.message = 'Request is invalid'
      return Promise.reject(data)
    case 'OVER_QUERY_LIMIT':
      data.message = 'API usage out of limit'
      return Promise.reject(data)
    case 'REQUEST_DENIED':
      data.message = 'Request is denied'
      return Promise.reject(data)
  }
})
const googleMapRequest = createRequest(googleMapPlaceService, proxyurl + googeMapApi)

export const googleMapServices = {
  searchPlace: (placeName: string) => {
    return googleMapRequest({
      url: 'place/findplacefromtext/json',
      method: 'get',
      params: {
        fields: 'formatted_address,name,geometry',
        input: placeName,
        inputtype: 'textquery',
        key: process.env.VUE_APP_GOOGLE_MAP_API_KEY
      }
    })
  }
}
