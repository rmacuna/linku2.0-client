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
import Subject from '../Subject/Subject'


function Sidenav(props) {
  const { show, toggleLeftSide, toggleModalHandler, groups } = props

  return (
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
            <ShowProfessorButton onClick={toggleModalHandler}>Ver Profesores </ShowProfessorButton>
          </Col>
        </Row>
      </Hidder>
      <ScrollArea active={show}>
        {groups.map(({ nrc, subject, quota, professors }) => (
          <Row key={nrc}>
            <Col xs={12} sm={12} md={12} lg={12}>
              <Subject
                nrc={nrc}
                subject={subject.name}
                name={professors.reduce((acum, { firstname, lastname }) => acum + `- ${firstname} ${lastname}`, '')}
                quotas={quota.free}
              />
            </Col>
          </Row>
        ))}
      </ScrollArea>
    </LeftNavigation>
  )
}

Sidenav.propTypes = {
  show: PropTypes.bool.isRequired,
  toggleLeftSide: PropTypes.func.isRequired,
}

export default Sidenav
