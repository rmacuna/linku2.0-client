import styled from 'styled-components'

export const BannerWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 15px;
  padding: 20px;
  border-radius: 20px;
  background-color: rgba(17, 65, 136, 3%);

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;

  a {
    font-size: 10px;
    padding: 0 5px;
    color: rgba(17, 65, 136, 100%);
    text-decoration: none;
  }
`
