import { Footer } from '@renderer/components/Footer'
import { HeaderMain } from '@renderer/components/HeaderMain'
import { Sidebar } from '@renderer/components/Sidebar'
import { useCenter } from '@renderer/contexts/center-context'
import React, { useState } from 'react'

export const NotificationScreen: React.FC = () => {
  const { center } = useCenter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div>
      <div className="flex flex-col h-screen">
        <HeaderMain isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        <div className="flex flex-1 pt-[62px] lg:pt-[70px] overflow-hidden">
          <Sidebar isOpen={isSidebarOpen} />
          <div className="flex flex-col flex-1 overflow-auto pt-4">
            <div className="flex flex-col flex-1 w-11/12 mx-auto">
              <h2 className="text-3xl text-zinc-400">Central de Notificações</h2>
              <article className="text-zinc-600 mt-3">
                <p>Mantenha-se atualizado das informações no (a) {center?.name}</p>
              </article>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}
