export const dayInterpreter = day => {
  let interpretedDay

  switch (day) {
    case 'M':
      interpretedDay = 'Monday'
      break

    case 'T':
      interpretedDay = 'Tuesday'
      break

    case 'W':
      interpretedDay = 'Wednesday'
      break

    case 'R':
      interpretedDay = 'Thursday'
      break

    case 'F':
      interpretedDay = 'Friday'
      break

    case 'S':
      interpretedDay = 'Saturday'
      break
    default:
      return 'nn'
  }

  return interpretedDay
}

// useMemo(() => {
//   return dayInterpreter(day)
// }, [day])
