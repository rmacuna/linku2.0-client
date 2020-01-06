import styled, { keyframes } from 'styled-components'

export const confirm = keyframes`
  0% {
    transform: scale(1);
  }
  
  50% {
    transform: scale(0.95)
  }
  
  75% {
    transform: scale(0.8);
  }
  
  100% {
    transform: scale(1);
  }
`

export const CheckboxWrapper = styled.div`
  display: flex;
`
export const StyledCheckbox = styled.div`
  position: relative;
`
export const Label = styled.label`
  position: relative;
  display: inline-block;
  width: ${props => (props.small ? '15px' : '25px')};
  height: ${props => (props.small ? '15px' : '25px')};
  background: none;
  border: 2px solid #aaaaaa;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s ease-out;
`

export const InputCheckbox = styled.input`
  position: absolute;
  visibility: visible;
  opacity: 0;
  cursor: pointer;
  width: ${props => (props.small ? '15px' : '25px')};
  height: ${props => (props.small ? '15px' : '25px')};
  z-index: 2;

  &:checked + ${Label} {
    border: 2px solid #da8686;
    animation: ${confirm} 0.15s linear;
  }

  &:checked + ${Label}:after {
    content: '\f00d';
    font-weight: 900;
    font-family: 'Font Awesome\ 5 Free';
    font-size: ${props => (props.small ? '15px' : '18px')};
    line-height: ${props => (props.small ? '13px' : '23px')};
    width: ${props => (props.small ? '15px' : '25px')};
    height: ${props => (props.small ? '15px' : '25px')};
    text-align: center;
    background: #da8686;
    position: absolute;
    top: 0px;
    left: 0px;
    color: #ffffff;
  }
`

export const CheckboxTitleWrapper = styled.div`
  margin-left: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const CheckboxTitleMessage = styled.p`
  font-size: 14px;
  text-rendering: optimizeLegibility;
  margin: 0;
  color: ${props => (props.labelColor ? props.labelColor : 'rgba(193, 208, 230, 11%)')};
`
