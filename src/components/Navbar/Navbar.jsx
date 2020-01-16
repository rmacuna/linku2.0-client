import React from 'react'

import { NavbarWrapper, NavigationContainer, NavigationItem, NavigationList } from './Navbar.styles'
import Banner from '../Banner/Banner'
import { WhatsappButton } from '../../pages/home/Home.styles'

function Navbar() {
  return (
    <NavbarWrapper>
      <NavigationContainer>
        <NavigationList>
          <NavigationItem>
            <Banner />
          </NavigationItem>
          <NavigationItem>
            <WhatsappButton href="https://chat.whatsapp.com/KC7pOGeCUUb4kT7Di75NIdx">
              ¿Problemas? Comunícanos
            </WhatsappButton>
          </NavigationItem>
        </NavigationList>
      </NavigationContainer>
    </NavbarWrapper>
  )
}

export default Navbar
