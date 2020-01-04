import React, { useState } from 'react'
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
} from './Home.styles'

import Modal from '../../components/Modal/Modal'
import Sidenav from '../../components/Sidenav/Sidenav'
import SearchSelect from './SearchSelect/SearchSelect'
import Paginator from './Paginator/Paginator'

import SubjectDetails from './SubjectDetails/SubjectDetails'
import Table from '../../components/Table/Table'

import { generateEmptyMatrix } from '../../library/utils'

import SubjectsContext from '../../context/subjects-context'
import SchedulesContext from '../../context/schedules-context'
import Banner from '../../components/Banner/Banner'

import $ from 'jquery'

const DEFAULT_EMPTY_SCHEDULE = {
  matrix: null,
  groups: [],
}

function Home() {
  const [currentPage, setCurrentPage] = useState(0)
  const [localSubjects, setLocalSubjects] = useState([])
  const [localSchedules, setLocalSchedules] = useState([])
  const [localMatrixTemplate, setLocalMatrixTemplate] = useState(null)
  const [localCurrentSchedule, setLocalCurrentSchedule] = useState(DEFAULT_EMPTY_SCHEDULE)

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

  const parseDay = day => {
    switch (day) {
      case 'M':
        return 0
      case 'T':
        return 1
      case 'W':
        return 2
      case 'R':
        return 3
      case 'F':
        return 4
      case 'S':
        return 5
      default:
        return 6
    }
  }

  const addToScheduleMatrix = (group, matrix) => {
    let days, start, end
    let newMatrix = [...matrix]
    for (let schedule of group.schedule) {
      days = schedule.day.split('')
      while (days.length) {
        start = Number(schedule.time.start.substring(0, 2))
        end = Number(schedule.time.end.substring(0, 2))
        for (let hour = start; hour < end; hour++) {
          if (newMatrix[parseDay(days[0])][hour - 6]) {
            return false
          }
          newMatrix[parseDay(days[0])][hour - 6] = group.subject.name
        }
        days.shift()
      }
    }
    return newMatrix
  }

  const generateSchedules = (
    newLocalSubjects = localSubjects,
    matrixTemplate = localMatrixTemplate,
  ) => {
    setLocalCurrentSchedule(DEFAULT_EMPTY_SCHEDULE)
    setCurrentPage(0)

    let totalGroups = [],
      newMatrix
    const schedules = []
    for (let subject of newLocalSubjects) {
      totalGroups = totalGroups.concat(subject.groups)
    }

    for (let i = 0; i < totalGroups.length; i++) {
      if (totalGroups[i].blocked) {
        continue
      }

      let subjectsIdsUsed = []
      let current = schedules.length ? false : true
      let schedule = {
        current,
        matrix: generateEmptyMatrix(matrixTemplate),
        groups: [],
      }

      newMatrix = addToScheduleMatrix(totalGroups[i], schedule.matrix)
      if (!newMatrix) {
        continue
      }
      schedule.matrix = newMatrix
      schedule.groups.push(totalGroups[i])
      subjectsIdsUsed.push(totalGroups[i].subject.id)

      for (let j = i + 1; j < totalGroups.length; j++) {
        if (totalGroups[j].blocked || subjectsIdsUsed.includes(totalGroups[j].subject.id)) {
          continue
        }
        newMatrix = addToScheduleMatrix(totalGroups[j], schedule.matrix)
        if (!newMatrix) {
          continue
        }
        schedule.matrix = newMatrix
        schedule.groups.push(totalGroups[j])
        subjectsIdsUsed.push(totalGroups[j].subject.id)
      }

      if (schedule.groups.length === newLocalSubjects.length) {
        if (current) setLocalCurrentSchedule(schedule)
        schedules.push(schedule)
      }
    }
    // console.log('CONFLICT-MATRIX', 'newLocalSubjects', newLocalSubjects)
    // console.log('CONFLICT-MATRIX', 'schedules', schedules)
    setLocalSchedules(schedules)
  }

  const handleReset = onClean => {
    $('.ui-selected').map((index, elem) => {
      elem.classList.remove('ui-selected')
    })
    onClean(null)
  }

  return (
    <SubjectsContext.Provider
      value={{
        subjects: localSubjects,
        addSubject: newSubject => {
          const newLocalSubjects = [...localSubjects, newSubject]
          setLocalSubjects(newLocalSubjects)
          generateSchedules(newLocalSubjects)
        },
        removeSubject: index => {
          localSubjects.splice(index, 1)
          generateSchedules()
        },
        updateGroupsStatus: (groups, blocked) => {
          groups.forEach(group => {
            group.blocked = blocked
          })
          generateSchedules()
        },
      }}
    >
      <SchedulesContext.Provider
        value={{
          schedules: localSchedules,
          currentSchedule: localCurrentSchedule,
          matrixTemplate: localMatrixTemplate,
          setCurrentSchedule: index => setLocalCurrentSchedule(localSchedules[index]),
          setMatrixTemplate: matrix => {
            setLocalMatrixTemplate(matrix)
            generateSchedules(localSubjects, matrix)
          },
        }}
      >
        <SubjectsContext.Consumer>
          {({ subjects }) => (
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
                      <SearchSelect />
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
                        <SearchSelect />
                        {/* <Select styles={{}} placeholder="Escribe la materia a buscar" options={options} /> */}
                      </Col>
                    </Row>
                  </SearchSection>
                  <MenuSection>
                    <SchedulesContext.Consumer>
                      {({ schedules, setCurrentSchedule, setMatrixTemplate }) => (
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
                                      <LinkuButton
                                        onClick={() => handleReset(setMatrixTemplate)}
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
                              <Table onStopSelecting={matrix => setMatrixTemplate(matrix)} />
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
