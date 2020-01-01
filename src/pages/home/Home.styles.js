import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

.link2-select {
    margin: 20px auto; 
}

.with-separator {
  position: relative;
  height: 1px;
  background-color: rgba(255,255,255,.4);
  margin-top: 10px;
  margin-bottom: 5px;
}

.unselection {
  color: rgb(255,255,255);
  font-size: 14px;
}

.search_title {
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #082147;
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
export const FullWrapper = styled.div`
  min-height: 100%;
  width: 100%;
  display: flex;
`

export const LeftSideNavigation = styled.div`
  position: fixed;
  display: flex;
  left: 0;
  top: 0;
  height: 100vh;
  flex-direction: column;
  background-color: #114188;
  width: ${props => (props.active ? '310px' : '0')};
  max-width: 310px;
  transition: all 0.3s ease-out;
  padding: 35px 20px;
`

export const ScrollArea = styled.div`
  width: 100%;
  margin-top: 30px;
  display: ${props => (props.active ? 'flex' : 'none')};
  flex-direction: column;
  height: 100%;

  overflow-y: scroll;
`
export const Hidder = styled.div`
  width: 100%;
  height: auto;
  transition: opacity 0.3s ease-out;
  opacity: ${props => (props.active ? '1' : '0')};
  display: ${props => (props.active ? 'unset' : 'none')};
`
export const RightSide = styled.div`
  display: flex;
  flex-basis: 70%;
  overflow-y: scroll;
`

export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  transition: all 0.3s ease-out;
  padding-left: ${props => (props.active ? '360px' : '85px')};
`

export const LeftSideTitle = styled.h1`
  font-size: 24px;
  color: #fff;
`

export const ShowProfessorButton = styled.button`
  outline: none;
  border: none;

  width: 100%;
  padding: 18px 12px;
  color: #000;
  background-color: #eee3ab;

  border-radius: 6px;
  margin: 2px 0;

  transition: all 0.3s ease-out;
  font-weight: 600;

  font-size: 12px;

  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
  &:active {
    background-color: #d2c892;
  }
`

export const RetriveButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #eee3ab;
  width: 44px;
  height: 44px;

  border-radius: 100%;
  position: absolute;

  top: 0;
  right: ${props => (props.active ? '0' : '-80%')};

  border: none;

  outline: none;
  margin: 22px;

  transition: all 0.3s ease-out;

  cursor: pointer;
  transform: ${props => (props.active ? 'rotate(-180deg)' : '0')};

  &:hover {
    transform: ${props => (props.active ? 'rotate(-180deg) scale(1.05)' : 'scale(1.05)')};
  }
  &:active {
    background-color: #d2c892;
  }
`
export const SearchSection = styled.section`
  padding: 20px;
`

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

export const MenuSection = styled.div`
  position: relative;
  padding: 10px 20px;
`

export const Indicator = styled.div`
  display: flex;
  justify-content: center;
  width: 102px;
  height: 45px;
  align-items: center;
  border-radius: 6px;
  background-color: #f6f6f6;
  p {
    color: #5b79a6;
  }
`

export const LinkuButton = styled.button`
  margin: 0px 10px;
  border: none;

  background-color: ${props => (props.color ? props.color : '#114188')};
  display: inline-flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  color: ${props => (props.textColor ? props.textColor : '#fff')};

  padding: 17px 17px;

  border-radius: 6px;

  font-weight: 600;

  font-size: 12px;

  transition: all 0.3s ease-out;
  &:hover {
    transform: scale(1.05);
  }
  i {
    margin-right: 10px;
  }
`
// export const Searchbox = styled.input`
//   width: 60%;
//   padding: 16px 14px;
//   background-color: rgba(193, 208, 230, 0.27);
//   border-radius: 6px;

//   font-size: 14px;
//   outline: none;
//   color: #5e6876;
//   border: none;

//   &::placeholder {
//     color: #a3afc0;
//   }
// `
