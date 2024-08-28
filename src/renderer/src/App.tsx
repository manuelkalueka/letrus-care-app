import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './routes/app'

const router = appRouter
export const App: React.FC = () => {
  return <RouterProvider router={router} />
}
