import React from 'react'
import {
  LeftNavigation,
  ScrollArea,
  RetriveButton,
  ShowProfessorButton,
  Logo,
  LeftSideTitle,
  Hidder,
} from './Sidenav.styles'
import logo from '../../assets/logo.png'
import { Row, Col } from 'react-flexbox-grid'
import PropTypes from 'prop-types'
import Group from '../Group/Group'

import SchedulesContext from '../../context/schedules-context'

function Sidenav(props) {
  const { show, toggleLeftSide, toggleModalHandler } = props

  return (
    <SchedulesContext.Consumer>
      {({ currentSchedule }) => (
        <LeftNavigation active={show}>
          <RetriveButton active={show} onClick={toggleLeftSide}>
            <i className="fas fa-angle-right"></i>
          </RetriveButton>
          <Row>
            <span className="with-separator"></span>
          </Row>
          <Hidder active={show}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <Logo src={logo} alt="Logo" />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <LeftSideTitle>Arma tu horario</LeftSideTitle>
                <ShowProfessorButton onClick={toggleModalHandler}>
                  Establecer filtros{' '}
                </ShowProfessorButton>
              </Col>
            </Row>
          </Hidder>
          <ScrollArea active={show}>
            {currentSchedule.groups.map(({
              subject,
              nrc,
              group,
              quota,
            }) => (
                <Row key={nrc}>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Group
                      nrc={`${nrc} - ${group}`}
                      name={subject.name}
                      quota={quota}
                    />
                  </Col>
                </Row>
              ))}
          </ScrollArea>
        </LeftNavigation>
      )}
    </SchedulesContext.Consumer>
  )
}

Sidenav.propTypes = {
  show: PropTypes.bool.isRequired,
  toggleLeftSide: PropTypes.func.isRequired,
}

export default Sidenav
