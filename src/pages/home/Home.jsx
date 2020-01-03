import React, { useState, createRef } from 'react'
import { Row, Col } from 'react-flexbox-grid'

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

import SubjectDetails from './SubjectDetails/SubjectDetails'
import Table from '../../components/Table/Table'

import SubjectsContext from '../../context/subjects-context'

function Home() {
  const [localSubjects, setLocalSubjects] = useState([])
  const modalRef = createRef()

  const [modal, setModal] = useState({
    open: false,
  })

  const [leftSide, setLeftSide] = useState({
    active: true,
  })

  const toggleModalHandler = () => {
    if (modal.open === true) modalRef.current.focus()
    setTimeout(() => {
      setModal({
        open: !modal.open,
      })
    }, 50)
  }

  const toggleLeftSide = () => {
    setLeftSide({
      active: !leftSide.active,
    })
  }

  return (
    <SubjectsContext.Provider
      value={{
        subjects: localSubjects,
        addSubject: newSubject => {
          setLocalSubjects([...localSubjects, newSubject])
        },
        updateGroupStatus: (subjectId, groupId, blocked) => {
          if (!localSubjects) return
          console.log('localSubjects', localSubjects)

          const subject = localSubjects.find(subject => subject.id === subjectId)
          if (!subject) return
          console.log('subject', subject)

          const group = subject.groups.find(group => group.id === groupId)
          if (!group) return
          console.log('group', group)

          group.blocked = blocked
        },
      }}
    >
      <SubjectsContext.Consumer>
        {({ subjects }) => (
          <>
            <GlobalStyle />
            <Modal onClose={toggleModalHandler} show={modal.open}>
              <ModalHeaderContainer ref={modalRef}>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <section>
                      <ModalTitle>Estas son las materias que ingresaste</ModalTitle>
                      <ModalSubtitle>¿Faltó alguna?</ModalSubtitle>
                    </section>
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={6}>
                    <SearchSelect />
                  </Col>
                </Row>
              </ModalHeaderContainer>
              <ModalBodyContainer>
                <Row style={{ width: '100%' }}>
                  {subjects.map(({ id, mat, name, departmentName, groups }) => (
                    <Col key={id} xs={12} sm={4} md={4} lg={4}>
                      <SubjectDetails
                        subjectId={id}
                        nrc={groups.nrc}
                        subjectName={name}
                        groups={groups}
                      />
                    </Col>
                  ))}
                </Row>
              </ModalBodyContainer>
            </Modal>
            <FullWrapper>
              <Sidenav
                show={leftSide.active}
                toggleLeftSide={toggleLeftSide}
                toggleModalHandler={toggleModalHandler}
              />
              <ContentArea active={leftSide.active}>
                <SearchSection>
                  <Row>
                    <Col xs={12} sm={12} md={6} lg={6}>
                      <h1 className="search_title">Buscar</h1>
                      <SearchSelect />
                      {/* <Select styles={{}} placeholder="Escribe la materia a buscar" options={options} /> */}
                    </Col>
                  </Row>
                </SearchSection>

                <MenuSection>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Row middle="xs" start="xs">
                        <Col xs={2} sm={2} md={2} lg={2}>
                          <Paginator value={1} />
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2}>
                          <Indicator>
                            <p> 1 de 40 </p>
                          </Indicator>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8}>
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
                      <Table />
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
