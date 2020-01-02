import React from 'react'
import { Card, Nrc, SubjectName, ProfessorName, Quotas, CloseIcon } from './Subject.styles'
import PropTypes from 'prop-types'

const Subject = props => {
  const { nrc, subject, name, quotas } = props
  return (
    <Card>
      <CloseIcon className="far fa-times-circle"></CloseIcon>
      <Nrc>{nrc}</Nrc>
      <SubjectName>{subject}</SubjectName>
      <ProfessorName>{name}</ProfessorName>
      <Quotas>{quotas} Cupos</Quotas>
    </Card>
  )
}

Subject.propTypes = {
  nrc: PropTypes.number,
  subject: PropTypes.string,
  name: PropTypes.string,
  quotas: PropTypes.number,
}

export default Subject
