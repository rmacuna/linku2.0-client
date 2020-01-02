import React, { useState, useMemo } from 'react'
import { Row, Col } from 'react-flexbox-grid'
import Select from 'react-select'

import {
  ModalSubtitle,
  ModalTitle,
  GlobalStyle,
  ModalHeaderContainer,
  ModalBodyContainer,
  FullWrapper,
  ContentArea,
  SearchSection,
  MenuSection,
  Indicator,
  LinkuButton,
} from './Home.styles'

import Modal from '../../components/Modal/Modal'
import Sidenav from '../../components/Sidenav/Sidenav'
import SearchSelect from './SearchSelect/SearchSelect'
import Paginator from './Paginator/Paginator'

import { SubjectsContext } from '../../subjects-context'


function Home() {
  const [localSubjects, setLocalSubjects] = useState([]);

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
    <SubjectsContext.Provider value={{
      subjects: localSubjects,
      addSubject: (newSubject) => {
        setLocalSubjects([...localSubjects, newSubject])
      },
    }}>
      <SubjectsContext.Consumer>
        {({ subjects, addSubject }) => (
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
              <Sidenav
                show={leftSide.active}
                toggleLeftSide={toggleLeftSide}
                toggleModalHandler={toggleModalHandler}
                subjects={subjects}
              />
              <ContentArea active={leftSide.active}>
                <SearchSection>
                  <Row>
                    <Col xs={12} sm={12} md={6} lg={6}>
                      <h1 className="search_title">Buscar</h1>
                      <SearchSelect
                        addSubject={addSubject}
                      />
                      {/* <Select styles={{}} placeholder="Escribe la materia a buscar" options={options} /> */}
                    </Col>
                  </Row>
                </SearchSection>

                <MenuSection>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Row middle="xs" start="xs">
                        <Col xs={2} sm={2} sm={2} lg={2}>
                          <Paginator value={1} />
                        </Col>
                        <Col xs={2} sm={2} sm={2} lg={2}>
                          <Indicator>
                            <p> 1 de 40 </p>
                          </Indicator>
                        </Col>
                        <Col xs={8} sm={8} sm={8} lg={8}>
                          <Row end="xs">
                            <Col xs={12} sm={12} md={12} lg={12}>
                              <LinkuButton color="#DA8686">Limpiar filtro</LinkuButton>
                              <LinkuButton color="#114188">
                                <i className="fas fa-save"></i>
                                Guardar como pdf
                              </LinkuButton>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      {/* <Table columns={columns} data={data} /> */}
                    </Col>
                  </Row>
                </MenuSection>
              </ContentArea>
            </FullWrapper>
          </>
        )}
      </SubjectsContext.Consumer>
    </SubjectsContext.Provider>
  )
}

export default Home
