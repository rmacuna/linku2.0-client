import React, { useRef } from 'react'
import ReactDOM from 'react-dom'

import Select from 'react-select'
import { useQuery } from '@apollo/react-hooks'
import { createGlobalStyle } from 'styled-components'

import { GET_SUBJECTS_QUERY, GET_SUBJECT_GROUPS } from '../../../graphql/queries'

import SubjectsContext from '../../../context/subjects-context'

const GlobalStyles = createGlobalStyle`
  .link2-select {
    font-size: 14px;
  }
`

function SearchSelect() {
  let delayTimer
  const { loading, error, data, fetchMore } = useQuery(GET_SUBJECTS_QUERY)
  const getSubjectsQuery = useQuery(GET_SUBJECT_GROUPS, { skip: true })
  const selectRef = useRef()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const { docs } = data.getSubjects

  const options = docs.map(subject => ({
    label: `${subject.name} (${subject.mat})`,
    value: subject,
  }))

  const search = val => {
    delayTimer = setTimeout(() => {
      if (document.activeElement === ReactDOM.findDOMNode(selectRef.current)) {
        fetchMore({
          variables: {
            search: val,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            return fetchMoreResult
          },
        })
      }
    }, 700)
  }

  return (
    <SubjectsContext.Consumer>
      {({ addSubject }) => (
        <>
          <GlobalStyles />
          <Select
            ref={selectRef}
            className="link2-select"
            placeholder="Escribe la materia a buscar"
            options={options}
            onInputChange={val => {
              clearTimeout(delayTimer)
              if (val.length > 3 || val.length === 0) {
                search(val)
              }
            }}
            onChange={async item => {
              if (item && item.value) {
                const { id, name, departmentName, mat } = item.value
                try {
                  const { data } = await getSubjectsQuery.refetch({
                    subjectId: id,
                  })
                  addSubject({
                    id,
                    name,
                    departmentName,
                    mat,
                    groups: data.getSubjectGroups.map((subject) => Object.assign(subject, {
                      blocked: false,
                    })),
                  })
                } catch (err) {
                  console.log('err', err)
                }
              }
            }}
            isClearable
            isSearchable
          />
        </>
      )}
    </SubjectsContext.Consumer>
  )
}

export default SearchSelect
