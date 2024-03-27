// save item in localStorage
const setItem = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

// get an item from localStorage with its key
const getItem = (key: string): string => {
  if (localStorage.getItem(key)) return localStorage.getItem(key) ?? ''
  return ''
}

// remove specific item with its key from localStorage
const removeItem = (key: string) => {
  if (getItem(key) === '') return false
  localStorage.removeItem(key)
}

// cleare all localStorage of this site
const clearStorage = () => {
  localStorage.clear()
}

export {setItem, getItem, removeItem, clearStorage}
