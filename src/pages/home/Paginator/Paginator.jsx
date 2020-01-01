import React from 'react'
import { NavigationArrows, ArrowLeft, ArrowRight, NumberContainer } from './Paginator.styles'

function Paginator(props) {
  const { value } = props
  return (
    <NavigationArrows>
      <ArrowLeft>
        <i className="fas fa-angle-right"></i>
      </ArrowLeft>
      <NumberContainer value={value} />
      <ArrowRight>
        <i className="fas fa-angle-right"></i>
      </ArrowRight>
    </NavigationArrows>
  )
}

export default Paginator
