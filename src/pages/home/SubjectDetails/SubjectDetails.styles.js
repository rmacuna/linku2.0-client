import styled, { keyframes, createGlobalStyle } from 'styled-components'
import Checkbox from '../../../components/Checkbox/Checkbox'

export const GlobalStyles = createGlobalStyle`
  .pd-bottom-10 {
    padding-bottom: 15px;
  }
`

const fadeInUp = keyframes`
  0%{
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1
    transform: translateY(0);
  }
`

export const Professors = styled.p`
  font-size: 10px;
  color: rgba(8, 35, 75, 79%);
`

export const DetailsCard = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: 80px;
  height: auto;
  max-height: 550px;
  overflow-y: hidden;
  background-color: #fff;
  border-radius: 6px;
  /* padding: 16px 9px; */
  padding-top: 5px;
  border: 1px solid rgba(10, 57, 126, 10%);
  margin: 10px 10px;

  animation: ${fadeInUp} 0.3s ease-out;
`

export const DetailsHeader = styled.div`
  padding: 5px 9px;
  border-bottom: 1px solid rgba(17, 65, 136, 17%);
`

export const DetailsBody = styled.div`
  padding: 10px 20px;
  overflow-y: auto;
`

export const DetailsFooter = styled.div`
  padding: 5px 20px;
  border-top: 1px solid rgba(17, 65, 136, 17%);
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
  font-size: 14px;
  font-weight: 600;
  color: #08234b;
  margin: 0;
  padding-left: 8px;
`

export const Group = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  border: 1px solid rgba(163, 175, 192, 28%);
  padding: 15px 12px;
  width: auto;
  border-radius: 6px;
  margin-bottom: 5px;
  height: auto;

  transition: all 0.3s ease-out;

  ${Checkbox} {
    flex-basis: 25%;
  }
`

export const ActionLink = styled.button`
  margin: 1px 4px;
  padding: 0;
  border: none;
  background: none;
  font-size: 11px;
  display: inline-flex;
  padding: 4px;
  cursor: pointer;

  font-weight: 600;
  outline: none;
  color: ${props => (props.color ? props.color : '#000')};
`

export const ActionsRow = styled.div`
  display: flex;
  flex-direction: column;
`

export const SubjectGroupDetail = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1px;
  margin: 2px;
  border-bottom: 1px solid rgba(8, 35, 75, 0.1);
  p {
    font-size: 12px;
    font-weight: 600;
    margin: 4px;
    color: #08234b;
  }
  p.day {
    font-weight: 700;
    color: #000;
  }
`
