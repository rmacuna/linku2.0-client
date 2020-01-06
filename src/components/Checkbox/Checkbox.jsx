import React from 'react'
import {
  CheckboxTitleMessage,
  CheckboxWrapper,
  CheckboxTitleWrapper,
  InputCheckbox,
  Label,
  StyledCheckbox,
} from './Checkbox.styles'

const Checkbox = props => {
  const { labelTitle, small, labelColor, checked, onChange } = props
  return (
    <CheckboxWrapper>
      <StyledCheckbox>
        <InputCheckbox type="checkbox" checked={checked} onChange={onChange} {...props} />
        <Label small={small}></Label>
      </StyledCheckbox>
      {labelTitle ? (
        <CheckboxTitleWrapper>
          <CheckboxTitleMessage labelColor={labelColor}>{labelTitle}</CheckboxTitleMessage>
        </CheckboxTitleWrapper>
      ) : null}
    </CheckboxWrapper>
  )
}

export default Checkbox
