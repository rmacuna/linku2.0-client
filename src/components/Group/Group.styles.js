import styled from 'styled-components'

export const Card = styled.section`
  position: relative;
  /* width: 90%; */
  border-radius: 12px;
  background-color: #fff;
  min-height: 90px;
  margin-bottom: 10px;
`

export const CardHeader = styled.div`
  padding: 12px;
  border-bottom: 1px solid rgba(17, 65, 136, 11%);
`

export const CardBody = styled.div`
  padding-top: 13px;
  padding-bottom: 5px;
  padding-left: 12px;
  padding-right: 12px;
`

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
`
export const Nrc = styled.h4`
  font-size: 14px;
  color: rgba(17, 65, 136, 100%);
  font-weight: 600;
  margin: 0;
`
export const SubjectName = styled.h1`
  color: #000;
  font-size: 12px;
  font-weight: 700;
  margin: 5px 0;
`
export const ProfessorName = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin: 3px 0;
`

export const ProfesorsGroup = styled.p`
  font-size: 12px;
  margin: 5px 0;
  color: rgba(0, 0, 0, 0.4);
`

export const Quotas = styled.h6`
  margin: 0;
  font-size: 12px;
  color: ${props => (props.full ? '#da8686' : '#0A397E')};
`

export const CloseIcon = styled.i`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  margin: 20px;
`

export const ActionLink = styled.button`
  margin: 1px 0px;
  padding: 0;
  border: none;
  background: none;
  font-size: 12px;
  display: inline-flex;
  cursor: pointer;
  font-weight: 600;
  outline: none;
  color: ${props => (props.color ? props.color : '#000')};
`
