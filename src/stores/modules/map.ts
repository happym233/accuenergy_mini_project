import { defineStore } from 'pinia'
import { onMounted, reactive, ref } from 'vue'
import { LocalStorage } from '@/utils/local-storage'

const defaultPageSize = 10
const numToPage = (dataNum: number, pageSize: number = defaultPageSize) => {
  return Math.floor((dataNum - 1) / pageSize) + 1
}

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
  const latestRecord = ref<SearchRecord | null>(null)

  onMounted(() => {
    const pastRecords = LocalStorage.getSearchRecords()
    if (pastRecords) records.value = pastRecords
  })

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
    latestRecord.value = newRecord
    LocalStorage.setSearchRecords(records.value)
  }

  const getMarkers = () => {
    const res: Position[] = []
    records.value.forEach((record) => {
      if (
        !record.deleted &&
        !res.find((e) => e.lat === record.position.lat && e.lng === record.position.lng)
      ) {
        res.push({
          lat: record.position.lat,
          lng: record.position.lng
        })
      }
    })
    if (
      center.zoom != 7 &&
      !res.find((e) => e.lat === center.position.lat && e.lng === center.position.lng)
    ) {
      res.push({
        lat: center.position.lat,
        lng: center.position.lng
      })
    }
    return res
  }

  const getAllRecords = () => {
    return records.value.filter((record) => !record.deleted)
  }

  const getPagedRecords = (pageRequest: PageRequest) => {
    const allRecords = getAllRecords()
    const dataSize = allRecords.length
    const totalPages = numToPage(allRecords.length, pageRequest.pageSize)
    if (totalPages != pageRequest.totalPages) pageRequest.currentPage = 1
    const pageStart = pageRequest.pageSize * (pageRequest.currentPage - 1)
    const pageToEnd = pageRequest.pageSize * pageRequest.currentPage
    const pageEnd = pageToEnd < dataSize ? pageToEnd : dataSize
    return {
      currentPage: pageRequest.currentPage,
      totalPages: totalPages,
      pageSize: pageRequest.pageSize,
      records: allRecords.slice(pageStart, pageEnd)
    } as PagedRecords
  }

  const getCheckedNumber = () => {
    return records.value.filter((record) => !record.deleted && record.checked).length
  }

  const deleteChecked = () => {
    LocalStorage.setSearchRecords(
      records.value.filter((record) => !record.deleted && !record.checked)
    )
    records.value
      .filter((record) => record.checked)
      .forEach((record) => {
        record.checked = false
        record.deleted = true
      })

    return getPagedRecords({
      currentPage: 1,
      totalPages: 1,
      pageSize: 10
    })
  }

  const isAllChecked = () => {
    return records.value.filter((record) => !record.deleted && !record.checked).length === 0
  }

  const allCheck = (v: boolean) => {
    records.value.filter((record) => (record.checked = v))
  }

  return {
    center,
    records,
    latestRecord,
    setCenter,
    setZoom,
    addNewRecord,
    getMarkers,
    getAllRecords,
    getPagedRecords,
    getCheckedNumber,
    deleteChecked,
    isAllChecked,
    allCheck
  }
})
