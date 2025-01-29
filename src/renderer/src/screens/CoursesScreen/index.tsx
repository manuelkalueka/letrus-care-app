import React, { useEffect, useState } from 'react'

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
  editCourse,
  getCoursesService,
  getOneCourseService
} from '@renderer/services/course-service'
import { formatDate, formateCurrency } from '@renderer/utils/format'
import { LoaderComponent } from '@renderer/components/Loader'
import { Rings } from 'react-loader-spinner'
import { Footer } from '@renderer/components/Footer'
import { HeaderMain } from '@renderer/components/HeaderMain'
import Pagination from '@renderer/components/Pagination'

export const CoursesScreen: React.FC = () => {
  const { center } = useCenter()

  const [courseInfo, setCourseInfo] = useState<object | null>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const openEditModal = () => setIsEditModalOpen(true)
  const closeEditModal = () => setIsEditModalOpen(false)

  const handleEdit = async (id: string) => {
    try {
      const data = await getOneCourseService(id) //busca curso na db
      setCourseInfo(data)
      openEditModal()
    } catch (error) {
      Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: 'Erro ao carregar informações',
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: 'h-44 p-2', // Define a largura e o padding do card
          title: 'text-sm', // Tamanho do texto do título
          icon: 'text-xs' // Reduz o tamanho do ícone
        },
        timerProgressBar: true // Ativa a barra de progresso
      })
    }
  }
  const handleDelete = async (id: string): Promise<void> => {
    const ispermitted = confirm('Tens a Certeza?')
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
      feeFine: yup.number().required('Preecha a multa'),
      centerId: yup.string().required(),
      status: yup.string().oneOf(['active', 'inactive']),
      courseType: yup.string().oneOf(['on_home', 'on_center'])
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
    const [isSubmitting, setIsSubmitting] = useState(false)
    const onSubmit = async (data: FormData): Promise<void> => {
      try {
        setIsSubmitting(true)
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
        setIsSubmitting(false)
      } catch (error) {
        setIsSubmitting(false)

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
        <label className="text-gray-200" htmlFor="fee">
          Multa por atraso (Kz)
        </label>
        <input
          {...register('feeFine')}
          placeholder="Multa"
          id="feeFine"
          type="number"
          min={0}
          className="w-full h-12 p-3 bg-zinc-950 rounded-md focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
        />
        <span className="text-red-500">{errors.feeFine?.message}</span>
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
        <label className="text-gray-200" htmlFor="courseType">
          Modalidade do Curso
        </label>
        <select
          {...register('courseType')}
          id="courseType"
          required
          className="w-full h-12 p-3 bg-zinc-950 rounded-md focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
        >
          <option value="on_center" selected>
            Centro
          </option>

          <option value="on_home">Domiciliar</option>
        </select>
        <input {...register('centerId')} type="hidden" value={center?._id} required />
        <button
          type="submit"
          className="flex items-center justify-center bg-orange-700 w-full h-12 p-3 text-white shadow-shape rounded-md"
        >
          {isSubmitting ? (
            <Rings
              height="32"
              width="32"
              color="#fff"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            <span>Criar</span>
          )}
        </button>
      </form>
    )
  }
  const [courses, setCourses] = useState<Array<object> | null>(null)
  const [isLoaderCourseList, setIsLoaderCourseList] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  interface ModalEditCourseProps {
    data: object | null
    onClose: () => void
  }

  const ModalEditCourse: React.FC<ModalEditCourseProps> = ({ data: courseInfo, onClose }) => {
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
        setIsSubmitting(true)
        await editCourse(courseInfo?._id, data)
        onClose()
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Novas Informações de Curso Salvas',
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            popup: 'h-44 p-2', // Define a largura e o padding do card
            title: 'text-sm', // Tamanho do texto do título
            icon: 'text-xs' // Reduz o tamanho do ícone
          },
          timerProgressBar: true // Ativa a barra de progresso
        })
        setIsSubmitting(false)
      } catch (error) {
        MySwal.fire({
          title: 'Erro interno',
          text: 'Erro ao Salvar.',
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
          defaultValue={courseInfo?.name}
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
          defaultValue={courseInfo?.description}
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
          defaultValue={
            courseInfo?.startDate ? new Date(courseInfo?.startDate).toISOString().split('T')[0] : ''
          }
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
          defaultValue={courseInfo?.fee}
          id="fee"
          type="number"
          min={0}
          className="w-full h-12 p-3 bg-zinc-950 rounded-md focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
        />
        <span className="text-red-500">{errors.fee?.message}</span>
        <label className="text-gray-200" htmlFor="fee">
          Multa por atraso (Kz)
        </label>
        <input
          {...register('feeFine')}
          placeholder="Multa"
          id="feeFine"
          type="number"
          min={0}
          className="w-full h-12 p-3 bg-zinc-950 rounded-md focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
        />
        <span className="text-red-500">{errors.feeFine?.message}</span>
        <label className="text-gray-200" htmlFor="endDate">
          Data de Término
        </label>
        <input
          {...register('endDate')}
          id="endDate"
          type="date"
          defaultValue={
            courseInfo?.endDate ? new Date(courseInfo?.endDate).toISOString().split('T')[0] : ''
          }
          required
          className="w-full h-12 p-3 bg-zinc-950 rounded-md focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
        />
        <label className="text-gray-200" htmlFor="courseType">
          Modalidade do Curso
        </label>
        <select
          {...register('courseType')}
          id="courseType"
          required
          className="w-full h-12 p-3 bg-zinc-950 rounded-md focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
        >
          <option value="on_center" selected>
            Centro
          </option>

          <option value="on_home">Domiciliar</option>
        </select>
        <input {...register('centerId')} type="hidden" value={center?._id} required />
        <button
          type="submit"
          className="flex items-center justify-center bg-orange-700 w-full h-12 p-3 text-white shadow-shape rounded-md"
        >
          {isSubmitting ? (
            <Rings
              height="32"
              width="32"
              color="#fff"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            <span>Criar</span>
          )}
        </button>
      </form>
    )
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    async function getCourses(page: number): Promise<void> {
      const data = await getCoursesService(center?._id, page)
      setCourses(Object(data?.courses))
      setTotalPages(data?.totalCourses)
      setIsLoaderCourseList(false)
    }

    getCourses(currentPage)
  }, [isEditModalOpen, isModalOpen, currentPage])

  const COURSE_STATUS = ['activo', 'inactivo']
  //Tela Principal
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <HeaderMain />

      <div className="flex justify-center flex-1 pt-[62px] lg:pt-[70px] overflow-hidden">
        <Sidebar />
        {isLoaderCourseList ? (
          <LoaderComponent />
        ) : (
          <div className="flex flex-col flex-1 overflow-auto pt-4">
            <div className="flex flex-col flex-1 w-11/12 mx-auto">
              <h2 className="text-3xl text-zinc-400">Cursos</h2>
              <article className="text-zinc-600 mt-3">
                <p>Cursos de Excelência no (a) {center?.name}</p>
              </article>

              {/* Botão para adicionar novo dado */}
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
                        Modalidade
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
                        Multa (Kz)
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
                            {row?.courseType == 'on_home' ? 'Domiciliar' : 'Centro'}
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
                          <td className="p-2 md:border md:border-zinc-700 text-right block md:table-cell">
                            {formateCurrency(row?.feeFine)}
                          </td>
                          <td className="p-2 md:border md:border-zinc-700 text-center block md:table-cell">
                            {row?.status === 'active'
                              ? COURSE_STATUS[0]
                              : row?.status === 'inactive' && COURSE_STATUS[1]}
                          </td>
                          <td className="p-2 md:border md:border-zinc-700 text-left block md:table-cell">
                            {/* Botões para Ações */}
                            <div className="flex items-center justify-evenly gap-1">
                              <button
                                type="button"
                                onClick={() => handleEdit(row?._id)}
                                className="bg-zinc-200 text-zinc-600 px-2 py-1 rounded hover:brightness-125"
                              >
                                Ver
                              </button>
                              <button
                                type="submit"
                                onClick={() => handleEdit(row?._id)}
                                className="bg-yellow-700 text-white px-2 py-1 rounded hover:brightness-125"
                              >
                                Editar
                              </button>
                              <button
                                type="submit"
                                onClick={() => handleDelete(row?._id)}
                                className="bg-red-800 text-white px-2 py-1 rounded hover:brightness-125"
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
            <Footer />
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div>
          <h2 className="text-3xl">Criar Curso</h2>
          <div className="bg-orange-700 text-orange-700 h-2 mt-2 w-16" />
          <ModalCreateCourse />
        </div>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <div>
          <h2 className="text-3xl">Editar Curso</h2>
          <div className="bg-orange-700 text-orange-700 h-2 mt-2 w-16" />
          <ModalEditCourse data={courseInfo} onClose={closeEditModal} />
        </div>
      </Modal>
    </div>
  )
}
