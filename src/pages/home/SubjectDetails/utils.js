export const dayInterpreter = (dayInput) => {
  let interpretedDay = ''
  const days = dayInput.split('')
  for (let day of days) {
    if (interpretedDay.length) {
      interpretedDay += ', '
    }
    switch (day) {
      case 'M':
        interpretedDay += 'Lunes'
        break
      case 'T':
        interpretedDay += 'Martes'
        break
      case 'W':
        interpretedDay += 'Miércoles'
        break
      case 'R':
        interpretedDay += 'Jueves'
        break
      case 'F':
        interpretedDay += 'Viernes'
        break
      case 'S':
        interpretedDay += 'Sábado'
        break
      default:
        return
    }
  }

  return interpretedDay
}