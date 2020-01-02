import styled from 'styled-components'

export const Card = styled.section`
  position: relative;
  width: 90%;
  border-radius: 12px;
  background-color: #fff;
  padding: 16px 12px;
  min-height: 90px;
`

export const Nrc = styled.h4`
  font-size: 12px;
  color: rgba(17, 65, 136, 41%);
  font-weight: 600;
  margin: 0;
`
export const SubjectName = styled.h1`
  color: #000;
  font-size: 14px;
  font-weight: 700;
  margin: 5px 0;
`
export const ProfessorName = styled.p`
  font-size: 12px;
  font-weight: 400;
`

export const Quotas = styled.h6`
  font-size: 12px;
  margin: 0;
  color: ${props => (props.full ? '#03CC83' : '#DA8686')};
`

export const CloseIcon = styled.i`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  margin: 20px;
`
