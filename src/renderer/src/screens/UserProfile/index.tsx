import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Footer } from '@renderer/components/Footer'
import { HeaderMain } from '@renderer/components/HeaderMain'
import { Sidebar } from '@renderer/components/Sidebar'

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

export const UserProfile: React.FC = () => {
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
      {/* HeaderMain */}
      <HeaderMain />

      <div className="flex flex-1 pt-[62px] lg:pt-[70px] overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 pt-4 overflow-auto">
          <div className="flex flex-col flex-1 w-11/12 mx-auto">
            {/* Título */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl text-zinc-400">Perfil</h2>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
