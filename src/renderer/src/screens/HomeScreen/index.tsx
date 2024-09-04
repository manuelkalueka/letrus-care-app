import React from 'react'
import { Sidebar } from '@renderer/components/Sidebar'
import { Header } from '@renderer/components/Header'
import { Footer } from '@renderer/components/Footer'

export const HomeScreen: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />
      <div className="flex flex-1 pt-[62px] lg:pt-[70px]">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <div className="flex-1 overflow-auto p-4">
            <p>Conteúdo Principal meu</p>
          </div>
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  )
}
