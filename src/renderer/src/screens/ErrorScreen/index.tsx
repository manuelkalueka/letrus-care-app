import { Link2 } from 'lucide-react'
import React from 'react'
import { Link, useRouteError, isRouteErrorResponse } from 'react-router'

export const ErrorScreen: React.FC = () => {
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
    <div
      id="error-page"
      className="text-center p-5 flex items-center justify-center flex-col h-screen gap-4"
    >
      <h1 className="text-white text-4xl">Ops!</h1>
      <p className="text-3xl text-white">{errorMessage}</p>
      <p>
        <Link
          to="/"
          className="text-orange-500 no-underline flex gap-2 items-center hover:opacity-90 hover:underline"
        >
          Clique para retornar à página inicial <Link2 />
        </Link>
      </p>
    </div>
  )
}
