declare interface Position {
  lat: number
  lng: number
}

declare interface CenterPosition {
  position: Position
  zoom: number
}

declare interface SearchRecord {
  name?: string
  address?: string
  position: Position
  time: string
  timezone?: string
  timezoneOffset?: number
  checked: boolean
  deleted: boolean
}

declare interface PagedRecords {
  currentPage: number
  totalPages: number
  pageSize: number
  records: SearchRecord[]
}

declare interface PageRequest { 
  currentPage: number
  totalPages: number
  pageSize:number
}