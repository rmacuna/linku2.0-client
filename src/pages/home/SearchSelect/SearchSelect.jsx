import React from 'react'
import Select from 'react-select'
import { useQuery } from '@apollo/react-hooks'
import { GET_SUBJECTS_QUERY } from '../../../graphql/queries'

function SearchSelect() {
  const { loading, error, data, fetchMore } = useQuery(GET_SUBJECTS_QUERY)

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
    <Select
      className="link2-select"
      placeholder="Escribe la materia a buscar"
      options={options}
      onInputChange={val => {
        clearTimeout(delayTimer)
        if (val && val.length > 3) {
          search(val)
        }
      }}
      isClearable
      isSearchable
    />
  )
}
export default SearchSelect
