declare interface Position {
  lat: number
  lng: number
}

declare interface SearchRecord {
  placeFormalName: string
  position: Position
  time: Date
  timezone: string | null
  timezoneOffset: number | null
  checked: boolean
  deleted: boolean
}
