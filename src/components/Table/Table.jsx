import React, { useEffect } from 'react'
import { GlobalStyle } from './Table.styles'
import { dataHeaders, dummyData } from './constants'
// import $ from 'jquery'
import $ from 'jquery'
import 'jquery-ui/themes/base/core.css'
import 'jquery-ui/themes/base/theme.css'
import 'jquery-ui/themes/base/selectable.css'
import 'jquery-ui/ui/core'
import 'jquery-ui/ui/widgets/selectable'

const Table = () => {
  useEffect(() => {
    // $('#selectable').addClass('ola')
    $('#selectable').selectable({
      filter: 'td.ui-widget',
      selected: function(event, ui) {
        // Logic of conflix matrix goes here.
      },
    })

    $('#clean').on('click', () => {
      $('.ui-selected').map((index, elem) => {
        elem.classList.remove('ui-selected')
      })
    })
  }, [])
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
          <td className="ui-widget">{name}</td>
          <td className="ui-widget">{name}</td>
          <td className="ui-widget">{name}</td>
          <td className="ui-widget">{name}</td>
          <td className="ui-widget">{name}</td>
          <td className="ui-widget">{name}</td>
        </tr>
      )
    })
  }

  return (
    <>
      <GlobalStyle />
      <table>
        <tbody id="selectable">
          <tr>{renderTableHeader()}</tr>
          {renderTableData()}
        </tbody>
      </table>
    </>
  )
}

export default Table
