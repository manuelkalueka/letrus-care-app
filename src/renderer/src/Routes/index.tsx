import React from 'react'
import { BrowserRouter, Navigate, Route, Routes as WrapperRoutes } from 'react-router'
import { HomeScreen } from '@renderer/screens/HomeScreen'
import { AttendanceScreen } from '@renderer/screens/AttendanceScreen'
import { EnrollmentScreen } from '@renderer/screens/EnrollmentScreen'
import { HelpScreen } from '@renderer/screens/HelpScreen'
import { NotificationScreen } from '@renderer/screens/NotificationScreen'
import { PaymentScreen } from '@renderer/screens/PaymentScreen'
import { NewPaymentScreen } from '@renderer/screens/NewPaymentScreen'
import { CreateEnrollmentScreen } from '@renderer/screens/CreateEnrollmentScreen'
import { CoursesScreen } from '@renderer/screens/CoursesScreen'
import { GradeScreen } from '@renderer/screens/GradeScreen'
import { TeacherScreen } from '@renderer/screens/TeacherScreen'
import { UserProfile } from '@renderer/screens/UserProfile'
import { CenterScreen } from '@renderer/screens/CenterScreen'
import { CreateCenterScreen } from '@renderer/screens/CreateCenterScreen'
import { LoginScreen } from '@renderer/screens/LoginScreen'
import { SignupScreen } from '@renderer/screens/SignupScreen'
import { useAuth } from '@renderer/contexts/auth-context'
import { getFromLocalStorage } from '@renderer/utils/localStorage'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { signed } = useAuth()
  const user = getFromLocalStorage('user')
  if (!signed && !user) return <Navigate to="/login" />
  return <>{children}</>
}

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <WrapperRoutes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          index
          element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          }
        />
        <Route path="/enrollment">
          <Route index element={<EnrollmentScreen />} />
          <Route
            path="/enrollment/new"
            element={
              <ProtectedRoute>
                <CreateEnrollmentScreen />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/attendances"
          element={
            <ProtectedRoute>
              <AttendanceScreen />
            </ProtectedRoute>
          }
        />
        <Route path="/payments">
          <Route
            index
            element={
              <ProtectedRoute>
                <PaymentScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payments/new"
            element={
              <ProtectedRoute>
                <NewPaymentScreen />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/help"
          element={
            <ProtectedRoute>
              <HelpScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <CoursesScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/grades"
          element={
            <ProtectedRoute>
              <GradeScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teachers"
          element={
            <ProtectedRoute>
              <TeacherScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        <Route path="/centers">
          <Route
            path="/centers/show"
            index
            element={
              <ProtectedRoute>
                <CenterScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/centers/new"
            element={
              <ProtectedRoute>
                <CreateCenterScreen />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route>
          <Route path="/login" index element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
        </Route>
      </WrapperRoutes>
    </BrowserRouter>
  )
}
