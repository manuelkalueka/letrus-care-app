import React from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup
  .object({
    name: yup.string().required('Preecha o name'),
    birthDate: yup.date().required('Preecha data de nascimento'),
    gender: yup.string().required(),
    father: yup.string(),
    mother: yup.string(),
    address: yup.string(),
    phoneNumber: yup.string(),
    email: yup.string()
  })
  .required()
type FormData = yup.InferType<typeof schema>

export const Panel: React.FC = () => {
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
    <nav className="border shadow-shape rounded px-8 mt-6 border-zinc-800">
      <ul className="flex items-center justify-around bg-zinc-600">
        <li className="cursor-pointer">Dados Pessoais</li>
        <li className="cursor-pointer">Contactos</li>
        <li className="cursor-pointer">Dados da Inscrição</li>
      </ul>
      <div className="panel-block">
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 flex-col my-[5%]">
          <input
            {...register('name')}
            placeholder="Nome do Aluno"
            autoComplete="name webauthn"
            type="text"
            className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
          />
          <span className="text-red-500">{errors.name?.message}</span>
          <input
            {...register('birthDate')}
            placeholder="Nasceu em"
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
          <input
            {...register('father')}
            placeholder="Nome do Pai"
            autoComplete="name webauthn"
            type="text"
            className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
          />
          <input
            {...register('mother')}
            placeholder="Nome da Mãe"
            autoComplete="name webauthn"
            type="text"
            className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
          />
          <input
            {...register('address')}
            placeholder="Endereço Completo onde moram com o Aluno"
            autoComplete="name webauthn"
            type="text"
            className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
          />
          <input
            {...register('phoneNumber')}
            placeholder="Número de Telefone"
            autoComplete="name webauthn"
            type="tel"
            className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
          />
          <input
            {...register('email')}
            placeholder="E-mail"
            autoComplete="name webauthn"
            type="email"
            className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
          />
          <button
            type="submit"
            className="bg-orange-700 w-full h-12 p-3 text-white shadow-shape rounded-md"
          >
            Finalizar
          </button>
        </form>
      </div>
    </nav>
  )
}
