import React from 'react'
import {
  Card,
  Nrc,
  SubjectName,
  ProfessorName,
  Quotas,
  CloseIcon
} from './Group.styles'
import PropTypes from 'prop-types'

const Group = props => {
  const {
    name,
    nrc,
    professorsNames,
    // handleRemove,
    quota,
  } = props
  return (
    <Card>
      {/* <CloseIcon
        className="far fa-times-circle"
        onClick={handleRemove}
      /> */}
      <Nrc>{nrc}</Nrc>
      <SubjectName>{name}</SubjectName>
      <ProfessorName>{professorsNames}</ProfessorName>
      <Quotas>{quota} Cupos</Quotas>
    </Card>
  )
}

Group.propTypes = {
  subjectName: PropTypes.string,
  nrc: PropTypes.string,
  professorsNames: PropTypes.string,
  quota: PropTypes.number,
  // handleRemove: PropTypes.func.isRequired
}

export default Group
