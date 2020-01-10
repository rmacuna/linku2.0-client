import React, { useState } from 'react'
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
  // Hint,
  Professors,
  DetailsFooter,
} from './SubjectDetails.styles'

import BlockCheckbox from '../../../components/Checkbox/Checkbox'
import PropTypes from 'prop-types'

import SubjectsContext from '../../../context/subjects-context'
import { Row, Col } from 'react-flexbox-grid'

import { dayInterpreter } from './utils'

const SubjectDetails = props => {
  const { index, subjectName, groups } = props
  const [toggleProfessors, setToggleProfessors] = useState(new Array(groups.length).fill(false))
  const [toggleGroups, setToggleGroups] = useState(new Array(groups.length).fill(false))

  const handleToggleGroups = (index) => {
    const newToggleGroups = [...toggleGroups]
    newToggleGroups[index] = !toggleGroups[index]
    setToggleGroups(newToggleGroups)
  }

  const handleToggleProfessors = (index) => {
    const newToggleProfessors = [...toggleProfessors]
    newToggleProfessors[index] = !toggleProfessors[index]
    setToggleProfessors(newToggleProfessors)
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

  const parsedGroups = Array.from(hashMap).map(([professor, groups]) => ({
    professor,
    groups,
  }))

  return (
    <SubjectsContext.Consumer>
      {({ removeSubject, updateGroupsStatus }) => (
        <DetailsCard>
          <GlobalStyles />
          <DetailsHeader>
            <CloseIcon
              className="fas fa-times"
              onClick={() => removeSubject(index)}
            />
            <SubjectTitle>{subjectName}</SubjectTitle>
          </DetailsHeader>
          <DetailsBody>
            {parsedGroups.map(({ groups, professor }, index) => (
              <Group key={index}>
                <BlockCheckbox
                  checked={groups.every((elem) => elem.blocked)}
                  onChange={({ target }) => updateGroupsStatus(groups.map(({ nrc }) => nrc), target.checked)}
                />
                {/* <ProfessorTitle>{`${nrc} - ${group}`}</ProfessorTitle> */}
                <ActionsRow>
                  {professor.length > 1 ? (
                    <ProfessorTitle>{professor.split(',')[0]}</ProfessorTitle>
                  ) : (
                      <ProfessorTitle>{professor}</ProfessorTitle>
                    )}
                  <Row className="pd-bottom-10">
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <ActionLink
                        color="#0A397E"
                        onClick={() => handleToggleGroups(index)}
                      >
                        {toggleGroups[index] ? 'Ocultar grupos' : 'Ver grupos'}
                      </ActionLink>
                      {professor.includes(',') ? (
                        <ActionLink
                          color="#3D846A"
                          onClick={() => handleToggleProfessors(index)}
                        >
                          {toggleProfessors[index] ? 'Ocultar profesores' : 'Ver profesores'}
                        </ActionLink>
                      ) : null}
                    </Col>
                  </Row>
                  <Row>
                    {toggleGroups[index] && (
                      <Col xs={12} sm={12} md={12} lg={12}>
                        {groups.map((elem, index) => (
                          <Row key={index} start="xs" middle="xs">
                            <Col xs={2} sm={2} md={2} lg={2}>
                              <BlockCheckbox
                                small={true}
                                checked={elem.blocked}
                                onChange={({ target }) => updateGroupsStatus([elem.nrc], target.checked)}
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
                    )}
                  </Row>
                  {toggleProfessors[index] && (
                    <DetailsFooter>
                      <Professors className="professors_sub">{professor}</Professors>
                    </DetailsFooter>
                  )}
                </ActionsRow>
              </Group>
            ))}
          </DetailsBody>
        </DetailsCard>
      )}
    </SubjectsContext.Consumer>
  )
}

SubjectDetails.propTypes = {
  index: PropTypes.number.isRequired,
  subjectName: PropTypes.string,
  groups: PropTypes.arrayOf(PropTypes.shape({
    nrc: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    professors: PropTypes.arrayOf(PropTypes.string),
  })),
}

export default SubjectDetails
