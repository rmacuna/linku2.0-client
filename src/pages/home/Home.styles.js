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

.bg-table-abs {
  background-color: rgba(193, 208, 230, 11%);
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 60%;
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

export const Hint = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.7);
  margin: 0;
`
export const ModalHeaderContainer = styled.section`
  border-bottom: 1px solid rgba(17, 65, 136, 0.15);
  min-height: 120px;
  padding: 44px 43px;
`
export const ModalBodyContainer = styled.section`
  padding: 44px 43px;
  display: flex;
  justify-content: flex-start;
  background-color: rgba(14, 65, 136, 4%);
  min-height: 500px;
  overflow-y: hidden;
  overflow-x: scroll;
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
export const Alert = styled.div`
  width: 100%;
  background-color: ${props => (props.info ? '#ACC5EB' : '#fad3b1')};
  padding: 8px;
  position: relative;
  p {
    font-size: 12px;
    color: ${props => (props.info ? '#0B408E' : '#c65d00')};
    font-weight: 700;
    margin: 2px;
    text-align: left;
  }
  i {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    margin: 10px 20px;
    color: #c65d00;
  }
`
export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  transition: all 0.3s ease-out;
  padding-left: ${props => (props.active ? '360px' : '85px')};
  padding-top: 35px;
`

export const SearchSection = styled.section`
  padding: 4px 14px;
`

export const WhatsappButton = styled.a`
  background: rgba(111, 207, 151, 5%);
  padding: 20px;
  border-radius: 20px;
  border: none;
  outline: none;
  color: #105b2f;
  font-size: 12px;
  cursor: pointer;
  text-decoration: none;
`

export const MenuSection = styled.div`
  position: relative;
  padding: 10px 20px;
`

export const Indicator = styled.div`
  display: flex;
  justify-content: center;
  min-width: 102px;
  max-width: 100%;
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

  padding: 14px 12px;

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

export const ServerStatus = styled.div``

export const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  height: 4px;
  display: block;
  width: 100%;
  background-color: white;
  border-radius: 2px;
  background-clip: padding-box;
  overflow: hidden; }
  .indeterminate {
    background-color: #114188; }
    .indeterminate:before {
      content: '';
      position: absolute;
      background-color: inherit;
      top: 0;
      left: 0;
      bottom: 0;
      will-change: left, right;
      -webkit-animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
              animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite; }
    .indeterminate:after {
      content: '';
      position: absolute;
      background-color: inherit;
      top: 0;
      left: 0;
      bottom: 0;
      will-change: left, right;
      -webkit-animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
              animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
      -webkit-animation-delay: 1.15s;
              animation-delay: 1.15s;

  @-webkit-keyframes indeterminate {
    0% {
      left: -35%;
      right: 100%; }
    60% {
      left: 100%;
      right: -90%; }
    100% {
      left: 100%;
      right: -90%; } }
  @keyframes indeterminate {
    0% {
      left: -35%;
      right: 100%; }
    60% {
      left: 100%;
      right: -90%; }
    100% {
      left: 100%;
      right: -90%; } }
  @-webkit-keyframes indeterminate-short {
    0% {
      left: -200%;
      right: 100%; }
    60% {
      left: 107%;
      right: -8%; }
    100% {
      left: 107%;
      right: -8%; } }
  @keyframes indeterminate-short {
    0% {
      left: -200%;
      right: 100%; }
    60% {
      left: 107%;
      right: -8%; }
    100% {
      left: 107%;
      right: -8%; } }
`

export const AllowFullGroups = styled.div`
  margin: 0px 10px;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  padding: 17px 17px;

  transition: all 0.3s ease-out;

  span {
    margin-left: 6px;
    font-weight: 600;
    font-size: 14px;
    color: #082147;
  }
`
