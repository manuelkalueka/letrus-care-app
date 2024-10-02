import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './routes/app.routes'
import { authRoutes } from './routes/auth.routes'
import { AuthProvider, useAuth } from './contexts/auth-context'
import { CenterProvider } from './contexts/center-context'
import { Loader } from './components/Loader'

const AppContent: React.FC = () => {
  const { signed, loading } = useAuth()

  if (loading) {
    return <Loader />
  }

  const router = signed ? appRouter : authRoutes

  return <RouterProvider router={router} />
}

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <CenterProvider>
        <AppContent />
      </CenterProvider>
    </AuthProvider>
  )
}
