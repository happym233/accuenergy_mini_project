import { createService, createRequest } from '@/utils/service'

const proxyurl = 'https://cors-anywhere.herokuapp.com/'
const googeMapApi = 'https://maps.googleapis.com/maps/api/'
const googleMapPlaceService = createService((response: any) => {
  const responseData = response.data
  return responseData
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
