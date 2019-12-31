import React, { useState } from 'react'
import Modal from './modal/Modal'
import { Grid, Row, Col } from 'react-flexbox-grid'
import {
  ModalSubtitle,
  ModalTitle,
  GlobalStyle,
  ModalHeaderContainer,
  ModalBodyContainer,
} from './Home.styles'
import Select from 'react-select'

function Home() {
  const [modal, setModal] = useState({
    open: false,
  })

  const toggleModalHandler = () => {
    setModal({
      open: !modal.open,
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

      <button onClick={toggleModalHandler}>Abrir modal</button>
    </>
  )
}

export default Home
