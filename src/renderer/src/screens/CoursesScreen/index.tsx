import React, { useEffect, useState } from 'react'

import { Header } from '@renderer/components/Header'
import { Sidebar } from '@renderer/components/Sidebar'
import { useCenter } from '@renderer/contexts/center-context'
import { Modal } from '@renderer/components/Modal'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import withReactContent from 'sweetalert2-react-content'
import {
  createCourse,
  deleteCourseService,
  getCoursesService
} from '@renderer/services/course-service'
import { formatDate, formateCurrency } from '@renderer/utils/format'
import { LoaderComponent } from '@renderer/components/Loader'

export const CoursesScreen: React.FC = () => {
  const { center } = useCenter()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const handleEdit = async (id: string) => {
    console.log('Tela de Editar Curso')
  }
  const handleDelete = async (id: string): Promise<void> => {
    const ispermitted = confirm('Tens a Certeza, ToDo Personalizar o Confirm')
    if (ispermitted) {
      await deleteCourseService(id)
      //ToDo, atualizar a lista depois de eliminar
    }
  }
  const schema = yup
    .object({
      name: yup.string().required('Preecha o nome do curso'),
      description: yup.string().required('Explique um pouco sobre o curso'),
      startDate: yup.date().required(),
      endDate: yup.date().required(),
      fee: yup.number().required('Preecha a propina'),
      centerId: yup.string().required(),
      status: yup.string().oneOf(['active', 'inactive'])
    })
    .required()
  type FormData = yup.InferType<typeof schema>

  const ModalCreateCourse: React.FC = () => {
    const MySwal = withReactContent(Swal)

    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm<FormData>({
      resolver: yupResolver(schema)
    })
    const onSubmit = async (data: FormData): Promise<void> => {
      try {
        await createCourse(data)
        closeModal()
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Curso Adicionado',
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            popup: 'h-44 p-2', // Define a largura e o padding do card
            title: 'text-sm', // Tamanho do texto do título
            icon: 'text-xs' // Reduz o tamanho do ícone
          },
          timerProgressBar: true // Ativa a barra de progresso
        })
      } catch (error) {
        MySwal.fire({
          title: 'Erro interno',
          text: 'Erro ao cadastrar curso.',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 flex-col my-[5%]">
        <label className="text-gray-200" htmlFor="name">
          Nome do Curso
        </label>
        <input
          {...register('name')}
          placeholder="Nome do curso"
          id="name"
          type="text"
          className="w-full h-12 p-3  bg-zinc-950 rounded-md focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
        />
        <span className="text-red-500">{errors.name?.message}</span>

        <label className="text-gray-200" htmlFor="description">
          Descrição
        </label>
        <input
          {...register('description')}
          placeholder="Descrição"
          id="description"
          type="text"
          maxLength={120}
          className="w-full h-12 p-3 bg-zinc-950 rounded-md focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
        />
        <span className="text-red-500">{errors.description?.message}</span>
        <label className="text-gray-200" htmlFor="startDate">
          Data de Ínicio
        </label>
        <input
          {...register('startDate')}
          id="startDate"
          type="date"
          required
          className="w-full h-12 p-3 bg-zinc-950 rounded-md focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
        />
        <label className="text-gray-200" htmlFor="fee">
          Propina Mensal (Kz)
        </label>
        <input
          {...register('fee')}
          placeholder="Propina"
          id="fee"
          type="number"
          min={0}
          className="w-full h-12 p-3 bg-zinc-950 rounded-md focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
        />
        <span className="text-red-500">{errors.fee?.message}</span>
        <label className="text-gray-200" htmlFor="endDate">
          Data de Término
        </label>
        <input
          {...register('endDate')}
          id="endDate"
          type="date"
          required
          className="w-full h-12 p-3 bg-zinc-950 rounded-md focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
        />
        <input {...register('centerId')} type="hidden" value={center?._id} required />
        <button
          type="submit"
          className="bg-orange-700 w-full h-12 p-3 text-white shadow-shape rounded-md"
        >
          Criar
        </button>
      </form>
    )
  }
  const [courses, setCourses] = useState<Array<object> | null>(null)
  const [isLoaderCourseList, setIsLoaderCourseList] = useState(true)

  useEffect(() => {
    async function getCourses(): Promise<void> {
      const data = await getCoursesService(center?._id)
      setCourses(data)
      setIsLoaderCourseList(true)
    }

    getCourses()
  }, [isModalOpen])

  return isLoaderCourseList ? (
    <LoaderComponent />
  ) : (
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
              onClick={openModal}
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
                    <th className="bg-orange-800 text-white p-2 md:border md:border-zinc-700 text-center block md:table-cell">
                      Acções
                    </th>
                  </tr>
                </thead>

                <tbody className="block md:table-row-group">
                  {courses &&
                    courses.map((row, index) => (
                      <tr
                        key={index}
                        className="bg-zinc-800 border border-zinc-700 block md:table-row"
                      >
                        <td className="p-2 md:border md:border-zinc-700 text-left block md:table-cell">
                          {row?.name}
                        </td>
                        <td className="p-2 md:border md:border-zinc-700 text-left block md:table-cell">
                          {row?.description}
                        </td>
                        <td className="p-2 md:border md:border-zinc-700 text-center block md:table-cell">
                          {formatDate(row?.startDate)}
                        </td>
                        <td className="p-2 md:border md:border-zinc-700 text-center block md:table-cell">
                          {formatDate(row?.endDate)}
                        </td>
                        <td className="p-2 md:border md:border-zinc-700 text-right block md:table-cell">
                          {formateCurrency(row?.fee)}
                        </td>
                        <td className="p-2 md:border md:border-zinc-700 text-left block md:table-cell">
                          {row?.status}
                        </td>
                        <td className="p-2 md:border md:border-zinc-700 text-left block md:table-cell">
                          {/* Botões para Ações */}
                          <div className="flex items-center justify-evenly gap-1">
                            <button
                              onClick={() => handleEdit(row?._id)}
                              className="bg-yellow-700 text-white px-2 py-1 rounded hover:brightness-125"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(row?._id)}
                              className="bg-red-800 text-white px-2 py-1 rounded hover:brightness-125"
                            >
                              Deletar
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

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div>
          <h2 className="text-3xl">Criar Curso</h2>
          <div className="bg-orange-700 text-orange-700 h-2 mt-2 w-16" />
          <ModalCreateCourse />
        </div>
      </Modal>
    </div>
  )
}
