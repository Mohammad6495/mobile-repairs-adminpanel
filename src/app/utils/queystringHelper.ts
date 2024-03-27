export const objectToQueryString = (obj) => {
  const entryIndexToKeyValueString = ([a, b]) => {
    return `${a}=${b}`
  }
  const entries = Object.entries(obj)
  let qs = '?'
  entries.forEach((arr, index) => {
    qs += (index > 0 ? '&' : '') + entryIndexToKeyValueString(arr)
  })

  return qs
}

export const locationSearchStringToObject = (str) => {
  if (typeof str !== 'string') return undefined
  if (!str) return undefined
  if (!str?.trim()) return undefined
  /////
  let queryString = str
  if (queryString.startsWith('?')) queryString = queryString.replace('?', '')
  if (queryString.length === 0) return undefined
  /////
  const queryArray = queryString.split('&').map((pair) => pair.split('='))
  /////
  const queryObject = Object.fromEntries(queryArray)
  /////
  return queryObject
}
