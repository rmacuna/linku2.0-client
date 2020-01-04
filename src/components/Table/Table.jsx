import React, { useEffect } from 'react'
import { GlobalStyle } from './Table.styles'
import { dataHeaders, tableRows } from './constants'
import SchedulesContext from '../../context/schedules-context'

import $ from 'jquery'
import 'jquery-ui/themes/base/core.css'
import 'jquery-ui/themes/base/theme.css'
import 'jquery-ui/themes/base/selectable.css'
import 'jquery-ui/ui/core'
import 'jquery-ui/ui/widgets/selectable'
import { interpretHour } from './utils'

const Table = () => {
  useEffect(() => {
    // $('#selectable').addClass('ola')
    $('#selectable').selectable({
      filter: 'td.ui-widget',
      selected: function (event, ui) {
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
    return header.map((key, index) => {
      return <th key={index}>{key.name.toUpperCase()}</th>
    })
  }

  const renderTableData = currentSchedule => {
    if (currentSchedule) {
      return tableRows.data.map((row, index) => {
        const { id, hour } = row
        return (
          <tr key={id}>
            <td>{hour}</td>
            <td className="ui-widget">
              {currentSchedule.matrix[0][index] === null ? '' : currentSchedule.matrix[0][index]}
            </td>
            <td className="ui-widget">
              {currentSchedule.matrix[1][index] === null ? '' : currentSchedule.matrix[1][index]}
            </td>
            <td className="ui-widget">
              {currentSchedule.matrix[2][index] === null ? '' : currentSchedule.matrix[2][index]}
            </td>
            <td className="ui-widget">
              {currentSchedule.matrix[3][index] === null ? '' : currentSchedule.matrix[3][index]}
            </td>
            <td className="ui-widget">
              {currentSchedule.matrix[4][index] === null ? '' : currentSchedule.matrix[4][index]}
            </td>
            <td className="ui-widget">
              {currentSchedule.matrix[5][index] === null ? '' : currentSchedule.matrix[5][index]}
            </td>
          </tr>
        )
      })
    } else {
      return tableRows.data.map((row, index) => {
        const { id, hour } = row
        return (
          <tr key={id}>
            <td>{hour}</td>
            <td className="ui-widget"></td>
            <td className="ui-widget"></td>
            <td className="ui-widget"></td>
            <td className="ui-widget"></td>
            <td className="ui-widget"></td>
            <td className="ui-widget"></td>
          </tr>
        )
      })
    }

    // return tableRows.data.map((row, index) => {
    //   const { id, hour } = row //destructuring
    //   // currentSchedule.matrix.map((cell, index) => {
    //   //   return (
    //   //     <td></td>
    //   //   )
    //   // })
    //   return (
    //     <tr key={id}>
    //       <td>{hour}</td>
    //       <td className="ui-widget">{
    //         currentSchedule.matrix.map((cell, index) => {
    //         })
    //       }</td>
    //       <td className="ui-widget">{name}</td>
    //       <td className="ui-widget">{name}</td>
    //       <td className="ui-widget">{name}</td>
    //       <td className="ui-widget">{name}</td>
    //       <td className="ui-widget">{name}</td>
    //     </tr>
    //   )
    // })
  }

  return (
    <SchedulesContext.Consumer>
      {({ currentSchedule }) => (
        <>
          <GlobalStyle />
          <table>
            <tbody id="selectable">
              <tr>{renderTableHeader()}</tr>
              {currentSchedule.matrix ? renderTableData(currentSchedule) : renderTableData()}
            </tbody>
          </table>
        </>
      )}
    </SchedulesContext.Consumer>
  )
}

export default Table
