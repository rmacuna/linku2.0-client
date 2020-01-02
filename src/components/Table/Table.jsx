import React from 'react'
import { GlobalStyle } from './Table.styles'
import { dataHeaders, dummyData } from './constants'

const Table = ({ columns, data }) => {
  // const [day, setday] = useState(initialState)

  const renderTableHeader = () => {
    let header = Object.values(dataHeaders.headers)
    console.log(header)
    return header.map((key, index) => {
      return <th key={index}>{key.name.toUpperCase()}</th>
    })
  }

  const renderTableData = () => {
    return dummyData.fakeData.map((row, index) => {
      const { id, hour, name } = row //destructuring
      return (
        <tr key={id}>
          <td>{hour}</td>
          <td>{name}</td>
          <td>{name}</td>
          <td>{name}</td>
          <td>{name}</td>
          <td>{name}</td>
          <td>{name}</td>
        </tr>
      )
    })
  }

  return (
    <>
      <GlobalStyle />
      <table id="students">
        <tbody>
          <tr>{renderTableHeader()}</tr>
          {renderTableData()}
        </tbody>
      </table>
    </>
  )
}

export default Table
