import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { GlobalStyle } from './ServerStatus.styles'
import { GET_SERVER_STATUS_QUERY } from '../../../graphql/queries'

function ServerStatus() {
  const { loading, error, data } = useQuery(GET_SERVER_STATUS_QUERY)
  if (loading || error) return null

  const { totalGroups, updatedAt } = data.getServerStatus;
  return (
    <>
      <GlobalStyle />
      <span className="server_status">
        Última actualización: {new Date(updatedAt).toLocaleString()} - Grupos obtenidos: {totalGroups}
      </span>
    </>
  )
}

export default ServerStatus