import styled, { createGlobalStyle, css } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  /* .scroll_nav::-webkit-scrollbar {
    width: 10px;
  }
  .scroll_nav {
    -ms-overflow-style: none;
  } */
  .mihorario {
    text-decoration: none;
    color: #fff;
    font-weight: 600;
    font-size: 12px;
  }
`

export const LeftNavigation = styled.div`
  position: fixed;
  display: flex;
  left: 0;
  top: 0;
  height: 100%;
  flex-direction: column;
  background-color: #114188;
  width: ${props => (props.active ? '310px' : '0')};
  max-width: 310px;
  transition: all 0.3s ease-out;
  padding: 35px 20px;
`

export const Hidder = styled.div`
  width: 100%;
  height: auto;
  transition: opacity 0.3s ease-out;
  opacity: ${props => (props.active ? '1' : '0')};
  display: ${props => (props.active ? 'unset' : 'none')};
`

export const ScrollArea = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 30px;
  display: ${props => (props.active ? 'flex' : 'none')};
  flex-direction: column;
  height: 100%;

  margin-bottom: 15%;
  overflow-y: scroll;
  overflow-x: hidden;
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

export const NavbuttonCSS = css`
  outline: none;
  border: none;

  width: 100%;
  padding: 14px 12px;
  color: #000;
  border-radius: 6px;
  margin: 2px 0;

  transition: all 0.3s ease-out;
  font-weight: 600;

  font-size: 12px;

  cursor: pointer;
`

export const ShowProfessorButton = styled.button`
  ${NavbuttonCSS};
  background-color: #eee3ab;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    background-color: #d2c892;
  }
`

export const MihorarioButton = styled.a`
  ${NavbuttonCSS};
  text-align: center;
  justify-content: center;
  box-sizing: border-box;
  display: flex;
  text-decoration: none;
  position: relative;

  background-color: #fff;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    background-color: #fff;
  }
`

export const Logo = styled.img`
  width: 25%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
`

export const LeftSideTitle = styled.h1`
  font-size: 24px;
  color: #fff;
`

export const BannerInfo = styled.p`
  color: rgb(255, 255, 255);
  font-size: 14px;
`
