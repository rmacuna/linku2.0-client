import React, { useState } from 'react'
import Select from 'react-select'
import { useQuery } from '@apollo/react-hooks'
import { createGlobalStyle } from 'styled-components'

import { GroupContext } from '../../../group-context'
import { GET_SUBJECTS_QUERY, GET_SUBJECT_GROUPS } from '../../../graphql/queries'

const GlobalStyles = createGlobalStyle`
  .link2-select {
    font-size: 14px;
  }
`

function SearchSelect(props) {
  const { setGroups } = props;

  const { loading, error, data, fetchMore } = useQuery(GET_SUBJECTS_QUERY)
  const getSubjectsQuery = useQuery(GET_SUBJECT_GROUPS, { skip: true })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const { docs } = data.getSubjects

  const options = docs.map(subject => ({
    label: `${subject.name} (${subject.code}${subject.number})`,
    value: subject.id,
  }))

  let delayTimer
  const search = val => {
    delayTimer = setTimeout(() => {
      fetchMore({
        variables: {
          search: val,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          return fetchMoreResult
        },
      })
    }, 700)
  }

  return (
    <>
      <GlobalStyles />
      <Select
        className="link2-select"
        placeholder="Escribe la materia a buscar"
        options={options}
        onInputChange={val => {
          clearTimeout(delayTimer)
          if (val.length > 3 || val.length === 0) {
            search(val)
          }
        }}
        onChange={async (item) => {
          if (item && item.value) {
            try {
              const { data } = await getSubjectsQuery.refetch({
                subjectId: item.value,
              })
              setGroups(data.getSubjectGroups)
            } catch (err) {
              console.log('err', err)
            }
          }
        }}
        isClearable
        isSearchable
      />
    </>
  )
}
export default SearchSelect
