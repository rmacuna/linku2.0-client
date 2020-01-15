/**
 * Generate schedules service
 * @version 1.0.0
 * @author sjdonado
 */

/**
 * @typedef Group
 * @property {string} nrc
 * @property {boolean} blocked
 * @property {{ id: string }} subject
 */

import { generateEmptyMatrix } from '../library/utils'

/**
 * Parse day to matrix column index
 * @param {string} day
 * @return {number}
 */
const parseDay = day => {
  switch (day) {
    case 'M':
      return 0
    case 'T':
      return 1
    case 'W':
      return 2
    case 'R':
      return 3
    case 'F':
      return 4
    case 'S':
      return 5
    default:
      return 6
  }
}

/**
 * Add to schedule matrix
 * @param {Group} group
 * @param {string[][]} matrix
 * @param {string[][]} matrixTemplate
 * @return {string[][]} Matrix filled by group schedule
 * @return {boolean} False if conflict is found
 */

const addToScheduleMatrix = (group, matrix, matrixTemplate) => {
  let days, start, end
  let newMatrix = [...matrix.map(elem => [...elem])]
  for (let schedule of group.schedule) {
    days = schedule.day.split('')
    while (days.length) {
      start = Number(schedule.time.start.substring(0, 2))
      end = Number(schedule.time.end.substring(0, 2))
      for (let hour = start; hour < end; hour++) {
        if (
          newMatrix[parseDay(days[0])][hour - 6] ||
          (matrixTemplate && matrixTemplate[parseDay(days[0])][hour - 6])
        ) {
          return false
        }
        newMatrix[parseDay(days[0])][hour - 6] = group.subject.name
      }
      days.shift()
    }
  }
  return newMatrix
}

/**
 * Generate schedules by subjects groups
 * @description Using at least one group of the supplied subjects and filtering by
 * each group restrictions will generate all possibles conflict matrices
 * @param {{ groups: Group }} subjects
 * @param {string[][]} matrixTemplate
 * @param {boolean} allowFullGroups
 * @returns {{ allCombinationsCount: number, schedules: [{ matrix: string[][], groups: Group }] }}
 */
const generateSchedules = (subjectsInput, matrixTemplate, allowFullGroups) => {
  let schedule, newMatrix, newSchedule, newSchedulesToCompare, allCombinationsCountInit
  const schedules = [],
    initSchedulesAcum = []

  const subjects = subjectsInput.filter(subject => !subject.groups.every(({ blocked }) => blocked))

  if (subjects.length === 0) return { allCombinationsCount: 0, schedules }

  allCombinationsCountInit = subjectsInput.reduce(
    (acum, subject) => acum + subject.groups.length,
    0,
  )

  for (const elem of subjects[0].groups) {
    if (!elem.blocked && (allowFullGroups || elem.quota.free > 0)) {
      schedule = { matrix: generateEmptyMatrix(), groups: [] }
      newMatrix = addToScheduleMatrix(elem, schedule.matrix, matrixTemplate)
      schedule.matrix = newMatrix
      if (schedule.matrix) {
        schedule.groups.push(elem)
        initSchedulesAcum.push(schedule)
      }
    }
  }

  // Compare each subject of initSubjectsAcum to the next subject groups
  // then store these combinations in a new subjectsAcum array
  function generateAllCombinations(schedulesAcum, subjectsIdx, schedule, allCombinationsCount) {
    if (subjects.length === 1 || subjectsIdx === subjects.length) {
      return { allCombinationsCount, schedules: schedulesAcum }
    }

    newSchedulesToCompare = []
    for (let i = 0; i < schedulesAcum.length; i++) {
      schedule = { ...schedulesAcum[i] }
      for (let groupTwo of subjects[subjectsIdx].groups) {
        newSchedule = {}
        if (!groupTwo.blocked && (allowFullGroups || groupTwo.quota.free > 0)) {
          const newMatrix = addToScheduleMatrix(groupTwo, schedule.matrix, matrixTemplate)
          if (newMatrix) {
            newSchedule.matrix = newMatrix
            newSchedule.groups = [...schedule.groups, groupTwo]
            newSchedulesToCompare.push(newSchedule)
          }
        }
        allCombinationsCount += 1
      }
    }
    return generateAllCombinations(
      newSchedulesToCompare,
      subjectsIdx + 1,
      newSchedule,
      allCombinationsCount,
    )
  }

  return generateAllCombinations(
    [...initSchedulesAcum],
    1,
    { matrix: generateEmptyMatrix(), groups: [] },
    allCombinationsCountInit,
  )
}

export default generateSchedules
