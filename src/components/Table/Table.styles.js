import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    table {
      width: 100%;
        border-spacing: 0;
        margin-top: 20px;
        border: 1px solid rgba(17, 65, 136, 10%);
        border-radius: 16px;
    tr {
      font-size: 14px;
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
             padding: 8px 65px;
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
