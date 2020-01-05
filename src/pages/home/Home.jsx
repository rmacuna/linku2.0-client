import React, { useState } from 'react'
import { Row, Col } from 'react-flexbox-grid'
import { useQuery } from '@apollo/react-hooks'

import { GET_SERVER_STATUS_QUERY } from '../../graphql/queries'

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
import Paginator from './Paginator/Paginator'

import SubjectDetails from './SubjectDetails/SubjectDetails'
import Table from '../../components/Table/Table'

import { generateEmptyMatrix } from '../../library/utils'

import SubjectsContext from '../../context/subjects-context'
import SchedulesContext from '../../context/schedules-context'
import Banner from '../../components/Banner/Banner'
import BlockCheckbox from '../../components/Checkbox/Checkbox'

import $ from 'jquery'

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
  const [localMatrixTemplate, setLocalMatrixTemplate] = useState(generateEmptyMatrix())
  const [localCurrentSchedule, setLocalCurrentSchedule] = useState(DEFAULT_EMPTY_SCHEDULE)

  const ServerStatus = () => {
    const { loading, error, data } = useQuery(GET_SERVER_STATUS_QUERY)
    if (loading || error) return null

    const { totalGroups, updatedAt } = data.getServerStatus;
    return (
      <span className="server_status">
        Última actualización: {new Date(updatedAt).toLocaleString()} - Grupos obtenidos: {totalGroups}
      </span>
    )
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

  const addToScheduleMatrix = (group, matrix, matrixTemplate) => {
    let days, start, end
    let newMatrix = [...matrix.map(elem => [...elem])]
    for (let schedule of group.schedule) {
      days = schedule.day.split('')
      while (days.length) {
        start = Number(schedule.time.start.substring(0, 2))
        end = Number(schedule.time.end.substring(0, 2))
        for (let hour = start; hour < end; hour++) {
          if (newMatrix[parseDay(days[0])][hour - 6]
            || (matrixTemplate && matrixTemplate[parseDay(days[0])][hour - 6])) {
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

    let groups = []
    for (let subject of newLocalSubjects) {
      groups = groups.concat(subject.groups)
    }

    const schedules = []
    const groupKeys = new Set()
    let newMatrix, groupKey, groupsToCompare

    for (let group of groups) {
      if (group.blocked || (!allowFullGroups && group.quota.free === 0)) {
        continue
      }
      groupsToCompare = [...groups]
      while (groupsToCompare.length) {
        let subjectsIdsUsed = new Set()
        let schedule = {
          matrix: generateEmptyMatrix(),
          groups: [],
        }

        newMatrix = addToScheduleMatrix(group, schedule.matrix, matrixTemplate)
        if (!newMatrix) {
          break
        }
        schedule.matrix = newMatrix
        schedule.groups.push(group)
        subjectsIdsUsed.add(group.subject.id)

        if (groupsToCompare[0].nrc === group.nrc) {
          groupsToCompare.shift()
        }

        if (schedule.groups.length === newLocalSubjects.length) {
          groupsToCompare = []
        }

        // Search groups until complete a schedule
        while (groupsToCompare.length && schedule.groups.length < newLocalSubjects.length) {
          if (groupsToCompare[0].nrc !== group.nrc
            && !groupsToCompare[0].blocked
            && !subjectsIdsUsed.has(groupsToCompare[0].subject.id)
            && (allowFullGroups || groupsToCompare[0].quota.free > 0)) {
            newMatrix = addToScheduleMatrix(groupsToCompare[0], schedule.matrix, matrixTemplate)
            if (newMatrix) {
              schedule.matrix = newMatrix
              schedule.groups.push(groupsToCompare[0])
              subjectsIdsUsed.add(groupsToCompare[0].subject.id)
            }
          }
          groupsToCompare.shift()
        }

        if (schedule.groups.length < newLocalSubjects.length) {
          break
        }

        schedule.groups.sort((a, b) => Number(b.nrc) - Number(a.nrc))
        groupKey = schedule.groups.reduce((a, b) => a.nrc + b.nrc)

        if (!groupKeys.has(groupKey)) {
          schedules.push(schedule)
          groupKeys.add(groupKey)
        }
      }
    }

    console.log('schedules', schedules.length)
    if (schedules.length) setLocalCurrentSchedule(schedules[0])
    setLocalSchedules(schedules)
    setIsLoading(false)
  }

  const handleReset = onClean => {
    $('.ui-selected').map((_, elem) => elem.classList.remove('ui-selected'))
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
                                      <AllowFullGroups>
                                        <BlockCheckbox
                                          checked={allowFullGroups}
                                          onChange={({ target }) => {
                                            setAllowFullGroups(target.checked)
                                            generateSchedules()
                                          }}
                                        />
                                        <span>Permitir cursos sin cupo</span>
                                      </AllowFullGroups>
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
