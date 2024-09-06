import React, { useState } from 'react'

import { Header } from '@renderer/components/Header'
import { Sidebar } from '@renderer/components/Sidebar'
import { useCenter } from '@renderer/contexts/center-context'

export const CoursesScreen: React.FC = () => {
  const { center } = useCenter()

  // Estado para armazenar os dados da tabela
  const [tableData, setTableData] = useState([
    {
      name: 'Event A',
      description: 'This is event A',
      startDate: '2023-10-01',
      endDate: '2023-10-05',
      fee: '$50',
      status: 'Active'
    },
    {
      name: 'Event B',
      description: 'This is event B',
      startDate: '2023-11-01',
      endDate: '2023-11-05',
      fee: '$75',
      status: 'Inactive'
    },
    {
      name: 'Event C',
      description: 'This is event C',
      startDate: '2023-12-01',
      endDate: '2023-12-05',
      fee: '$100',
      status: 'Active'
    }
  ])

  // Função para adicionar um novo dado à tabela
  const handleAddNewData = () => {
    const newData = {
      name: 'Event D',
      description: 'This is event D',
      startDate: '2024-01-01',
      endDate: '2024-01-05',
      fee: '$150',
      status: 'Active'
    }
    setTableData([...tableData, newData])
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      <div className="flex flex-1 pt-[62px] lg:pt-[70px] overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto p-4">
          <div className="flex flex-col flex-1 w-11/12 mx-auto">
            <h2 className="text-3xl text-zinc-400">Cursos</h2>
            <article className="text-zinc-600 mt-3">
              <p>Cursos de Excelência no (a) {center?.name}</p>
            </article>

            {/* Botão para adicionar novo dado  ToDo alinhar a directa*/}
            <button
              onClick={handleAddNewData}
              className="bg-orange-700 text-white px-4 py-2 rounded hover:brightness-110 transition-all mt-4 self-end"
            >
              Criar Novo Curso
            </button>
            {/* Tabela */}
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full border-collapse block md:table">
                <thead className="block md:table-header-group">
                  <tr className="block border border-zinc-700 md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                    <th className="bg-orange-800 text-white p-2 md:border md:border-zinc-700 text-center block md:table-cell">
                      Nome
                    </th>
                    <th className="bg-orange-800 text-white p-2 md:border md:border-zinc-700 text-center block md:table-cell">
                      Descrição
                    </th>
                    <th className="bg-orange-800 text-white p-2 md:border md:border-zinc-700 text-center block md:table-cell">
                      Data de Ínicio
                    </th>
                    <th className="bg-orange-800 text-white p-2 md:border md:border-zinc-700 text-center block md:table-cell">
                      Data de Termino
                    </th>
                    <th className="bg-orange-800 text-white p-2 md:border md:border-zinc-700 text-center block md:table-cell">
                      Propina (Kz)
                    </th>
                    <th className="bg-orange-800 text-white p-2 md:border md:border-zinc-700 text-center block md:table-cell">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="block md:table-row-group">
                  {tableData.map((row, index) => (
                    <tr
                      key={index}
                      className="bg-zinc-800 border border-zinc-700 block md:table-row"
                    >
                      <td className="p-2 md:border md:border-zinc-700 text-left block md:table-cell">
                        {row.name}
                      </td>
                      <td className="p-2 md:border md:border-zinc-700 text-left block md:table-cell">
                        {row.description}
                      </td>
                      <td className="p-2 md:border md:border-zinc-700 text-center block md:table-cell">
                        {row.startDate}
                      </td>
                      <td className="p-2 md:border md:border-zinc-700 text-center block md:table-cell">
                        {row.endDate}
                      </td>
                      <td className="p-2 md:border md:border-zinc-700 text-right block md:table-cell">
                        {row.fee}
                      </td>
                      <td className="p-2 md:border md:border-zinc-700 text-left block md:table-cell">
                        {row.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
