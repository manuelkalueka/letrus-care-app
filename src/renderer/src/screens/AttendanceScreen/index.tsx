import { Footer } from '@renderer/components/Footer'
import { HeaderMain } from '@renderer/components/HeaderMain'
import { Sidebar } from '@renderer/components/Sidebar'
import React from 'react'

export const AttendanceScreen: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <HeaderMain />

        <div className="flex flex-1 pt-[62px] lg:pt-[70px] overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-auto pt-4">
            <div className="flex flex-col flex-1 w-11/12 mx-auto">
              <h2 className="text-3xl text-zinc-400">Turmas e Presenças</h2>
              {/* <article className="text-zinc-600 mt-3">
                <p>Níveis Disponíveis no (a) {center?.name}</p>
              </article> */}

              {/* Botão para adicionar novo dado  ToDo alinhar a directa*/}
              <button className="bg-orange-700 text-white px-4 py-2 rounded hover:brightness-110 transition-all mt-4 self-end">
                Criar Novo Nível
              </button>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}
