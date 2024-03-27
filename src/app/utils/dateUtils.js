export const convertDate = (date) => {
  let convertedDate = new Date(date).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  return convertedDate
}

export const convertFullDateAndTime = (
  date,
  options = {second: true, minute: true, hour: true}
) => {
  const coptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }
  if (options.minute) {
    coptions.minute = '2-digit'
  }
  if (options.second) {
    coptions.second = '2-digit'
  }
  if (options.second) {
    coptions.hour = '2-digit'
  }
  let convertedDate = new Date(date).toLocaleDateString('fa-IR', coptions)

  return convertedDate
}
