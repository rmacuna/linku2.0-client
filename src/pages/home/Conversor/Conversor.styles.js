import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle` 
    table {
        table-layout: fixed;
        width: 100%;
        border-spacing: 0;
        margin-top: 20px;
        border: 1px solid rgba(17, 65, 136, 10%);
        border-radius: 16px;
    tr {
      font-size: 12px;
      &:last-child {
        td {
          border-bottom: 0;
        }
      }
      &:not(:first-child){
        td {
          user-select: none;
          &:not(:first-child) {
            user-select: all;
             padding: 8px 5px;
             cursor: pointer;
             font-size: 12px;
          }
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 8px 20px;
      text-align: center;
      border-bottom: 1px solid rgba(17, 65, 136, 10%);
      border-right: 1px solid rgba(17, 65, 136, 10%);;
      :last-child {
        border-right: 0;
      }
        }
    }

    th {
      color: #0A397E;
    }
  
`

export const Document = styled.div`
  width: 100%;
  height: 800px;
`

export const Page = styled.div`
  padding: 25px;
`
export const SubjectsWrapper = styled.div`
  width: 100%;
  border-top: 1px solid rgba(17, 65, 136, 30%);
  margin: 15px 0;
  padding: 0;
  h1 {
    margin: 10px 0;
    font-size: 18px;
  }
`
export const Title = styled.h1`
  font-size: 24px;
  margin: 12px 0px;
  color: rgba(17, 65, 136, 70%);
`

export const ViewSubject = styled.div`
  border: 1px solid rgba(17, 65, 136, 12%);
  border-radius: 20px;
`
export const ViewSubjectHeader = styled.div`
  padding: 8px 16px;
  border-bottom: 1px solid rgba(17, 65, 136, 12%);
  h1 {
    font-size: 14px;
    margin: 0;
  }
`
export const ViewSubjectBody = styled.div`
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  p {
    font-size: 15px;
    margin: 0;
  }
`
