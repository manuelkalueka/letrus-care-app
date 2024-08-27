import React from 'react'
import { Sidebar } from '@renderer/components/Sidebar'
import { Header } from '@renderer/components/Header'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
const schema = yup
  .object({
    name: yup.string().required('Preecha o name'),
    birthDate: yup.date().required('Preecha data de nascimento'),
    gender: yup.string().required(),
    parents: yup.object(),
    address: yup.string(),
    phoneNumber: yup.string(),
    email: yup.string()
  })
  .required()
type FormData = yup.InferType<typeof schema>

export const EnrollmentScreen: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  const onSubmit = async (data: FormData): Promise<void> => {
    try {
      console.log(data)
    } catch (error) {
      console.log('erro')
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />
      <div className="flex flex-1 pt-[62px] lg:pt-[70px] overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 flex-col my-[5%]">
            <input
              {...register('name')}
              placeholder="Nome do Aluno"
              id="name"
              autoComplete="name webauthn"
              type="text"
              className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
            />
            <span className="text-red-500">{errors.name?.message}</span>
            <input
              {...register('birthDate')}
              placeholder="Nasceu em"
              id="birthDate"
              autoComplete="birthDate webauthn"
              type="date"
              className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
            />
            <span className="text-red-500">{errors.gender?.message}</span>
            <select
              {...register('gender')}
              className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
            >
              <option value="masculino">Masculino</option>
              <option value="feminino">Femenino</option>
            </select>
            <button
              type="submit"
              className="bg-orange-700 w-full h-12 p-3 text-white shadow-shape rounded-md"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
