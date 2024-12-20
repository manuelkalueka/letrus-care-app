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
import { PaymentScreen } from '@renderer/screens/PaymentScreen'
import { NewPaymentScreen } from '@renderer/screens/NewPaymentScreen'
import { AttendanceScreen } from '@renderer/screens/AttendanceScreen'
import { NotificationScreen } from '@renderer/screens/NotificationScreen'
import { HelpScreen } from '@renderer/screens/HelpScreen'
import { UserProfile } from '@renderer/screens/UserProfile'

export const appRouter = createBrowserRouter(
  [
    {
      path: '/',
      element: <HomeScreen />,
      errorElement: <ErrorScreen />
    },
    {
      path: '/home',
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
    },
    {
      path: '/payments',
      element: <PaymentScreen />
    },
    {
      path: '/payments/new',
      element: <NewPaymentScreen />
    },
    {
      path: '/attendances',
      element: <AttendanceScreen />
    },
    {
      path: '/notifications',
      element: <NotificationScreen />
    },
    {
      path: '/help',
      element: <HelpScreen />
    },
    {
      path: '/profile',
      element: <UserProfile />
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
