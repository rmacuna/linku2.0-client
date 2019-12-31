import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

.link2-select {
    margin: 20px auto; 
}

`

export const ModalHeaderContainer = styled.section`
  border-bottom: 1px solid rgba(17, 65, 136, 0.15);
  min-height: 120px;
  padding: 44px 43px;
`
export const ModalBodyContainer = styled.section`
  padding: 44px 43px;
  background-color: rgba(14, 65, 136, 4%);
  min-height: 500px;
`

export const ModalTitle = styled.h1`
  margin: 0;
  color: #0a397e;
  font-size: 24px;
  font-weight: 700;
  max-width: 60%;
  padding-bottom: 10px;
`
export const ModalSubtitle = styled.h4`
  font-weight: 700;
  color: #a3afc0;
  font-size: 16px;
  margin: 0;
`
