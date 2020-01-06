export const generateEmptyMatrix = () => {
  const m = new Array(7)
  for (let j = 0; j < m.length; j++) {
    m[j] = new Array(14).fill(null)
  }
  return m
}