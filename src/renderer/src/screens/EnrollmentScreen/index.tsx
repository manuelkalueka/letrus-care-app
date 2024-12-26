import React, { useEffect, useState } from 'react'
import { Sidebar } from '@renderer/components/Sidebar'
import { useNavigate } from 'react-router'
import { formatDate } from '@renderer/utils/format'
import {
  getEnrollmentsService,
  getOneEnrollmentService
} from '@renderer/services/enrollment-service'
import { useCenter } from '@renderer/contexts/center-context'
import { DownloadCloud, Eye, PenSquare } from 'lucide-react'
import { Modal } from '@renderer/components/Modal'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { getCoursesService } from '@renderer/services/course-service'
import { getGradesService } from '@renderer/services/grade-service'
import { Footer } from '@renderer/components/Footer'
import { HeaderMain } from '@renderer/components/HeaderMain'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { EnrollmentPDF } from '@renderer/reports/models/EnrollmentPDF'

const schema = yup
  .object({
    fullName: yup
      .string()
      .required('Preecha o Nome Completo')
      .test('fullName', 'Insira um nome completo válido', (value) => {
        // Verifica se o valor contém pelo menos um espaço em branco
        return /\s/.test(value)
      }),
    surname: yup.string(),
    birthDate: yup.date().required('Preecha data de nascimento'),
    gender: yup.string().oneOf(['masculino', 'feminino']).required('Seleciona um género'),
    father: yup
      .string()
      .required('Preecha o nome do Pai')
      .test('father', 'Insira um nome completo válido', (value) => {
        // Verifica se o valor contém pelo menos um espaço em branco
        return /\s/.test(value)
      }),
    mother: yup
      .string()
      .required('Preecha o nome do Mãe')
      .test('mother', 'Insira um nome completo válido', (value) => {
        // Verifica se o valor contém pelo menos um espaço em branco
        return /\s/.test(value)
      }),
    address: yup.string().required('Preecha o Endereço'),
    phoneNumber: yup.string().required('Preecha o Telefone'),
    email: yup.string().email('Email Inválido'),
    grade: yup.string().required('Seleciona um nível'),
    course: yup.string().required('Seleciona um curso disponível'),
    doc_file: yup.mixed().nullable(),
    image_file: yup.mixed().nullable(),
    userId: yup.string().required(),
    centerId: yup.string().required()
  })
  .required()

type FormData = yup.InferType<typeof schema>

interface ModalEditEnrollmentProps {
  data: object | null
  onClose: () => void
}
const ModalEditEnrollment: React.FC<ModalEditEnrollmentProps> = ({
  data: enrollmentInfo,
  onClose: closeModal
}) => {
  const MySwal = withReactContent(Swal)
  const { center } = useCenter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData): Promise<void> => {
    try {
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

  const [courses, setCourses] = useState<Array<object> | null>(null)

  useEffect(() => {
    async function getCourses(): Promise<void> {
      const data = await getCoursesService(center?._id)
      setCourses(Object(data))
    }

    getCourses()
  }, [])

  const [grades, setGrades] = useState<Array<object> | null>(null)

  useEffect(() => {
    async function getGrades(): Promise<void> {
      const data = await getGradesService(center?._id)
      setGrades(Object(data))
    }

    getGrades()
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-[5%]">
      <div className="flex flex-col overflow-y-auto gap-2">
        <label htmlFor="fullName">
          Nome Completo <span className="text-orange-700">*</span>
        </label>
        <input
          id="fullName"
          {...register('fullName')}
          defaultValue={enrollmentInfo?.studentId?.name.fullName}
          placeholder="Nome Completo do Aluno"
          autoComplete="fullName webauthn"
          type="text"
          className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
        />
        {errors.fullName && <span className="text-red-500">{errors.fullName?.message}</span>}
        <label htmlFor="surname">Alcunha</label>
        <input
          id="surname"
          defaultValue={enrollmentInfo?.studentId?.name?.surname}
          {...register('surname')}
          placeholder="Alcunha"
          type="text"
          className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
        />
        {errors.surname && <span className="text-red-500">{errors.surname?.message}</span>}
        <label htmlFor="birthDate">
          Data de Nascimento <span className="text-orange-700">*</span>
        </label>
        <input
          id="birthDate"
          {...register('birthDate')}
          placeholder="Nasceu em"
          autoComplete="bday-day"
          defaultValue={
            enrollmentInfo?.studentId?.birthDate
              ? new Date(enrollmentInfo.studentId.birthDate).toISOString().split('T')[0]
              : ''
          }
          type="date"
          className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
          required
        />
        {errors.birthDate && <span className="text-red-500">{errors.birthDate?.message}</span>}
        <label htmlFor="gender">
          Género <span className="text-orange-700">*</span>
        </label>
        <input
          {...register('gender')}
          className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
          defaultValue={enrollmentInfo?.studentId?.gender || 'Kalueka'}
          list="list-gender"
        />

        <datalist id="list-gender">
          <option value="masculino" />
          <option value="feminino" />
        </datalist>

        {errors.gender && <span className="text-red-500">{errors.gender?.message}</span>}
        <label htmlFor="father">
          Nome do Pai <span className="text-orange-700">*</span>
        </label>
        <input
          id="father"
          {...register('father')}
          placeholder="Nome do Pai"
          defaultValue={enrollmentInfo?.studentId?.parents.father}
          autoComplete="additional-name"
          type="text"
          className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
        />
        {errors.father && <span className="text-red-500">{errors.father?.message}</span>}
        <label htmlFor="mother">
          Nome da Mãe <span className="text-orange-700">*</span>
        </label>
        <input
          {...register('mother')}
          id="mother"
          placeholder="Nome da Mãe"
          defaultValue={enrollmentInfo?.studentId?.parents.mother}
          autoComplete="additional-name"
          type="text"
          className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
        />
        {errors.mother && <span className="text-red-500">{errors.mother?.message}</span>}
        <label htmlFor="address">
          Endereço <span className="text-orange-700">*</span>
        </label>
        <input
          id="address"
          {...register('address')}
          defaultValue={enrollmentInfo?.studentId?.address}
          placeholder="Endereço Completo onde moram com o Aluno"
          autoComplete="address-level1"
          type="text"
          className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
        />
        {errors.address && <span className="text-red-500">{errors.address?.message}</span>}
        <label htmlFor="course">
          Curso <span className="text-orange-700">*</span>
        </label>
        <select
          id="course"
          {...register('course')}
          className="flex-1 w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
          value={enrollmentInfo?.courseId?.name}
        >
          {courses?.map((course, index) => (
            <option value={course?._id} key={index}>
              {course?.name}
            </option>
          ))}
        </select>
        {errors.course && <span className="text-red-500">{errors.course?.message}</span>}
        <label htmlFor="grade">
          Nível <span className="text-orange-700">*</span>
        </label>
        <select
          id="grade"
          {...register('grade')}
          className="flex-1 w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
          defaultValue={enrollmentInfo?.grade?._id || ''}
        >
          {grades?.map((grade, index) => (
            <option value={grade?._id} key={index}>
              {grade?.grade}
            </option>
          ))}
        </select>
        {errors.grade && <span className="text-red-500">{errors.grade?.message}</span>}
        <label htmlFor="phoneNumber">
          Telefone <span className="text-orange-700">*</span>
        </label>
        <input
          id="phoneNumber"
          {...register('phoneNumber')}
          defaultValue={enrollmentInfo?.studentId?.phoneNumber}
          placeholder="Número de Telefone"
          autoComplete="tel"
          type="tel"
          className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
        />
        {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber?.message}</span>}
        <label htmlFor="phoneNumber">E-mail</label>
        <input
          {...register('email')}
          placeholder="E-mail"
          defaultValue={enrollmentInfo?.studentId?.email}
          autoComplete="email"
          type="email"
          className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
        />
        {errors.email && <span className="text-red-500">{errors.email?.message}</span>}
        <div className="flex w-1/3 gap-6 self-end justify-end">
          <button
            type="reset"
            className="bg-transparent border-zinc-400 border-2  h-12 p-3 mt-6 text-white shadow-shape rounded-md hover:brightness-110"
            onClick={() => {
              closeModal()
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-orange-700 h-12 p-3 mt-6 text-white shadow-shape rounded-md hover:brightness-110"
          >
            Salvar
          </button>
        </div>
      </div>
    </form>
  )
}

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

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [enrollmentInfo, setEnrollmentInfo] = useState<object | null>(null)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const handleEdit = async (id: string) => {
    try {
      const data = await getOneEnrollmentService(id)
      setEnrollmentInfo(data)
      openModal()
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
    const ispermitted = confirm('Tens a Certeza, ToDo Personalizar o Confirm')
    if (ispermitted) {
      // await deleteCourseService(id)
      //ToDo, atualizar a lista depois de eliminar
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <HeaderMain />

      <div className="flex flex-1 pt-[62px] lg:pt-[70px] overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 pt-4 overflow-auto">
          <div className="flex flex-col flex-1 w-11/12 mx-auto">
            <h2 className="text-3xl text-zinc-400">Inscrições</h2>

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
                            <PDFDownloadLink
                              document={<EnrollmentPDF enrollment={row} />}
                              fileName={`comprovativo-inscricao-${row?.studentId?.name.surname}-${Date.now()}.pdf`}
                            >
                              <button className="bg-orange-200 text-orange-700 px-2 py-1 rounded hover:brightness-125">
                                <DownloadCloud />
                              </button>
                            </PDFDownloadLink>

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
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <div>
                <h2 className="text-3xl">Editar Inscrição</h2>
                <div className="bg-orange-700 text-orange-700 h-2 mt-2 w-16" />
                <ModalEditEnrollment data={enrollmentInfo} onClose={closeModal} />
              </div>
            </Modal>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
