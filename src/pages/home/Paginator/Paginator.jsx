import React from 'react'
import { NavigationArrows, ArrowLeft, ArrowRight, NumberContainer } from './Paginator.styles'

function Paginator(props) {
  const {
    currentPage,
    setCurrentPage,
    setCurrentSchedule,
    limit
  } = props

  const handleMove = (newPage) => {
    setCurrentPage(newPage)
    setCurrentSchedule(newPage)
  }

  return (
    <NavigationArrows>
      <ArrowLeft disabled={currentPage === 0 || limit === 0} onClick={() => handleMove(currentPage - 1)}>
        <i className="fas fa-angle-right"></i>
      </ArrowLeft>
      <NumberContainer value={limit ? currentPage + 1 : currentPage} readOnly />
      <ArrowRight disabled={currentPage === limit - 1 || limit === 0} onClick={() => handleMove(currentPage + 1)}>
        <i className="fas fa-angle-right"></i>
      </ArrowRight>
    </NavigationArrows>
  )
}

export default Paginator
