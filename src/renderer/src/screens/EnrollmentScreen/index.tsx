import React, { useEffect, useState } from 'react'
import { Sidebar } from '@renderer/components/Sidebar'
import { Header } from '@renderer/components/Header'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '@renderer/utils/format'
import { getEnrollmentsService } from '@renderer/services/enrollment-service'
import { useCenter } from '@renderer/contexts/center-context'
import { Download, DownloadCloud, Eye, PenSquare } from 'lucide-react'

export const EnrollmentScreen: React.FC = () => {
  const navigate = useNavigate()
  const { center } = useCenter()
  const ENROLLMENT_STATUS = ['Inscrito', 'Completa', 'Cancelado']

  const [enrollments, setEnrolments] = useState<Array<object> | null>(null)

  useEffect(() => {
    async function getEnrollments(): Promise<void> {
      const data = await getEnrollmentsService(center?._id)
      setEnrolments(data)
    }

    getEnrollments()
  }, [])

  const handleEdit = async (id: string) => {
    console.log('Tela de Editar Curso')
  }
  const handleDelete = async (id: string): Promise<void> => {
    const ispermitted = confirm('Tens a Certeza, ToDo Personalizar o Confirm')
    if (ispermitted) {
      //ToDo, atualizar a lista depois de eliminar
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      <div className="flex flex-1 pt-[62px] lg:pt-[70px] overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto p-4">
          <div className="flex flex-col flex-1 w-11/12 mx-auto">
            <h2 className="text-3xl text-zinc-400">Inscrições</h2>

            {/* Botão para adicionar novo dado  ToDo alinhar a directa*/}
            <button
              onClick={() => {
                navigate('/enrollment/new')
              }}
              className="bg-orange-700 text-white px-4 py-2 rounded hover:brightness-110 transition-all mt-4 self-end"
            >
              Inscrever novo Aluno
            </button>
            {/* Tabela */}
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full border-collapse block md:table">
                <thead className="block md:table-header-group">
                  <tr className="block border border-zinc-700 md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                    <th className="bg-orange-800 text-white p-2 md:border md:border-zinc-700 text-center block md:table-cell">
                      Nº de Inscrição
                    </th>
                    <th className="bg-orange-800 text-white p-2 md:border md:border-zinc-700 text-center block md:table-cell">
                      Nome Completo
                    </th>
                    <th className="bg-orange-800 text-white p-2 md:border md:border-zinc-700 text-center block md:table-cell">
                      Curso
                    </th>
                    <th className="bg-orange-800 text-white p-2 md:border md:border-zinc-700 text-center block md:table-cell">
                      Nível
                    </th>
                    <th className="bg-orange-800 text-white p-2 md:border md:border-zinc-700 text-center block md:table-cell">
                      Data de Inscrição
                    </th>
                    <th className="bg-orange-800 text-white p-2 md:border md:border-zinc-700 text-center block md:table-cell">
                      Status
                    </th>
                    <th className="bg-orange-800 text-white p-2 md:border md:border-zinc-700 text-center block md:table-cell">
                      Acções
                    </th>
                  </tr>
                </thead>

                <tbody className="block md:table-row-group">
                  {enrollments &&
                    enrollments.map((row, index) => (
                      <tr
                        key={index}
                        className="bg-zinc-800 border border-zinc-700 block md:table-row"
                      >
                        <td className="p-2 md:border md:border-zinc-700 text-left block md:table-cell">
                          {row?.studentId?.studentCode}
                        </td>
                        <td className="p-2 md:border md:border-zinc-700 text-left block md:table-cell">
                          {row?.studentId?.name.fullName}
                        </td>
                        <td className="p-2 md:border md:border-zinc-700 text-center block md:table-cell">
                          {row?.courseId?.name}
                        </td>
                        <td className="p-2 md:border md:border-zinc-700 text-center block md:table-cell">
                          {row?.grade?.grade}
                        </td>
                        <td className="p-2 md:border md:border-zinc-700 text-center block md:table-cell">
                          {formatDate(row?.enrollmentDate)}
                        </td>
                        <td className="p-2 md:border md:border-zinc-700 text-center block md:table-cell">
                          {row?.status === 'enrolled'
                            ? ENROLLMENT_STATUS[0]
                            : row?.status === 'completed'
                              ? ENROLLMENT_STATUS[1]
                              : ENROLLMENT_STATUS.pop()}
                        </td>
                        <td className="p-2 md:border md:border-zinc-700 text-center block md:table-cell">
                          {/* Botões para Ações */}
                          <div className="flex items-center justify-evenly gap-1">
                            <button
                              onClick={() => handleDelete(row?._id)}
                              className="bg-zinc-500 text-white px-2 py-1 rounded hover:brightness-125"
                            >
                              <Eye />
                            </button>
                            <button
                              onClick={() => handleEdit(row?._id)}
                              className="bg-orange-200 text-orange-700 px-2 py-1 rounded hover:brightness-125"
                            >
                              <DownloadCloud />
                            </button>
                            <button
                              onClick={() => handleEdit(row?._id)}
                              className="bg-yellow-700 text-white px-2 py-1 rounded hover:brightness-125"
                            >
                              <PenSquare />
                            </button>
                          </div>
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
