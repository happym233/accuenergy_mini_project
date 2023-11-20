import { reactive } from 'vue'

const defaultPaginationData: PageRequest = {
  currentPage: 1,
  totalPages: 1,
  pageSize: 10
}

export function usePagination(initialPaginationData: PageRequest = defaultPaginationData) {
  const paginationData = reactive({ ...defaultPaginationData, ...initialPaginationData })

  const setCurrentPage = (currentPage: number) => {
    paginationData.currentPage = currentPage
  }

  const updatePageData = (records: PagedRecords) => {
    paginationData.currentPage = records.currentPage
    paginationData.totalPages = records.totalPages
    paginationData.pageSize = records.pageSize
  }

  return { paginationData, setCurrentPage, updatePageData }
}
