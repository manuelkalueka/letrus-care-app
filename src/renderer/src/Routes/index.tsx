import { BrowserRouter, Route, Routes as WrapperRoutes } from 'react-router'
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

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <WrapperRoutes>
        <Route path="/">
          <Route path="/home" index element={<HomeScreen />} />
          <Route path="/enrollment">
            <Route index element={<EnrollmentScreen />} />
            <Route path="/enrollment/new" element={<CreateEnrollmentScreen />} />
          </Route>

          <Route path="/attendances" element={<AttendanceScreen />} />
          <Route path="/payments">
            <Route index element={<PaymentScreen />} />
            <Route path="/payments/new" element={<NewPaymentScreen />} />
          </Route>

          <Route path="/notifications" element={<NotificationScreen />} />
          <Route path="/help" element={<HelpScreen />} />
          <Route path="/courses" element={<CoursesScreen />} />
          <Route path="/grades" element={<GradeScreen />} />
          <Route path="/teachers" element={<TeacherScreen />} />
          <Route path="/profile" element={<UserProfile />} />

          <Route path="/center">
            <Route path="/center/show" index element={<CenterScreen />} />
            <Route path="/center/new" element={<CreateCenterScreen />} />
          </Route>
        </Route>

        <Route>
          <Route path="/login" index element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
        </Route>
      </WrapperRoutes>
    </BrowserRouter>
  )
}
