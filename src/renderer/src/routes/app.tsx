import { createBrowserRouter } from 'react-router-dom'

import { ErrorScreen } from '../screens/ErrorScreen'

import { LoginScreen } from '@renderer/screens/LoginScreen'
import { SignupScreen } from '@renderer/screens/SignupScreen'

import { HomeScreen } from '../screens/HomeScreen'
import { EnrollmentScreen } from '@renderer/screens/EnrollmentScreen'
import { CreateCenterScreen } from '@renderer/screens/CreateCenterScreen'
import { ShowCenterScreen } from '@renderer/screens/CreateCenterScreen/ShowCenterScreen'

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
  },
  {
    path: '/centers/show',
    element: <ShowCenterScreen />
  },
  {
    path: '/centers/new',
    element: <CreateCenterScreen />
  }
])
