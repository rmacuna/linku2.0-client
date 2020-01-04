import React, { useState } from 'react'
import { NavigationArrows, ArrowLeft, ArrowRight, NumberContainer } from './Paginator.styles'

function Paginator(props) {
  const { value, limit, moveFoward, moveBackward, setCurrent } = props

  // const [currentPage, setCurrentPage] = useState(1)

  const moveFowardPage = () => {
    moveFoward()
    setCurrent(value)
  }

  // const moveBackwardPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1)
  //     setCurrent(currentPage)
  //   }
  // }

  const handleMoveBackWard = () => {
    moveBackward()
    setCurrent(value)
  }

  return (
    <NavigationArrows>
      <ArrowLeft disabled={value === 1 || limit === 0} onClick={handleMoveBackWard}>
        <i className="fas fa-angle-right"></i>
      </ArrowLeft>
      <NumberContainer value={value} />
      <ArrowRight disabled={value === limit || limit === 0} onClick={moveFowardPage}>
        <i className="fas fa-angle-right"></i>
      </ArrowRight>
    </NavigationArrows>
  )
}

export default Paginator
