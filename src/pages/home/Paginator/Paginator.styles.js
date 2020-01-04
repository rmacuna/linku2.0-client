import styled from 'styled-components'

export const NavigationArrows = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  flex-basis: 100%;
`
export const ArrowLeft = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #114188;
  cursor: pointer;

  outline: none;

  /* outline: none; */
  border: none;
  i {
    color: #fff;
    font-size: 12px;
    transform: rotate(-180deg);
  }
`

export const ArrowRight = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 6px;
  outline: none;
  display: flex;
  justify-content: center;
  border: none;
  cursor: pointer;
  align-items: center;
  background-color: #114188;

  i {
    color: #fff;
    font-size: 12px;
  }
`

export const NumberContainer = styled.input`
  font-size: 12px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  outline: none;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  text-align: center;
`
