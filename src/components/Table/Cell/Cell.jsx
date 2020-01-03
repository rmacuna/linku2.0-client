import React from 'react'
import { createSelectable } from 'react-selectable-fast'
function Cell(props) {
  const { selectableRef, isSelected, isSelecting, children } = props
  const classNames = [
    'item',
    // DISABLED_CARD_YEARS.includes(year) && 'not-selectable',
    isSelecting && 'selecting',
    isSelected && 'selected',
  ]
    .filter()
    .join(' ')
  return (
    <td ref={selectableRef} classNames={classNames}>
      {children}
    </td>
  )
}

export default createSelectable(Cell)
