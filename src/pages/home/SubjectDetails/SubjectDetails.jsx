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
  Professors,
  DetailsFooter,
} from './SubjectDetails.styles'

import BlockCheckbox from '../../../components/Checkbox/Checkbox'
import PropTypes from 'prop-types'

import SubjectsContext from '../../../context/subjects-context'
import { Row, Col } from 'react-flexbox-grid'

const SubjectDetails = props => {
  const { subjectId, subjectName, groups } = props

  const [showProfessors, setshowProfessors] = useState(false)

  const showProfessorsHandler = () => {
    setshowProfessors(!showProfessors)
  }

  console.log('subjectDetails groups', groups)
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

  console.log('parsedGroups', parsedGroups)

  return (
    <SubjectsContext.Consumer>
      {({ updateGroupStatus }) => (
        <DetailsCard>
          <DetailsHeader>
            <CloseIcon className="fas fa-times" />
            <SubjectTitle>{subjectName}</SubjectTitle>
          </DetailsHeader>
          <DetailsBody>
            {groups.map(({ id, blocked, nrc, group, professors }) => (
              <Group key={nrc}>
                <BlockCheckbox
                  // checked={blocked}
                  onChange={({ target }) => {
                    updateGroupStatus(subjectId, id, target.checked)
                  }}
                />
                {/* <ProfessorTitle>{`${nrc} - ${group}`}</ProfessorTitle> */}
                <ActionsRow>
                  {professors.length > 1 ? (
                    <ProfessorTitle>{` ${professors[0]}, ${professors[1]} `}</ProfessorTitle>
                  ) : (
                      <ProfessorTitle>{` ${professors[0]}`}</ProfessorTitle>
                    )}

                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <ActionLink color="#0A397E">Ver grupos</ActionLink>
                      {professors.length > 2 ? (
                        <ActionLink onClick={showProfessorsHandler} color="#3D846A">
                          {showProfessors ? 'Ocultar profesores' : 'Ver profesores'}
                        </ActionLink>
                      ) : null}
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
  subjectName: PropTypes.string,
  groups: PropTypes.shape({
    nrc: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    professors: PropTypes.arrayOf(PropTypes.string),
  }),
}

export default SubjectDetails
