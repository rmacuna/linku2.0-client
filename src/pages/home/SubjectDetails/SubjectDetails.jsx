import React, { useState, useEffect } from 'react'
import {
  DetailsCard,
  SubjectTitle,
  Group,
  ProfessorTitle,
  CloseIcon,
  DetailsHeader,
  DetailsBody,
  ActionLink,
  ActionsRow,
  SubjectGroupDetail,
  GlobalStyles,
  Hint,
} from './SubjectDetails.styles'

import BlockCheckbox from '../../../components/Checkbox/Checkbox'
import PropTypes from 'prop-types'

import SubjectsContext from '../../../context/subjects-context'
import { Row, Col } from 'react-flexbox-grid'

import { dayInterpreter } from './utils'

const SubjectDetails = props => {
  const { id, subjectName, groups, subjectsCount, nrc } = props

  const [showProfessors, setshowProfessors] = useState(false)

  const [groupPopup, SetGroupPopup] = useState({
    actives: [],
  })

  useEffect(() => {
    SetGroupPopup({
      actives: new Array(subjectsCount).fill({
        id: nrc,
        toggledGroups: false,
        togglesProfessors: false,
      }),
    })
  }, [])

  const toggleShowMenu = nrc => {
    // let currentGroup = groupPopup.actives;
    // const elementToToggle = currentGroup.filter((element) => {
    //   return element.target === id
    // })
    // SetGroupPopup({
    //   actives = [...actives, elementToToggle[0].];
    // })
  }

  const showProfessorsHandler = () => {
    setshowProfessors(!showProfessors)
  }

  const hashMap = new Map()

  for (let group of groups) {
    const key = group.professors.join(', ')
    if (hashMap.has(key)) {
      hashMap.set(key, [...hashMap.get(key), group])
    } else {
      hashMap.set(key, [group])
    }
  }

  // SetGroupPopup({
  //   actives: new Array().fill(false)
  // })
  const parsedGroups = Array.from(hashMap).map(([professor, groups]) => ({
    professor,
    groups,
  }))

  console.log('GROUPS =>', groups, 'parsedGroups =>', parsedGroups)

  return (
    <SubjectsContext.Consumer>
      {({ removeSubject, updateGroupsStatus }) => (
        <DetailsCard>
          <GlobalStyles />
          <DetailsHeader>
            <CloseIcon
              className="fas fa-times"
              onClick={() => removeSubject(id)}
            />
            <SubjectTitle>{subjectName}</SubjectTitle>
          </DetailsHeader>
          <DetailsBody>
            {parsedGroups.map(({ groups, professor }, index) => (
              <Group key={index}>
                <BlockCheckbox
                  checked={groups.every((elem) => elem.blocked)}
                  onChange={({ target }) => updateGroupsStatus(groups, target.checked)}
                />
                {/* <ProfessorTitle>{`${nrc} - ${group}`}</ProfessorTitle> */}
                <ActionsRow>
                  {professor.length > 1 ? (
                    <ProfessorTitle>{professor.split(',').slice(0, 2)}</ProfessorTitle>
                  ) : (
                      <ProfessorTitle>{professor}</ProfessorTitle>
                    )}

                  <Row className="pd-bottom-10">
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <ActionLink onClick={toggleShowMenu(index)} color="#0A397E">
                        Ver grupos
                      </ActionLink>
                      {/* {professors.length > 2 ? (
                        <ActionLink onClick={showProfessorsHandler} color="#3D846A">
                          {showProfessors ? 'Ocultar profesores' : 'Ver profesores'}
                        </ActionLink>
                      ) : null} */}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      {groups.map((elem, index) => (
                        <Row key={index} start="xs" middle="xs">
                          <Col xs={2} sm={2} md={2} lg={2}>
                            <BlockCheckbox
                              small={true}
                              checked={elem.blocked}
                              onChange={({ target }) => updateGroupsStatus([elem], target.checked)}
                            />
                          </Col>
                          <Col xs={10} sm={10} md={10} lg={10}>
                            <SubjectGroupDetail>
                              {elem.schedule.map(({ time, day }, index) => (
                                <React.Fragment key={index}>
                                  <p className="day">{dayInterpreter(day)}</p>
                                  <p>{`${time.start} - ${time.end} `} </p>
                                </React.Fragment>
                              ))}
                            </SubjectGroupDetail>
                          </Col>
                        </Row>
                      ))}
                    </Col>
                  </Row>
                </ActionsRow>
              </Group>
            ))}
          </DetailsBody>
          {/* 
          <DetailsFooter>
            <Professors className="professors_sub">{professors.join(',')}</Professors>
          </DetailsFooter> */}
        </DetailsCard>
      )}
    </SubjectsContext.Consumer>
  )
}

SubjectDetails.propTypes = {
  id: PropTypes.string.isRequired,
  subjectName: PropTypes.string,
  groups: PropTypes.arrayOf(PropTypes.shape({
    nrc: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    professors: PropTypes.arrayOf(PropTypes.string),
  })),
}

export default SubjectDetails
