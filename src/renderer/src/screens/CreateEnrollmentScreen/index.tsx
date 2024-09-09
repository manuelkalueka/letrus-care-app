import React from 'react'
import { Sidebar } from '@renderer/components/Sidebar'
import { Header } from '@renderer/components/Header'
import { Panel } from '@renderer/components/Panel'

export const CreateEnrollmentScreen: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />
      <div className="flex flex-1 pt-[62px] lg:pt-[70px] overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto p-4">
          <div className="w-11/12 mx-auto">
            <h2 className="text-3xl text-zinc-500">Criar Inscrições</h2>
            <Panel />
          </div>
        </div>
      </div>
    </div>
  )
}
