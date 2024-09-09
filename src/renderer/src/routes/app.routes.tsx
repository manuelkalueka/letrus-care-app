import { createBrowserRouter } from 'react-router-dom'

import { ErrorScreen } from '../screens/ErrorScreen'

import { HomeScreen } from '../screens/HomeScreen'
import { EnrollmentScreen } from '@renderer/screens/EnrollmentScreen'
import { CreateCenterScreen } from '@renderer/screens/CreateCenterScreen'
import { ShowCenterScreen } from '@renderer/screens/ShowCenterScreen'
import { CoursesScreen } from '@renderer/screens/CoursesScreen'
import { GradeScreen } from '@renderer/screens/GradeScreen'
import { CreateEnrollmentScreen } from '@renderer/screens/CreateEnrollmentScreen'

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
    path: '/enrollment/new',
    element: <CreateEnrollmentScreen />
  },
  {
    path: '/centers/show',
    element: <ShowCenterScreen />
  },
  {
    path: '/centers/new',
    element: <CreateCenterScreen />
  },
  {
    path: '/courses',
    element: <CoursesScreen />
  },
  {
    path: '/grades',
    element: <GradeScreen />
  }
])
