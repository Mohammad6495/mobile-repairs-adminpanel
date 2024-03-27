export const toFromData = (object) => {
  if (!object) return null
  if (Object.entries(object).length == 0) return null
  const fd = new FormData()
  Object.entries(object).forEach(([a, b]) => {
    fd.append(a.toString(), b.toString())
  })

  return fd
}
