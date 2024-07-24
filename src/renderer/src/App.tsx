import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginScreen } from './screens/LoginScreen'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginScreen />
  },
  {
    path: '/login',
    element: <LoginScreen />
  }
])
export const App: React.FC = () => {
  return <RouterProvider router={router} />
}
