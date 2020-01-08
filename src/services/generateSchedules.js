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
        if (newMatrix[parseDay(days[0])][hour - 6]
          || (matrixTemplate && matrixTemplate[parseDay(days[0])][hour - 6])) {
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
 * @returns {{ matrix: string[][], groups: Group }}
 */
const generateSchedules = (subjects, matrixTemplate, allowFullGroups) => {
  let groups = [], minSubjectsLength = subjects.length

  // for (let subject of subjects) {
  //   if (subject.groups.every(({ blocked }) => blocked)) {
  //     minSubjectsLength -= 1
  //     continue
  //   }
  //   groups = groups.concat(subject.groups)
  // }

  const schedules = []
  const groupKeys = new Set()
  let newMatrix, groupKey, groupsToCompare, index

  /*
  const subjects = [{ groups: [{ nrc: 1234 }, { nrc: 5678 }, { nrc: 2222 }, { nrc: 3333 }, { nrc: 4444 }, { nrc: 5555 }, { nrc: 6666 }] }, { groups: [{ nrc: 9101 }, { nrc: 1121 }, { nrc: 1129 }] }, { groups: [{ nrc: 5161 }, { nrc: 7181 }, { nrc: 9129 }] }];
  console.log(generateAllCombinations(subjects[0].groups, subjects))
  console.log(generateAllCombinations(subjects[0].groups, subjects).length)
  */
  // send current schedule as a input param 
  function generateAllCombinations(arrAcum, subjects, index = 1) {
    if (subjects.length === 1) {
      return subjects.groups;
    }
    if (index === subjects.length) {
      // push to schedules
      return arrAcum;
    }
    let arrToCompare = [...arrAcum]
    let newArrayToCompare = []
    for (let group of arrToCompare) {
      for (let groupTwo of subjects[index].groups) {
        // if (group.nrc !== null) -> create new schedule (first iteration)
        // add the first group to the schedule matrix and continue
        // get the newMatrix for the groupTwo and validate
        // newMatrix
        // adding groups
        newArrayToCompare.push((group.nrc ? group.nrc : group) + '-' + groupTwo.nrc);
      }
    }
    return generateAllCombinations(newArrayToCompare, subjects, index + 1);
  }

  /// [1,2,3,3,4,5]
  for (let group of groups) {
    if (group.blocked || (!allowFullGroups && group.quota.free === 0)) {
      continue
    }
    groupsToCompare = [...groups]
    while (groupsToCompare.length) {
      let subjectsIdsUsed = new Set()
      let schedule = {
        matrix: generateEmptyMatrix(),
        groups: [],
      }

      newMatrix = addToScheduleMatrix(group, schedule.matrix, matrixTemplate)
      if (!newMatrix) {
        break
      }
      schedule.matrix = newMatrix
      schedule.groups.push(group)
      subjectsIdsUsed.add(group.subject.id)

      if (groupsToCompare[0].nrc === group.nrc) {
        groupsToCompare.shift()
      }

      if (schedule.groups.length === minSubjectsLength) {
        groupsToCompare = []
      }

      // Search groups until complete a schedule
      index = 0
      while (groupsToCompare.length && index < groupsToCompare.length && schedule.groups.length < minSubjectsLength) {
        if (subjectsIdsUsed.has(groupsToCompare[index].subject.id)) {
          index++
        } else {
          if (groupsToCompare[index].nrc !== group.nrc
            && !groupsToCompare[index].blocked
            && (allowFullGroups || groupsToCompare[index].quota.free > 0)) {
            newMatrix = addToScheduleMatrix(groupsToCompare[index], schedule.matrix, matrixTemplate)
            if (newMatrix) {
              schedule.matrix = newMatrix
              schedule.groups.push(groupsToCompare[index])
              subjectsIdsUsed.add(groupsToCompare[index].subject.id)
            }
            groupsToCompare.splice(index, 1)
          }
          index++
        }
      }

      if (schedule.groups.length < minSubjectsLength) {
        break
      }

      schedule.groups.sort((a, b) => Number(b.nrc) - Number(a.nrc))
      groupKey = schedule.groups.reduce((a, b) => (a.nrc ? a.nrc : a) + b.nrc)

      if (!groupKeys.has(groupKey)) {
        schedules.push(schedule)
        groupKeys.add(groupKey)
      }
    }
  }
  // console.log('schedules', schedules.length)
  return schedules
}

export default generateSchedules;