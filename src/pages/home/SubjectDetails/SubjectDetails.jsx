import React from 'react'
import {
  DetailsCard,
  SubjectTitle,
  Group,
  ProfessorTitle,
  CloseIcon,
} from './SubjectDetails.styles'

import BlockCheckbox from '../../../components/Checkbox/Checkbox'
import PropTypes from 'prop-types'

const handleCheck = e => {
  if (e.target.checked) {
    // ...Block the subject logic!
  }
}

const SubjectDetails = props => {
  const { subjectName, nrc, professor, groups } = props
  return (
    <DetailsCard>
      <CloseIcon className="fas fa-times" />
      <SubjectTitle>{subjectName}</SubjectTitle>
      <Group>
        <BlockCheckbox onChange={handleCheck} />
        <ProfessorTitle>{professor}</ProfessorTitle>
      </Group>
    </DetailsCard>
  )
}

SubjectDetails.propTypes = {
  subjectName: PropTypes.string,
  nrc: PropTypes.string,
  professor: PropTypes.string,
}

export default SubjectDetails
