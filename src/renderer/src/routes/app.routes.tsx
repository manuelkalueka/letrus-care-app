import { createBrowserRouter } from 'react-router-dom'

import { ErrorScreen } from '../screens/ErrorScreen'

import { HomeScreen } from '../screens/HomeScreen'
import { EnrollmentScreen } from '@renderer/screens/EnrollmentScreen'
import { CreateCenterScreen } from '@renderer/screens/CreateCenterScreen'
import { CoursesScreen } from '@renderer/screens/CoursesScreen'
import { GradeScreen } from '@renderer/screens/GradeScreen'
import { CreateEnrollmentScreen } from '@renderer/screens/CreateEnrollmentScreen'
import { CenterScreen } from '@renderer/screens/CenterScreen'
import { TeacherScreen } from '@renderer/screens/TeacherScreen'

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
  },
  {
    path: '/centers/show',
    element: <CenterScreen />
  },
  {
    path: '/teachers',
    element: <TeacherScreen />
  }
])
