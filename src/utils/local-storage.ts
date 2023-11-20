import CacheKey from '@/constants/cache-key'

const getSearchRecords = () => {
  const json = localStorage.getItem(CacheKey.searchRecords)
  return json ? (JSON.parse(json) as SearchRecord[]) : null
}

const setSearchRecords = (records: SearchRecord[]) => {
  localStorage.setItem(CacheKey.searchRecords, JSON.stringify(records))
}

export const LocalStorage = { getSearchRecords, setSearchRecords }
