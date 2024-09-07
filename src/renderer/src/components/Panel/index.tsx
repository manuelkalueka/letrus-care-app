import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { createEnrollment } from '@renderer/services/enrollment-service'
import Swal from 'sweetalert2'
import { useCenter } from '@renderer/contexts/center-context'
import { getCoursesService } from '@renderer/services/course-service'
import { getGradesService } from '@renderer/services/grade-service'

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
    courses: yup.string().required('Seleciona um curso disponível'),
    doc_file: yup.string(),
    image_file: yup.string()
  })
  .required()
type FormData = yup.InferType<typeof schema>

export const Panel: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const { center } = useCenter()

  const [courses, setCourses] = useState<Array<object> | null>(null)

  useEffect(() => {
    async function getCourses(): Promise<void> {
      const data = await getCoursesService()
      setCourses(data)
    }

    getCourses()
  }, [])

  const [grades, setGrades] = useState<Array<object> | null>(null)

  useEffect(() => {
    async function getGrades(): Promise<void> {
      const data = await getGradesService()
      setGrades(data)
    }

    getGrades()
  }, [])

  const onSubmit = async (data: FormData): Promise<void> => {
    try {
      const {
        father,
        mother,
        address,
        birthDate,
        gender,
        grade,
        fullName,
        surname,
        phoneNumber,
        email
      } = data
      const parents = { father, mother }
      const name = { fullName, surname }
      const centerId = center?._id
      await createEnrollment({
        parents,
        address,
        birthDate,
        gender,
        grade,
        phoneNumber,
        email,
        name,
        centerId
      })
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Inscrição Salva, baixe o comprovativo!!',
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: 'h-44 p-2', // Define a largura e o padding do card
          title: 'text-sm', // Tamanho do texto do título
          icon: 'text-xs' // Reduz o tamanho do ícone
        },
        timerProgressBar: true // Ativa a barra de progresso
      })
      reset()
    } catch (error) {
      Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: 'Verifique os dados',
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

  const [activeForm, setActiveForm] = useState<'student' | 'contact' | 'enrollment'>('student')

  const ContactForm: React.FC = () => {
    return (
      <>
        <label htmlFor="phoneNumber">
          Telefone <span className="text-orange-700">*</span>
        </label>
        <input
          id="phoneNumber"
          {...register('phoneNumber')}
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
          autoComplete="email"
          type="email"
          className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
        />
        {errors.email && <span className="text-red-500">{errors.email?.message}</span>}
      </>
    )
  }
  const StudentForm: React.FC = () => {
    return (
      <>
        <label htmlFor="fullName">
          Nome Completo <span className="text-orange-700">*</span>
        </label>
        <input
          id="fullName"
          {...register('fullName')}
          placeholder="Nome Completo do Aluno"
          autoComplete="fullName webauthn"
          type="text"
          className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
        />
        {errors.fullName && <span className="text-red-500">{errors.fullName?.message}</span>}
        <label htmlFor="birthDate">
          Data de Nascimento <span className="text-orange-700">*</span>
        </label>
        <input
          id="birthDate"
          {...register('birthDate')}
          placeholder="Nasceu em"
          autoComplete="bday-day"
          type="date"
          className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
          required
        />
        {errors.birthDate && <span className="text-red-500">{errors.birthDate?.message}</span>}
        <select
          {...register('gender')}
          className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
        >
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </select>
        {errors.gender && <span className="text-red-500">{errors.gender?.message}</span>}
        <label htmlFor="father">
          Nome do Pai <span className="text-orange-700">*</span>
        </label>
        <input
          id="father"
          {...register('father')}
          placeholder="Nome do Pai"
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
          placeholder="Endereço Completo onde moram com o Aluno"
          autoComplete="address-level1"
          type="text"
          className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
        />
        {errors.address && <span className="text-red-500">{errors.address?.message}</span>}
      </>
    )
  }
  const EnrollmentForm: React.FC = () => {
    return (
      <>
        <div className="flex items-center gap-12 justify-between">
          <div className="flex flex-col gap-4 w-1/2">
            <label htmlFor="courses">
              Curso <span className="text-orange-700">*</span>
            </label>
            <select
              id="courses"
              {...register('courses')}
              className="flex-1 w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
            >
              {courses?.map((course, index) => (
                <option value={course?.name} key={index}>
                  {course?.name}
                </option>
              ))}
            </select>
            {errors.courses && <span className="text-red-500">{errors.courses?.message}</span>}
            <label htmlFor="grade">
              Nível <span className="text-orange-700">*</span>
            </label>
            <select
              id="grade"
              {...register('grade')}
              className="flex-1 w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
            >
              {grades?.map((grade, index) => (
                <option value={grade?.grade} key={index}>
                  {grade?.grade}
                </option>
              ))}
            </select>
            {errors.grade && <span className="text-red-500">{errors.grade?.message}</span>}
          </div>
          <div className="flex flex-col justify-between gap-4 w-1/2">
            <label htmlFor="doc_file">Cópia do Documento de Identidade (tamanho máx. 1MB)</label>
            <input
              id="doc_file"
              type="file"
              accept=".png,.jpg,.jpeg,.pdf"
              {...register('doc_file')}
              className="flex-1 w-full h-12 p-3  bg-zinc-950 border rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
            />
            <label htmlFor="image_file">Foto 4x4 (tamanho máx. 1MB)</label>
            <input
              id="image_file"
              type="file"
              accept=".png,.jpg,.jpeg,.pdf"
              {...register('image_file')}
              className="flex-1 w-full h-12 p-3  bg-zinc-950 rounded-md  border focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-orange-700 w-1/6 h-12 p-3 mt-6 text-white shadow-shape rounded-md self-end hover:brightness-110"
        >
          Finalizar
        </button>
      </>
    )
  }
  return (
    <div className="border rounded mt-6 border-zinc-800">
      <nav>
        <ul className="flex items-center justify-around bg-zinc-800 h-12 gap-24">
          <li
            className={`text-zinc-400 flex-1 h-full flex items-center justify-center cursor-pointer bg-zinc-800 hover:brightness-150 ${activeForm === 'student' && 'brightness-150'}`}
            onClick={() => {
              setActiveForm('student')
            }}
          >
            Dados Pessoais
          </li>
          <li
            className={`text-zinc-400 flex-1 h-full flex items-center justify-center cursor-pointer bg-zinc-800 hover:brightness-150 ${activeForm === 'contact' && 'brightness-150'}`}
            onClick={() => {
              setActiveForm('contact')
            }}
          >
            Contactos
          </li>
          <li
            className={`text-zinc-400 flex-1 h-full flex items-center justify-center cursor-pointer bg-zinc-800 hover:brightness-150 ${activeForm === 'enrollment' && 'brightness-150'}`}
            onClick={() => {
              setActiveForm('enrollment')
            }}
          >
            Dados da Inscrição
          </li>
        </ul>
      </nav>
      <div className="px-8 my-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-3 flex-col my-2"
          encType="multipart/form-data"
        >
          {activeForm === 'student' ? (
            <StudentForm />
          ) : activeForm === 'contact' ? (
            <ContactForm />
          ) : (
            <EnrollmentForm />
          )}
        </form>
      </div>
    </div>
  )
}
