import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`


 #selectable .ui-selecting { background: #FFEDED; }
  #selectable .ui-selected { background: #DA8686; color: white; }
  #selectable { list-style-type: none; margin: 0; padding: 0; width: 450px; }
  #selectable li { margin: 3px; padding: 1px; float: left; width: 100px; height: 80px; font-size: 4em; text-align: center; }
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
