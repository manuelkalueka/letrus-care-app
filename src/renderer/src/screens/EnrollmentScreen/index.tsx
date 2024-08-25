import React from 'react'
import { Sidebar } from '@renderer/components/Sidebar'
import { Header } from '@renderer/components/Header'

export const EnrollmentScreen: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />
      <div className="flex flex-1 pt-[62px] lg:pt-[70px] overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto p-4">
          <p>Sou a Inscrição</p>
        </div>
      </div>
    </div>
  )
}
