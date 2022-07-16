export const convertHMS = (value, withLabel = false) => {
  const originalSeconds = parseInt(value, 10)
  let hours = Math.floor(originalSeconds / 3600)
  let minutes = Math.floor((originalSeconds - hours * 3600) / 60)
  let seconds = originalSeconds - hours * 3600 - minutes * 60
  if (hours < 10) {
    hours = '0' + hours
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  let output = ''
  if (hours !== '00') {
    output += `${hours} ${withLabel ? 'hours, ' : ':'} `
    output += `${minutes} ${withLabel ? 'minutes, ' : ':'} `
  }
  if (hours === '00' && minutes !== '00') {
    output += `${minutes} ${withLabel ? 'minutes, ' : ':'} `
  }
  output += `${seconds} ${withLabel ? 'seconds' : ''} `
  return output
}

export const mintuesToHoursAndMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  if (hours <= 0) {
    return `${minutes} min`
  }
  if (minutes <= 0 && hours > 0) {
    return `${hours} hr`
  }
  return `${hours} hr ${minutes} min`
}
