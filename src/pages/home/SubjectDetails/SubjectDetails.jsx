import React from 'react'
import {
  DetailsCard,
  SubjectTitle,
  Group,
  ProfessorTitle,
  CloseIcon,
  DetailsHeader,
  DetailsBody,
} from './SubjectDetails.styles'

import BlockCheckbox from '../../../components/Checkbox/Checkbox'
import PropTypes from 'prop-types'

import SubjectsContext from '../../../context/subjects-context'

const SubjectDetails = props => {
  const { subjectId, subjectName, groups } = props
  console.log('subjectDetails groups', groups);
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
                  value={blocked}
                  onChange={({ target }) => {
                    updateGroupStatus(subjectId, id, target.checked);
                  }}
                />
                <ProfessorTitle>{`${nrc} - ${group}`}</ProfessorTitle>
              </Group>
            ))}
          </DetailsBody>
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
