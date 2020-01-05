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
import * as jsPDF from 'jspdf'
import 'jspdf-autotable'
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

  const schedules = useMemo(
    () => generateSchedules(localSubjects, localMatrixTemplate, allowFullGroups),
    [localSubjects, localMatrixTemplate, allowFullGroups],
  )

  useEffect(() => {
    loadSchedules()
  })

  const handleSetLocalCurrentSchedule = schedule => {
    setLocalCurrentSchedule(schedule)
    setCurrentPage(0)
  }

  const loadSchedules = () => {
    if (schedules.length && schedules !== localSchedules) {
      handleSetLocalCurrentSchedule(schedules[0])
      setLocalSchedules(schedules)
      setIsLoading(false)
    }
    if (!schedules.length && localCurrentSchedule.matrix !== null) {
      handleSetLocalCurrentSchedule(DEFAULT_EMPTY_SCHEDULE)
      setLocalSchedules([])
      setIsLoading(false)
    }
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
  }

  const handleAllowGroups = value => {
    setAllowFullGroups(value)
  }

  const handleOnStopSelecting = matrix => {
    setLocalMatrixTemplate(matrix)
  }

  const handleSetCurrentSchedule = index => {
    setLocalCurrentSchedule(localSchedules[index])
  }

  const handlePDFSave = schedules => {
    // const input = document.getElementById('tablePrint')
    // html2canvas(input, {}).then(canvas => {
    // const imgData = canvas.toDataURL('image/png')
    console.log(localCurrentSchedule)
    const pdf = new jsPDF('l', 'pt', [1000, 750])

    pdf.autoTable({
      html: '#tablePrint',
      theme: 'grid',
      pageBreak: 'avoid',
      tableWidth: 'wrap',
      styles: {
        overflow: 'linebreak',
        columnWidth: 'wrap',
        halign: 'center',
        cellWidth: 125,
        fontSize: 7,
        columnStyles: {
          fontSize: 6,
        },
      },
    })
    // pdf.addHTML
    // pdf.addImage(imgData, 'PNG', 50, 20)
    const finalY = pdf.lastAutoTable.finalY
    pdf.setFontSize(14)
    localCurrentSchedule.groups.map((elem, index) => {
      pdf.text(
        40,
        finalY + (30 + 30 * index),
        `NRC: ${elem.nrc}, Profesor: ${elem.professors.join(',').substring(0, 40)}`,
      )
    })

    // localCurrentSchedule.groups[0].
    pdf.save('Schedule.pdf')

    // })
  }

  return (
    <SubjectsContext.Provider
      value={{
        subjects: localSubjects,
        addSubject: newSubject => {
          const newLocalSubjects = [...localSubjects, newSubject]
          setLocalSubjects(newLocalSubjects)
        },
        removeSubject: index => {
          const newLocalSubjects = [...localSubjects]
          newLocalSubjects.splice(index, 1)
          setLocalSubjects(newLocalSubjects)
        },
        updateGroupsStatus: (groupsNrcs, blocked) => {
          const newLocalSubjects = [...localSubjects]
          const subject = newLocalSubjects.find(subject =>
            subject.groups.some(({ nrc }) => nrc === groupsNrcs[0]),
          )
          if (subject) {
            Object.assign(subject, {
              groups: subject.groups.map(group => {
                if (groupsNrcs.includes(group.nrc)) {
                  return Object.assign(group, { blocked })
                }
                return group
              }),
            })
          }
          setLocalSubjects(newLocalSubjects)
        },
      }}
    >
      <SchedulesContext.Provider
        value={{
          currentSchedule: localCurrentSchedule,
          setCurrentSchedule: index => handleSetCurrentSchedule(index),
        }}
      >
        <>
          <GlobalStyle />
          {isLoading && (
            <ProgressBar>
              <div className="indeterminate" />
            </ProgressBar>
          )}
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
                {localSubjects.map(({ mat, name, departmentName, groups }, index) => (
                  <Col key={index} xs={12} sm={4} md={4} lg={4}>
                    <SubjectDetails
                      index={index}
                      nrc={groups.nrc}
                      subjectName={name}
                      groups={groups}
                      subjectsCount={localSubjects.length}
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
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Row middle="xs" start="xs">
                      <Col xs={2} sm={2} md={2} lg={2}>
                        <Paginator
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          setCurrentSchedule={handleSetCurrentSchedule}
                          limit={localSchedules.length}
                        />
                      </Col>
                      <Col xs={12} sm={12} md={2} lg={2}>
                        <Indicator>
                          <p>{`${localSchedules.length ? currentPage + 1 : currentPage} de ${
                            localSchedules.length
                          }`}</p>
                        </Indicator>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={8}>
                        <Row end="xs">
                          <Col xs={12} sm={12} md={12} lg={12}>
                            <AllowFullGroups>
                              <BlockCheckbox
                                small={true}
                                labelColor="rgba(0, 0, 0, .8)"
                                labelTitle="Permitir cursos sin cupo"
                                checked={allowFullGroups}
                                onChange={({ target }) => handleAllowGroups(target.checked)}
                              />
                              {/* <span>Permitir cursos sin cupo</span> */}
                            </AllowFullGroups>
                            <LinkuButton onClick={handleReset} color="#DA8686">
                              Limpiar filtro por horas
                            </LinkuButton>
                            <LinkuButton
                              onClick={() => handlePDFSave(localSchedules)}
                              color="#114188"
                            >
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
                    <Table id="tablePrint" onStopSelecting={handleOnStopSelecting} />
                    <ServerStatus />
                  </Col>
                </Row>
              </MenuSection>
            </ContentArea>
          </FullWrapper>
        </>
        )}
      </SchedulesContext.Provider>

      <Banner />
    </SubjectsContext.Provider>
  )
}

export default Home
