import React from 'react'
import {
  CheckboxTitleMessage,
  CheckboxWrapper,
  CheckboxTitleWrapper,
  InputCheckbox,
  Label,
  StyledCheckbox,
} from './Checkbox.styles'

function Checkbox(props) {
  const { labelTitle, small, labelColor } = props
  return (
    <CheckboxWrapper>
      <StyledCheckbox>
        <InputCheckbox name="do-checkbox" type="checkbox" {...props} />
        <Label small={small} htmlFor="do-checkbox"></Label>
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
