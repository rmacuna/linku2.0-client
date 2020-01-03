import React from 'react'
import { Card, Nrc, SubjectName, ProfessorName, Quotas, CloseIcon } from './Group.styles'
import PropTypes from 'prop-types'

const Group = props => {
  const {
    name,
    nrc,
    // professorName,
    quota,
  } = props
  console.log('name', name, 'nrc', nrc, 'quota', quota)
  return (
    <Card>
      <CloseIcon className="far fa-times-circle"></CloseIcon>
      <Nrc>{nrc}</Nrc>
      <SubjectName>{name}</SubjectName>
      {/* <ProfessorName>{professorName}</ProfessorName> */}
      <Quotas>{quota.free} Cupos</Quotas>
    </Card>
  )
}

Group.propTypes = {
  subjectName: PropTypes.string,
  nrc: PropTypes.string,
  // professorName: PropTypes.string,
  quota: PropTypes.string,
}

export default Group
