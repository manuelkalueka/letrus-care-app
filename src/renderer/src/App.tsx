import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginScreen } from './screens/LoginScreen'
import { ErrorScreen } from './screens/ErrorScreen'
import { SignupScreen } from './screens/SignupScreen'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginScreen />,
    errorElement: <ErrorScreen />
  },
  {
    path: '/login',
    element: <LoginScreen />
  },
  {
    path: '/signup',
    element: <SignupScreen />
  }
])
export const App: React.FC = () => {
  return <RouterProvider router={router} />
}
