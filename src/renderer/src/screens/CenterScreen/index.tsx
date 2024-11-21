import { yupResolver } from '@hookform/resolvers/yup'
import { Header } from '@renderer/components/Header'
import { Sidebar } from '@renderer/components/Sidebar'
import { useCenter } from '@renderer/contexts/center-context'
import { CircleHelp } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

import * as yup from 'yup'

const schema = yup
  .object({
    name: yup.string().required('Preecha o Nome do Centro'),
    address: yup.string().required('Preecha o endereço do centro'),
    phoneNumber: yup.string().required('Preecha o Telefone'),
    email: yup.string().email('Email Inválido'),
    nif: yup.string(),
    documentCode: yup.string()
  })
  .required()
type FormData = yup.InferType<typeof schema>

export const CenterScreen: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const { center, editCenterContext } = useCenter()

  const onSubmit = async (data: FormData): Promise<void> => {
    try {
      const { address, email, name, phoneNumber } = data
      await editCenterContext(center?._id, {
        address,
        email,
        name,
        phoneNumber
      })

      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Centro Editado com Sucesso!',
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
      Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: 'Verifique os dados',
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: 'h-44 p-2',
          title: 'text-sm',
          icon: 'text-xs'
        },
        timerProgressBar: true
      })
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />
      <div className="flex flex-1 pt-[62px] lg:pt-[70px]">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <div className="flex-1 overflow-auto p-4">
            <div className="flex flex-col flex-1 w-11/12 mx-auto">
              <h2 className="text-3xl text-zinc-400">{center?.name.toLocaleUpperCase()}</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 flex-col my-11">
                <label htmlFor="center-name">
                  Nome <span className="text-orange-700">*</span>
                </label>
                <input
                  id="center-name"
                  defaultValue={center?.name}
                  {...register('name')}
                  placeholder="Ex.: Centro ABC"
                  type="text"
                  className="w-full h-12 p-3 bg-zinc-950 rounded-md focus:border-0 border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
                />
                <span className="text-red-500">{errors.name?.message}</span>
                <label htmlFor="center-address">
                  Endereço <span className="text-orange-700">*</span>
                </label>
                <input
                  id="center-address"
                  defaultValue={center?.address}
                  {...register('address')}
                  placeholder="Endereço do Centro"
                  type="text"
                  className="w-full h-12 p-3 bg-zinc-950 rounded-md focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
                />
                {errors.address && <span className="text-red-500">{errors.address?.message}</span>}
                <label htmlFor="center-code" className="flex gap-1">
                  Código do Centro{' '}
                  <span className="text-orange-700 hover:cursor-pointer">
                    <CircleHelp size={16} />
                  </span>
                </label>
                <input
                  defaultValue={center?.documentCode}
                  value={center?.documentCode}
                  disabled
                  id="center-code"
                  {...register('documentCode')}
                  placeholder="Ex.: ABC"
                  type="text"
                  className="w-full h-12 p-3 bg-zinc-950 rounded-md focus:border-0 border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
                />
                <span className="text-red-500">{errors.documentCode?.message}</span>
                <label htmlFor="center-nif" className="flex gap-1">
                  NIF{' '}
                  <span className="text-orange-700 hover:cursor-pointer">
                    <CircleHelp size={16} />
                  </span>
                </label>
                <input
                  id="center-nif"
                  {...register('nif')}
                  defaultValue={center?.nif}
                  value={center?.nif}
                  disabled
                  placeholder="número de contribuinte"
                  type="text"
                  className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
                />
                {errors.nif && <span className="text-red-500">{errors.nif?.message}</span>}
                <label htmlFor="center-phone">
                  Telefone <span className="text-orange-700">*</span>
                </label>
                <input
                  id="center-phone"
                  {...register('phoneNumber')}
                  defaultValue={center?.phoneNumber}
                  placeholder="Número de Telefone"
                  autoComplete="tel"
                  type="tel"
                  className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
                />
                {errors.phoneNumber && (
                  <span className="text-red-500">{errors.phoneNumber?.message}</span>
                )}
                <label htmlFor="center-email">
                  Email <span className="text-orange-700">*</span>
                </label>
                <input
                  id="center-email"
                  {...register('email')}
                  defaultValue={center?.email}
                  placeholder="E-mail"
                  autoComplete="tel"
                  type="tel"
                  className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-zinc-500"
                />
                {errors.email && <span className="text-red-500">{errors.email?.message}</span>}

                <button
                  type="submit"
                  className="bg-orange-700 w-1/6 h-12 p-3 text-white shadow-shape rounded-md self-end"
                >
                  Salvar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
