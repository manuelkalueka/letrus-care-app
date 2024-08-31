import { createBrowserRouter } from 'react-router-dom'

import { ErrorScreen } from '../screens/ErrorScreen'

import { HomeScreen } from '../screens/HomeScreen'
import { EnrollmentScreen } from '@renderer/screens/EnrollmentScreen'
import { CreateCenterScreen } from '@renderer/screens/CreateCenterScreen'
import { ShowCenterScreen } from '@renderer/screens/ShowCenterScreen'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomeScreen />,
    errorElement: <ErrorScreen />
  },
  {
    path: '/enrollment',
    element: <EnrollmentScreen />
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
