import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useMapStore = defineStore('map', () => {
  const center = reactive<CenterPosition>({
    zoom: 7,
    //ottawa
    position: {
      lat: 45.4215,
      lng: -75.6972
    }
  })

  const records = ref<SearchRecord[]>([])

  const setCenter = (lat: number, lng: number) => {
    center.position.lat = lat
    center.position.lng = lng
  }

  const setZoom = (zoom: number) => {
    center.zoom = zoom
  }

  const addNewRecord = (newRecord: SearchRecord) => {
    setCenter(newRecord.position.lat, newRecord.position.lng)
    setZoom(14)
    records.value.unshift(newRecord)
  }

  const getMarkers = () => {
    const res: Position[] = []
    records.value.forEach((record) => {
      if (!res.find((e) => e.lat === record.position.lat && e.lng === record.position.lng)) {
        res.push({
          lat: record.position.lat,
          lng: record.position.lng
        })
      }
    })
    return res
  }

  return { center, setCenter, setZoom, addNewRecord, getMarkers }
})
