import { createBrowserRouter } from 'react-router-dom'
import { HomeScreen } from '../screens/HomeScreen'
import { ErrorScreen } from '../screens/ErrorScreen'
import { EnrollmentScreen } from '@renderer/screens/EnrollmentScreen'

export const appRouter = createBrowserRouter([
  {
    path: '/home',
    element: <HomeScreen />,
    errorElement: <ErrorScreen />
  },
  {
    path: '/',
    element: <HomeScreen />,
    errorElement: <ErrorScreen />
  },
  {
    path: '/enrollment',
    element: <EnrollmentScreen />
  }
])
