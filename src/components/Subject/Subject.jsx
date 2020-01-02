import React from 'react'
import { Card, Nrc, SubjectName, ProfessorName, Quotas, CloseIcon } from './Subject.styles'
import PropTypes from 'prop-types'

const Subject = props => {
  const { mat, name, departmentName } = props
  return (
    <Card>
      <CloseIcon className="far fa-times-circle"></CloseIcon>
      <Nrc>{mat}</Nrc>
      <SubjectName>{name}</SubjectName>
      <ProfessorName>{departmentName}</ProfessorName>
      {/* <Quotas>{quotas} Cupos</Quotas> */}
    </Card>
  )
}

Subject.propTypes = {
  mat: PropTypes.string,
  name: PropTypes.string,
  departmentName: PropTypes.string,
  // quotas: PropTypes.number,
}

export default Subject
