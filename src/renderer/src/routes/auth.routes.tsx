import { createBrowserRouter } from 'react-router'

import { ErrorScreen } from '../screens/ErrorScreen'

import { LoginScreen } from '@renderer/screens/LoginScreen'
import { SignupScreen } from '@renderer/screens/SignupScreen'

export const authRoutes = createBrowserRouter(
  [
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
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true
    }
  }
)
