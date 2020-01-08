import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce-promise'

import AsyncSelect from 'react-select/async'
import { useQuery } from '@apollo/react-hooks'
import { createGlobalStyle } from 'styled-components'

import { GET_SUBJECTS_QUERY, GET_SUBJECT_GROUPS } from '../../../graphql/queries'

import SubjectsContext from '../../../context/subjects-context'

const GlobalStyles = createGlobalStyle`
  .link2-select {
    font-size: 14px;
  }
`

function SearchSelect(props) {
  const { setIsLoading } = props

  const { loading, error, data, fetchMore } = useQuery(GET_SUBJECTS_QUERY)
  const getSubjectsQuery = useQuery(GET_SUBJECT_GROUPS, { skip: true })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const { docs } = data.getSubjects

  const parseOptions = docs =>
    docs.map(subject => ({
      label: `${subject.name} (${subject.mat})`,
      value: subject,
    }))

  return (
    <SubjectsContext.Consumer>
      {({ subjects, addSubject }) => (
        <>
          <GlobalStyles />
          <AsyncSelect
            className="link2-select"
            placeholder="Escribe la materia a buscar"
            isClearable
            isSearchable
            cacheOptions
            defaultOptions={parseOptions(docs)}
            loadOptions={debounce(
              inputValue =>
                fetchMore({
                  variables: {
                    search: inputValue,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => fetchMoreResult,
                }).then(({ data }) => parseOptions(data.getSubjects.docs)),
              700,
            )}
            onChange={async item => {
              if (item && item.value) {
                setIsLoading(true)
                const { id, name, departmentName, mat } = item.value
                if (subjects.some(subject => subject.id === id)) {
                  setIsLoading(false)
                  return
                }
                try {
                  const { data } = await getSubjectsQuery.refetch({
                    subjectId: id,
                  })
                  // Temp fix parse NRC
                  const groups = data.getSubjectGroups

                  // Reduce schedule to first week for medicine schedules
                  let daysSet, parsedSchedule
                  for (let group of groups) {
                    if (group.schedule.length > 6) {
                      daysSet = new Set()
                      parsedSchedule = []
                      for (let schedule of group.schedule) {
                        if (!daysSet.has(schedule.day)) {
                          parsedSchedule.push(schedule)
                          daysSet.add(schedule.day)
                        }
                        if (parsedSchedule.length === 6) {
                          break
                        }
                      }
                      Object.assign(group, {
                        blocked: false,
                        schedule: parsedSchedule,
                      })
                    } else {
                      Object.assign(group, {
                        blocked: false,
                      })
                      // Group schedule repeated time in the same day
                      if (group.schedule > 2
                        && group.schedule[0].day === group.schedule[1].day
                        && group.schedule[0].time.start === group.schedule[1].time.start
                        && group.schedule[0].time.end === group.schedule[1].time.end) {
                        group.schedule.splice(0, 1)
                      }
                    }
                  }

                  addSubject({
                    id,
                    name,
                    departmentName,
                    mat,
                    groups,
                  })
                } catch (err) {
                  console.log('err', err)
                }
              }
            }}
          />
        </>
      )}
    </SubjectsContext.Consumer>
  )
}

SearchSelect.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
}

export default SearchSelect
