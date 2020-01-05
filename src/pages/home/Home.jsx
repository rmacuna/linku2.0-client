import React, { useState, useMemo, useEffect } from 'react'
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
  Hint,
  ProgressBar,
  AllowFullGroups,
} from './Home.styles'

import Modal from '../../components/Modal/Modal'
import Sidenav from '../../components/Sidenav/Sidenav'
import SearchSelect from './SearchSelect/SearchSelect'
import ServerStatus from './ServerStatus/ServerStatus'
import Paginator from './Paginator/Paginator'

import SubjectDetails from './SubjectDetails/SubjectDetails'
import Table from '../../components/Table/Table'

import { generateEmptyMatrix } from '../../library/utils'

import SubjectsContext from '../../context/subjects-context'
import SchedulesContext from '../../context/schedules-context'
import Banner from '../../components/Banner/Banner'
import BlockCheckbox from '../../components/Checkbox/Checkbox'

import generateSchedules from '../../services/generateSchedules'

import $ from 'jquery'

const EMPTY_MATRIX = generateEmptyMatrix()

const DEFAULT_EMPTY_SCHEDULE = {
  matrix: null,
  groups: [],
}

function Home() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [localSubjects, setLocalSubjects] = useState([])
  const [localSchedules, setLocalSchedules] = useState([])
  const [allowFullGroups, setAllowFullGroups] = useState(false)
  const [localMatrixTemplate, setLocalMatrixTemplate] = useState(EMPTY_MATRIX)
  const [localCurrentSchedule, setLocalCurrentSchedule] = useState(DEFAULT_EMPTY_SCHEDULE)

  // const schedules = useMemo(() => generateSchedules(localSubjects, localMatrixTemplate, allowFullGroups),
  //   [generateSchedules, localSubjects, localMatrixTemplate, allowFullGroups])

  // useEffect(() => {
  //   loadSchedules()
  // })

  const loadSchedules = (subjects = localSubjects, matrixTemplate = localMatrixTemplate) => {
    const schedules = generateSchedules(subjects, matrixTemplate, allowFullGroups)
    if (schedules.length) {
      setLocalCurrentSchedule(schedules[0])
      setLocalSchedules(schedules)
    } else {
      setLocalCurrentSchedule(DEFAULT_EMPTY_SCHEDULE)
      setCurrentPage(0)
    }
    setIsLoading(false)
  }

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

  const handleReset = () => {
    $('.ui-selected').map((_, elem) => elem.classList.remove('ui-selected'))
    setLocalMatrixTemplate(EMPTY_MATRIX)
    loadSchedules(localSubjects, null)
  }

  const handleAllowGroups = (value) => {
    setAllowFullGroups(value)
    loadSchedules()
  }

  const handleOnStopSelecting = (matrix) => {
    setLocalMatrixTemplate(matrix)
    loadSchedules(localSubjects, matrix)
  }

  return (
    <SubjectsContext.Provider
      value={{
        subjects: localSubjects,
        addSubject: newSubject => {
          const newLocalSubjects = [...localSubjects, newSubject]
          setLocalSubjects(newLocalSubjects)
          loadSchedules(newLocalSubjects)
        },
        removeSubject: index => {
          localSubjects.splice(index, 1)
          loadSchedules()
        },
        updateGroupsStatus: (groups, blocked) => {
          groups.forEach(group => {
            group.blocked = blocked
          })
          loadSchedules()
        },
      }}
    >
      <SchedulesContext.Provider
        value={{
          schedules: localSchedules,
          currentSchedule: localCurrentSchedule,
          setCurrentSchedule: index => setLocalCurrentSchedule(localSchedules[index]),
        }}
      >
        <SubjectsContext.Consumer>
          {({ subjects }) => (
            <>
              <GlobalStyle />
              {isLoading && <ProgressBar><div className="indeterminate" /></ProgressBar>}
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
                      <SearchSelect setIsLoading={setIsLoading} />
                    </Col>
                  </Row>
                  <Hint>
                    Si no quieres bloquear el profesor pero si un grupo dale click a ver grupos
                  </Hint>
                </ModalHeaderContainer>
                <ModalBodyContainer>
                  <Row style={{ width: '100%' }}>
                    {subjects.map(({ mat, name, departmentName, groups }, index) => (
                      <Col key={index} xs={12} sm={4} md={4} lg={4}>
                        <SubjectDetails
                          index={index}
                          nrc={groups.nrc}
                          subjectName={name}
                          groups={groups}
                          subjectsCount={subjects.length}
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
                        <SearchSelect setIsLoading={setIsLoading} />
                      </Col>
                    </Row>
                  </SearchSection>
                  <MenuSection>
                    <SchedulesContext.Consumer>
                      {({ schedules, setCurrentSchedule }) => (
                        <React.Fragment key="schedule">
                          <Row>
                            <Col xs={12} sm={12} md={12} lg={12}>
                              <Row middle="xs" start="xs">
                                <Col xs={2} sm={2} md={2} lg={2}>
                                  <Paginator
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    setCurrentSchedule={setCurrentSchedule}
                                    limit={schedules.length}
                                  />
                                </Col>
                                <Col xs={2} sm={2} md={2} lg={2}>
                                  <Indicator>
                                    <p>{`${schedules.length ? currentPage + 1 : currentPage} de ${
                                      schedules.length
                                      }`}</p>
                                  </Indicator>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8}>
                                  <Row end="xs">
                                    <Col xs={12} sm={12} md={12} lg={12}>
                                      <AllowFullGroups>
                                        <BlockCheckbox
                                          checked={allowFullGroups}
                                          onChange={({ target }) => handleAllowGroups(target.checked)}
                                        />
                                        <span>Permitir cursos sin cupo</span>
                                      </AllowFullGroups>
                                      <LinkuButton
                                        onClick={handleReset}
                                        color="#DA8686"
                                      >
                                        Limpiar filtro por horas
                                      </LinkuButton>
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
                              <Table onStopSelecting={handleOnStopSelecting} />
                              <ServerStatus />
                            </Col>
                          </Row>
                        </React.Fragment>
                      )}
                    </SchedulesContext.Consumer>
                  </MenuSection>
                </ContentArea>
              </FullWrapper>
            </>
          )}
        </SubjectsContext.Consumer>
      </SchedulesContext.Provider>
      <Banner />
    </SubjectsContext.Provider>
  )
}

export default Home
