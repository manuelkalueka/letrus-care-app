import React from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Swal from 'sweetalert2'

const schema = yup
  .object({
    name: yup.string().required('Preecha o Nome do Centro'),
    address: yup.date().required('Preecha o endereço do centro'),
    phoneNumber: yup.string().required('Preecha o Telefone'),
    email: yup.string().email('Email Inválido'),
    nif: yup.string().required('Número de contribuinte Obrigatório')
  })
  .required()
type FormData = yup.InferType<typeof schema>

export const CreateCenterScreen: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  const onSubmit = async (data: FormData): Promise<void> => {
    try {
      // await createEnrollment({
      //   parents,
      //   address,
      //   address,
      //   enrollmentDate,
      //   gender,
      //   grade,
      //   phoneNumber,
      //   email,
      //   name
      // })
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

  return (
    <div className="h-screen bg-center_bg bg-no-repeat bg-center bg-cover flex items-center justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-orange-800 opacity-85"></div>
      <div className="relative z-10 rounded w-9/12 mx-auto bg-zinc-950 py-10 px-20">
        <h2 className="text-3xl text-zinc-500">Criar Centro</h2>
        <p className="text-base text-zinc-600 mt-3">Crie seu centro para começar a geri-lo🏫</p>

        <div className="p-8 rounded border border-zinc-800 mt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 flex-col my-2">
            <label htmlFor="center-name">
              Nome <span className="text-orange-700">*</span>
            </label>
            <input
              id="center-name"
              {...register('name')}
              placeholder="Ex.: Centro ABC"
              type="text"
              className="w-full h-12 p-3 bg-zinc-950 rounded-md focus:border-0 border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
            />
            {errors.name && <span className="text-red-500">{errors.name?.message}</span>}

            <label htmlFor="center-address">
              Endereço <span className="text-orange-700">*</span>
            </label>
            <input
              id="center-address"
              {...register('name')}
              placeholder="Endereço do Centro"
              type="text"
              className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
            />
            {errors.address && <span className="text-red-500">{errors.address?.message}</span>}
            <label htmlFor="center-address">
              NIF <span className="text-orange-700">*</span>
            </label>
            <input
              id="center-nif"
              {...register('nif')}
              placeholder="número de contribuinte"
              type="text"
              className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
            />
            {errors.nif && <span className="text-red-500">{errors.nif?.message}</span>}
            <label htmlFor="center-phone">
              Telefone <span className="text-orange-700">*</span>
            </label>
            <input
              {...register('phoneNumber')}
              placeholder="Número de Telefone"
              autoComplete="tel"
              type="tel"
              className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
            />
            {errors.phoneNumber && (
              <span className="text-red-500">{errors.phoneNumber?.message}</span>
            )}
            <label htmlFor="center-email">Email</label>
            <input
              {...register('email')}
              placeholder="E-mail"
              autoComplete="tel"
              type="tel"
              className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
            />
            {errors.email && <span className="text-red-500">{errors.email?.message}</span>}
            <button
              type="submit"
              className="bg-orange-700 w-1/6 h-12 p-3 mt-6 text-white shadow-shape rounded-md self-end hover:brightness-110"
            >
              Criar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
