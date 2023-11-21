export function getCurrentTime() {
  const date: Date = new Date()
  const dateStr: string =
    ('00' + (date.getMonth() + 1)).slice(-2) +
    '/' +
    ('00' + date.getDate()).slice(-2) +
    '/' +
    date.getFullYear() +
    ' ' +
    ('00' + date.getHours()).slice(-2) +
    ':' +
    ('00' + date.getMinutes()).slice(-2) +
    ':' +
    ('00' + date.getSeconds()).slice(-2)
  return dateStr
}

export function getTimezoneTime(dstOffset: number, rawOffset: number) {
  const time = new Date().getTime() + dstOffset * 1000 + rawOffset * 1000
  const date = new Date(time)
  const dateStr: string =
    ('00' + (date.getUTCMonth() + 1)).slice(-2) +
    '/' +
    ('00' + date.getUTCDate()).slice(-2) +
    '/' +
    date.getUTCFullYear() +
    ' ' +
    ('00' + date.getUTCHours()).slice(-2) +
    ':' +
    ('00' + date.getUTCMinutes()).slice(-2) +
    ':' +
    ('00' + date.getUTCSeconds()).slice(-2)
  return dateStr
}
