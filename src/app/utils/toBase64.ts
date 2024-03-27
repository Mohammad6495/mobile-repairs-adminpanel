export const toBase64 = (img: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(img)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject('')
  })
