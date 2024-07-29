import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginScreen } from './screens/LoginScreen'
import { ErrorScreen } from './screens/ErrorScreen'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginScreen />,
    errorElement: <ErrorScreen />
  },
  {
    path: '/login',
    element: <LoginScreen />
  }
])
export const App: React.FC = () => {
  return <RouterProvider router={router} />
}
