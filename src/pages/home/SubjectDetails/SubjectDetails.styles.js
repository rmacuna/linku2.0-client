import styled from 'styled-components'
import Checkbox from '../../../components/Checkbox/Checkbox'

export const DetailsCard = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: 80px;
  height: auto;
  max-height: 400px;
  overflow-y: scroll;
  background-color: #fff;
  border-radius: 6px;
  /* padding: 16px 9px; */
  padding-top: 5px;
  border: 1px solid rgba(10, 57, 126, 10%);
`

export const DetailsHeader = styled.div`
  padding: 5px 9px;
  border-bottom: 1px solid rgba(17, 65, 136, 17%);
`

export const DetailsBody = styled.div`
  padding: 10px 9px;
`
export const CloseIcon = styled.i`
  position: absolute;
  right: 0;
  top: 0;
  margin: 15px;
  cursor: pointer;
  font-size: 14px;
  color: rgba(10, 57, 126, 66%);
`
export const SubjectTitle = styled.h1`
  font-size: 14px;
  font-weight: 600;
  color: #000;
  max-width: 90%;
`

export const ProfessorTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
  color: #000;
  margin: 0;
`

export const Group = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  border: 1px solid rgba(163, 175, 192, 28%);
  padding: 15px 12px;
  width: auto;
  border-radius: 6px;
  height: auto;

  ${Checkbox} {
    flex-basis: 25%;
  }
`