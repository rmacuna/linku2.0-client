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

import SubjectsContext from '../../context/subjects-context'
import SchedulesContext from '../../context/schedules-context'

import $ from 'jquery'
import 'jquery-ui/themes/base/core.css'
import 'jquery-ui/themes/base/theme.css'
import 'jquery-ui/themes/base/selectable.css'
import 'jquery-ui/ui/core'
import 'jquery-ui/ui/widgets/selectable'

function Home() {
  const [localSubjects, setLocalSubjects] = useState([])
  const [localSchedules, setLocalSchedules] = useState([])
  const [localCurrentSchedule, setLocalCurrentSchedule] = useState({
    matrix: null,
    groups: []
  })

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

  const handleCleanFilter = () => {
    $()
  }

  const newMatrix = () => {
    const m = new Array(6);
    for (let i = 0; i < 6; i++) {
      m[i] = new Array(15).fill(null);
    }
    return m;
  }

  const parseDay = (day) => {
    switch (day) {
      case 'M':
        return 0;
      case 'T':
        return 1;
      case 'W':
        return 2;
      case 'R':
        return 3;
      case 'F':
        return 4;
      case 'S':
        return 5;
      default:
        return 6;
    }
  }

  const addToScheduleMatrix = (group, matrix, verify = false) => {
    let days, daysCopy, start, end
    for (let schedule of group.schedule) {
      days = schedule.day.split('')
      if (verify) {
        daysCopy = [...days]
        while (daysCopy.length) {
          start = Number(schedule.time.start.substring(0, 2))
          end = Number(schedule.time.end.substring(0, 2))
          for (let k = start; k <= end; k++) {
            // console.log('matrix', matrix, parseDay(daysCopy[0]), k - 6)
            if (matrix[parseDay(daysCopy[0])][k - 6]) return false
          }
          daysCopy.shift()
        }
      }
      while (days.length) {
        start = Number(schedule.time.start.substring(0, 2))
        end = Number(schedule.time.end.substring(0, 2))
        for (let k = start; k <= end; k++) {
          matrix[parseDay(days[0])][k - 6] = group.subject.name
        }
        days.shift()
      }
      // console.log('matrix', matrix)
      return true
    }
  }

  const generateSchedules = (newLocalSubjects) => {
    console.log('newLocalSubjects', newLocalSubjects)
    let totalGroups = []
    const schedules = []
    for (let subject of newLocalSubjects) {
      totalGroups = totalGroups.concat(subject.groups)
    }
    for (let i = 0; i < totalGroups.length; i++) {
      let subjectsIdsUsed = []
      let current = schedules.length ? false : true
      let schedule = {
        current,
        matrix: newMatrix(),
        groups: [],
      }
      // console.log('schedule.matrix', schedule.matrix)
      addToScheduleMatrix(totalGroups[i], schedule.matrix)
      schedule.groups.push(totalGroups[i])
      subjectsIdsUsed.push(totalGroups[i].subject.id)

      for (let j = i + 1; j < totalGroups.length; j++) {
        if (!subjectsIdsUsed.includes(totalGroups[j].subject.id)
          && addToScheduleMatrix(totalGroups[j], schedule.matrix, true)) {
          schedule.groups.push(totalGroups[j])
          subjectsIdsUsed.push(totalGroups[j].subject.id)
        }
      }
      if (current) setLocalCurrentSchedule(schedule)
      schedules.push(schedule)
    }
    console.log('schedules', schedules)
    setLocalSchedules(schedules)
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
        removeSubject: id => {
          const newLocalSubjects = localSubjects.filter((subject) => subject.id !== id)
          setLocalSubjects(newLocalSubjects)
          generateSchedules(newLocalSubjects)
        },
        updateGroupStatus: (subjectId, groupId, blocked) => {
          if (!localSubjects) return

          const subject = localSubjects.find(subject => subject.id === subjectId)
          if (!subject) return

          const group = subject.groups.find(group => group.id === groupId)
          if (!group) return

          group.blocked = blocked
        },
      }}
    >
      <SchedulesContext.Provider
        value={{
          schedules: localSchedules,
          currentSchedule: localCurrentSchedule,
          setCurrentSchedule: (index) => setLocalCurrentSchedule(localSubjects[index])
          // setSchedules: (schedules) => setLocalSchedules(schedules),
          // setCurrentGroups: groups => setLocalCurrentGroups(groups),
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
                    Si no quieres bloquear el profesor pero si un grupo, puedes hacerlo dandole click
                    a ver grupos y bloqueando el grupo específico que no quieres que te arme
                  </Hint>
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
                                <LinkuButton id="clean" onClick={handleCleanFilter} color="#DA8686">
                                  Limpiar filtro
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
                        <Table />
                      </Col>
                    </Row>
                  </MenuSection>
                </ContentArea>
              </FullWrapper>
            </>
          )}
        </SubjectsContext.Consumer>
      </SchedulesContext.Provider>
    </SubjectsContext.Provider>
  )
}

export default Home
