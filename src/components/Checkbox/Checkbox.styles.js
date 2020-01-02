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
  margin: 5px 0%;
`
export const StyledCheckbox = styled.div`
  position: relative;
`
export const InputCheckbox = styled.input`
  position: absolute;
  visibility: visible;
  opacity: 0;
  cursor: pointer;
  width: 30px;
  height: 30px;
  z-index: 2;

  &:checked + label {
    border: 2px solid rgba(163, 175, 192, 63%);
    animation: ${confirm} 0.15s linear;
  }

  &:checked + label:after {
    content: '\f057';
    font-family: FontAwesome;
    font-size: 16px;
    padding-left: 1px;
    line-height: 15px;
    width: 30px;
    height: 30px;
    background: #da8686;
    position: absolute;
    top: 0px;
    left: 0px;
    color: #ffffff;
  }
`
export const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 15px;
  height: 15px;
  background: none;
  border: 2px solid #aaaaaa;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s ease-out;
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
  color: rgba(193, 208, 230, 11%);
`
