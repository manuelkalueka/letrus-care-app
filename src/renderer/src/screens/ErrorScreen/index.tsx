import React from 'react'

import { useRouteError } from 'react-router'

export const ErrorScreen: React.FC = () => {
  const error = useRouteError()
  console.error(error)

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message}</i>
      </p>
      <p>
        <a href="/">tap to Return Home Page</a>
      </p>
    </div>
  )
}
