import React, { useState } from 'react'
import Modal from './modal/Modal'
import logo from '../../assets/logo.png'
import { Grid, Row, Col } from 'react-flexbox-grid'
import {
  ModalSubtitle,
  ModalTitle,
  GlobalStyle,
  ModalHeaderContainer,
  ModalBodyContainer,
  FullWrapper,
  ContentArea,
  LeftSideNavigation,
  RightSide,
  LeftSideTitle,
  ShowProfessorButton,
  Hidder,
  RetriveButton,
  ScrollArea,
} from './Home.styles'
import Select from 'react-select'

function Home() {
  const [modal, setModal] = useState({
    open: false,
  })

  const [leftSide, setLeftSide] = useState({
    active: true,
  })

  const toggleModalHandler = () => {
    setModal({
      open: !modal.open,
    })
  }

  const toggleLeftSide = () => {
    setLeftSide({
      active: !leftSide.active,
    })
  }

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]

  return (
    <>
      <GlobalStyle />
      <Modal onClose={toggleModalHandler} show={modal.open}>
        <ModalHeaderContainer>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <section>
                <ModalTitle>Estas son las materias que ingresaste</ModalTitle>
                <ModalSubtitle>¿Faltó alguna?</ModalSubtitle>
              </section>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Select
                className="link2-select"
                placeholder="Escribe la materia que estas buscando"
                options={options}
              />
            </Col>
          </Row>
        </ModalHeaderContainer>
        <ModalBodyContainer></ModalBodyContainer>
      </Modal>

      <FullWrapper>
        <LeftSideNavigation active={leftSide.active}>
          <RetriveButton active={leftSide.active} onClick={toggleLeftSide}>
            <i className="fas fa-angle-right"></i>
          </RetriveButton>
          <Row>
            <span className="with-separator"></span>
          </Row>
          <Hidder active={leftSide.active}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <img className="logo-app" src={logo} alt="Logo" />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <LeftSideTitle>Arma tu horario</LeftSideTitle>
                <ShowProfessorButton onClick={toggleModalHandler}>
                  Ver Profesores{' '}
                </ShowProfessorButton>
              </Col>
            </Row>
          </Hidder>

          <ScrollArea active={leftSide.active}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <p className="unselection">Todavia no has agregado materias</p>
              </Col>
            </Row>
          </ScrollArea>
        </LeftSideNavigation>
        <ContentArea active={leftSide.active}>
          <h1>Buscar</h1>
        </ContentArea>
      </FullWrapper>
    </>
  )
}

export default Home
