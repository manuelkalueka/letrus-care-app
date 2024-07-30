import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginScreen } from './screens/LoginScreen'
import { ErrorScreen } from './screens/ErrorScreen'
import { SignupScreen } from './screens/SignupScreen'
import { HomeScreen } from './screens/HomeScreen'

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
  },
  {
    path: '/home',
    element: <HomeScreen />
  }
])
export const App: React.FC = () => {
  return <RouterProvider router={router} />
}
