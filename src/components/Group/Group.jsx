import React, { useState } from 'react'
import {
  Card,
  Nrc,
  SubjectName,
  ProfessorName,
  Quotas,
  CardBody,
  CloseIcon,
  CardHeader,
  CardFooter,
  ProfesorsGroup,
  ActionLink,
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

  let quotaNumber = parseInt(quota)

  let professorsNamesSplited = professorsNames.split(',')

  const [showProfesors, setShowProfesors] = useState(false)

  const showProfessors = () => {
    setShowProfesors(!showProfesors)
  }

  return (
    <Card>
      <CardHeader>
        <SubjectName>{name}</SubjectName>
      </CardHeader>
      <CardBody>
        <Nrc>{nrc}</Nrc>
        {professorsNamesSplited.length > 1 ? (
          <ProfessorName>{`${professorsNamesSplited[0]}, ${professorsNamesSplited[1]}`}</ProfessorName>
        ) : (
          <ProfessorName>{`${professorsNamesSplited[0]}`}</ProfessorName>
        )}
        {showProfesors ? <ProfesorsGroup>{professorsNames}</ProfesorsGroup> : null}
      </CardBody>
      <CardFooter>
        {professorsNamesSplited.length > 1 ? (
          <ActionLink onClick={showProfessors} color="#3D846A">
            {showProfesors ? 'Ocultar' : 'Ver'} profesores
          </ActionLink>
        ) : null}

        <Quotas full={quotaNumber < 10 ? true : false}>{quota} Cupos</Quotas>
      </CardFooter>
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
