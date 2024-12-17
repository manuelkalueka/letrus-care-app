import { Footer } from '@renderer/components/Footer'
import { HeaderMain } from '@renderer/components/HeaderMain'
import { Sidebar } from '@renderer/components/Sidebar'
import React from 'react'

export const HelpScreen: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <HeaderMain />

        <div className="flex flex-1 pt-[62px] lg:pt-[70px] overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-auto pt-4">
            <div className="flex flex-col flex-1 w-11/12 mx-auto">
              <h2 className="text-3xl text-zinc-400">Ajuda</h2>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}
