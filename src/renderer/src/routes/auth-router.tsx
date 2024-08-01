import { createBrowserRouter } from 'react-router-dom'
import { LoginScreen } from '@renderer/screens/LoginScreen'
import { ErrorScreen } from '@renderer/screens/ErrorScreen'
import { SignupScreen } from '@renderer/screens/SignupScreen'

export const authRouter = createBrowserRouter([
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
