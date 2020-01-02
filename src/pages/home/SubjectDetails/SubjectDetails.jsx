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

const handleCheck = e => {
  if (e.target.checked) {
    // ...Block the subject logic!
  }
}

const SubjectDetails = props => {
  const { subjectName, nrc, professor, groups } = props
  return (
    <DetailsCard>
      <DetailsHeader>
        <CloseIcon className="fas fa-times" />
        <SubjectTitle>{subjectName}</SubjectTitle>
      </DetailsHeader>
      <DetailsBody>
        <Group>
          <BlockCheckbox onChange={handleCheck} />
          <ProfessorTitle>{professor}</ProfessorTitle>
        </Group>
      </DetailsBody>
    </DetailsCard>
  )
}

SubjectDetails.propTypes = {
  subjectName: PropTypes.string,
  nrc: PropTypes.string,
  professor: PropTypes.string,
}

export default SubjectDetails
