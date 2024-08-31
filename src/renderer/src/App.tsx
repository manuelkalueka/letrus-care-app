import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './routes/app.routes'
import { authRoutes } from './routes/auth.routes'

import { AuthProvider, useAuth } from './contexts/auth-context'

export const App: React.FC = () => {
  const { signed, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }
  console.log('Estado de Login:', signed)
  const router = signed ? appRouter : authRoutes

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
