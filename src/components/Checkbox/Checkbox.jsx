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
  const { labelTitle } = props
  return (
    <CheckboxWrapper>
      <StyledCheckbox>
        <InputCheckbox name="do-checkbox" type="checkbox" {...props} />
        <Label htmlFor="do-checkbox"></Label>
      </StyledCheckbox>
      {labelTitle ? (
        <CheckboxTitleWrapper>
          <CheckboxTitleMessage>{labelTitle}</CheckboxTitleMessage>
        </CheckboxTitleWrapper>
      ) : null}
    </CheckboxWrapper>
  )
}

export default Checkbox
