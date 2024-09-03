import { Header } from '@renderer/components/Header'
import { Sidebar } from '@renderer/components/Sidebar'
import React from 'react'

export const CoursesScreen: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />
      <div className="flex flex-1 pt-[62px] lg:pt-[70px] overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto p-4">
          <h2 className="text-3xl text-zinc-500 w-10/12 mx-auto">Cursos</h2>
          <article>
            <p>Cursos de Excelência no</p>
          </article>
        </div>
      </div>
    </div>
  )
}
