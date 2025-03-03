import React from 'react'
import { BrowserRouter, Navigate, Route, Routes as WrapperRoutes } from 'react-router'
import { HomeScreen } from '@renderer/screens/HomeScreen'
import { ClassesScreen } from '@renderer/screens/ClassesScreen'
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
import { ShowClassScreen } from '@renderer/screens/ShowClassScreen'
import { ErrorBoundary } from '@renderer/screens/ErrorScreen'

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
        {/* Rotas protegidas */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          }
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          }
          errorElement={<ErrorBoundary />}
        />
        <Route path="/enrollment">
          <Route index element={<EnrollmentScreen />} />
          <Route
            path="new"
            element={
              <ProtectedRoute>
                <CreateEnrollmentScreen />
              </ProtectedRoute>
            }
            errorElement={<ErrorBoundary />}
          />
        </Route>

        <Route
          path="/classes"
          element={
            <ProtectedRoute>
              <ClassesScreen />
            </ProtectedRoute>
          }
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/classes/show/:iclass"
          element={
            <ProtectedRoute>
              <ShowClassScreen />
            </ProtectedRoute>
          }
          errorElement={<ErrorBoundary />}
        />

        <Route path="/payments">
          <Route
            index
            element={
              <ProtectedRoute>
                <PaymentScreen />
              </ProtectedRoute>
            }
            errorElement={<ErrorBoundary />}
          />
          <Route
            path="new"
            element={
              <ProtectedRoute>
                <NewPaymentScreen />
              </ProtectedRoute>
            }
            errorElement={<ErrorBoundary />}
          />
        </Route>

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationScreen />
            </ProtectedRoute>
          }
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/help"
          element={
            <ProtectedRoute>
              <HelpScreen />
            </ProtectedRoute>
          }
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <CoursesScreen />
            </ProtectedRoute>
          }
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/grades"
          element={
            <ProtectedRoute>
              <GradeScreen />
            </ProtectedRoute>
          }
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/teachers"
          element={
            <ProtectedRoute>
              <TeacherScreen />
            </ProtectedRoute>
          }
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
          errorElement={<ErrorBoundary />}
        />

        <Route path="/centers">
          <Route
            path="show"
            element={
              <ProtectedRoute>
                <CenterScreen />
              </ProtectedRoute>
            }
            errorElement={<ErrorBoundary />}
          />
          <Route
            path="new"
            element={
              <ProtectedRoute>
                <CreateCenterScreen />
              </ProtectedRoute>
            }
            errorElement={<ErrorBoundary />}
          />
        </Route>

        {/* Rotas públicas */}
        <Route path="/login" element={<LoginScreen />} errorElement={<ErrorBoundary />} />
        <Route path="/signup" element={<SignupScreen />} errorElement={<ErrorBoundary />} />

        {/* Página 404 */}
        <Route path="*" element={<ErrorBoundary />} />
      </WrapperRoutes>
    </BrowserRouter>
  )
}
