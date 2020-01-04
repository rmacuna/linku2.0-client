export const dayInterpreter = day => {
  let interpretedDay

  switch (day) {
    case 'M':
      interpretedDay = 'Lunes'
      break

    case 'T':
      interpretedDay = 'Martes'
      break

    case 'W':
      interpretedDay = 'Miércoles'
      break

    case 'R':
      interpretedDay = 'Jueves'
      break

    case 'F':
      interpretedDay = 'Viernes'
      break

    case 'S':
      interpretedDay = 'Sábado'
      break
    default:
      return 'nn'
  }

  return interpretedDay
}

// useMemo(() => {
//   return dayInterpreter(day)
// }, [day])
