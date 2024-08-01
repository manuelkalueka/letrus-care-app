import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './routes/app'
import { authRouter } from './routes/auth-router'

const isSigned = true
const router = isSigned ? appRouter : authRouter
export const App: React.FC = () => {
  return <RouterProvider router={router} />
}
