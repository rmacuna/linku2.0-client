import styled from 'styled-components'

export const ModalWrapper = styled.div`
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(
    17,
    65,
    136,
    0.41
  ); /* Overlay effect: translucent background: black w/ partial opacity */
  z-index: 1; /* Overlay effect: positioned over other containers */
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  position: fixed; /* Fix position on the top-left corner*/
  top: 0;
  left: 0;
  overflow-y: auto; /* Enable scroll if needed */
`

export const ModalBody = styled.section`
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  background-color: white;
  margin: 0 auto;
  position: relative;
  max-width: 1100px;
  z-index: 2000;
  margin-top: 2%;
  margin-bottom: 2%;
  transition: all 0.3s ease-out;
`

export const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: white;
  width: 43px;
  height: 43px;
  border: none;
  position: absolute;
  cursor: pointer;
  top: 0;
  right: 0;
  margin-top: 25px;
  margin-right: 25px;
  box-shadow: 0 2px 8px rgba(17, 65, 136, 0.13);

  i {
    color: rgba(10, 57, 126, 0.66);
  }
`
