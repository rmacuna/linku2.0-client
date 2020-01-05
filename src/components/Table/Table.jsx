import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { GlobalStyle } from './Table.styles'
import { dataHeaders, tableRows } from './constants'
import { generateEmptyMatrix } from '../../library/utils'
import SchedulesContext from '../../context/schedules-context'

import $ from 'jquery'
import 'jquery-ui/themes/base/core.css'
import 'jquery-ui/themes/base/theme.css'
import 'jquery-ui/themes/base/selectable.css'
import 'jquery-ui/ui/core'
import 'jquery-ui/ui/widgets/selectable'

const EMPTY_MATRIX = generateEmptyMatrix()

const Table = props => {
  const { onStopSelecting } = props

  useEffect(() => {
    $('#selectable').selectable({
      filter: 'td.ui-widget',
      stop: () => {
        const matrix = EMPTY_MATRIX
        let rows, cells
        rows = $('#selectable')[0].rows
        for (let i = 1; i < rows.length; i++) {
          cells = rows[i].cells
          for (let j = 1; j < cells.length; j++) {
            matrix[j - 1][i - 1] = cells[j].className.includes('ui-selected') ? 'blocked' : null
          }
        }
        onStopSelecting(matrix)
      },
    })
  }, [onStopSelecting])

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
            {new Array(6).fill(null).map((_, pos) => (
              <td key={pos} className="ui-widget">
                {currentSchedule.matrix[pos][index] === null ||
                  currentSchedule.matrix[pos][index] === 'blocked'
                  ? ''
                  : currentSchedule.matrix[pos][index]}
              </td>
            ))}
          </tr>
        )
      })
    } else {
      return tableRows.data.map((row, index) => {
        const { id, hour } = row
        return (
          <tr key={id}>
            <td>{hour}</td>
            {new Array(6).fill(null).map((_, pos) => (
              <td key={pos} className="ui-widget" />
            ))}
          </tr>
        )
      })
    }
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

Table.propTypes = {
  onStopSelecting: PropTypes.func.isRequired,
}

export default Table
