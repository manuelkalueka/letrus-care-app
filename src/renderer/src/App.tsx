import React from 'react'
import { AuthProvider, useAuth } from './contexts/auth-context'
import { CenterProvider } from './contexts/center-context'
import { LoaderComponent } from './components/Loader'
import { Routes } from './Routes'

export const App: React.FC = () => {
  const { loading } = useAuth()

  if (loading) {
    return <LoaderComponent />
  }

  return (
    <AuthProvider>
      <CenterProvider>
        <Routes />
      </CenterProvider>
    </AuthProvider>
  )
}
