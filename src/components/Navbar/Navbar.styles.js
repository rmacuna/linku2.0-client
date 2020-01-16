import styled from 'styled-components'

export const NavbarWrapper = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  height: 70px;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  /* padding: 0 30px; */
  /* border-bottom: 1px solid hsla(202, 87%, 15%, 11%); */
`
export const HamburgerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding-right: 20px;
`

export const NavigationContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`
export const Navigation = styled.div`
  display: flex;
  flex: 1;
  flex-basis: 100%;
  align-items: center;
`

export const NavigationItem = styled.li`
  text-decoration: none;
  display: flex;
  align-items: center;
  font-weight: 600;
  list-style: none;
  padding: 0;
  font-size: 12px;
  cursor: pointer;
  a {
    text-decoration: none;
  }
  :last-of-type {
    padding-right: 12px;
  }
`

export const NavigationList = styled.ul`
  display: flex;
  flex: 0.8;
  margin: 0;
  justify-content: flex-end;
  li {
    list-style: none;
  }
`
