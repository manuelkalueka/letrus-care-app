import { createBrowserRouter } from 'react-router-dom'
import { HomeScreen } from '../screens/HomeScreen'
import { ErrorScreen } from '../screens/ErrorScreen'
import { EnrollmentScreen } from '@renderer/screens/EnrollmentScreen'
import { LoginScreen } from '@renderer/screens/LoginScreen'
import { SignupScreen } from '@renderer/screens/SignupScreen'

export const appRouter = createBrowserRouter([
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
    path: '/home',
    element: <HomeScreen />
  },
  {
    path: '/enrollment',
    element: <EnrollmentScreen />
  },
  {
    path: '/signup',
    element: <SignupScreen />
  }
])
