export const generateEmptyMatrix = (matrixTemplate = null) => {
  const m = new Array(6)
  for (let j = 0; j < m.length; j++) {
    m[j] = new Array(15)
      .fill(null)
      .map((item, i) => matrixTemplate && matrixTemplate[j][i] ? matrixTemplate[j][i] : item)
  }
  return m
}