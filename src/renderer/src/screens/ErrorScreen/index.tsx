import React from 'react'
import { Link, useRouteError, isRouteErrorResponse } from 'react-router'

export const ErrorBoundary: React.FC = () => {
  const error = useRouteError()

  let errorMessage = 'Desculpe, ocorreu um erro inesperado.'

  if (isRouteErrorResponse(error)) {
    // Erro gerado pelo React Router (404, 500, etc.)
    errorMessage = error.statusText || error.data?.message || errorMessage
  } else if (error instanceof Error) {
    // Erro gerado por exceções do React
    errorMessage = error.message
  }

  console.error('Erro capturado:', error)

  return (
    <div id="error-page" className="text-center p-5">
      <h1 className="text-red-500">Ops!</h1>
      <p className="text-lg text-gray-800">{errorMessage}</p>
      <p>
        <Link to="/" className="text-orange-500 no-underline">
          Clique para retornar à página inicial
        </Link>
      </p>
    </div>
  )
}
