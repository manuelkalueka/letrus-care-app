import { createBrowserRouter } from 'react-router-dom'
import { HomeScreen } from '../screens/HomeScreen'
import { ErrorScreen } from '../screens/ErrorScreen'

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
  }
])
