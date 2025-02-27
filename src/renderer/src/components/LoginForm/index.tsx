import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { useAuth } from '@renderer/contexts/auth-context'
import { Link, useNavigate } from 'react-router'
import { useCenter } from '@renderer/contexts/center-context'
import { getCenterService } from '@renderer/services/center-service'
import { getFromLocalStorage, saveToLocalStorage } from '@renderer/utils/localStorage'

const schema = yup
  .object({
    username: yup.string().required('Preecha seu username'),
    password: yup.string().required('Preecha sua senha')
  })
  .required()
type FormData = yup.InferType<typeof schema>

export const LoginForm: React.FC = () => {
  const MySwal = withReactContent(Swal)

  const { login, loading } = useAuth()
  const { centerExistsContext } = useCenter()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData): Promise<void> => {
    try {
      const response = await login(data)
      if (!loading) {
        const isExists = await centerExistsContext(response?.user?._id as string)

        if (isExists) {
          // Verificar se o centro já está no localStorage; se não, buscar e salvar.
          const storedCenter = getFromLocalStorage('center')
          if (!storedCenter) {
            const { data: centerData } = await getCenterService(response?.user._id as string)
            saveToLocalStorage('center', centerData)
          }
          navigate('/home')
        } else {
          navigate('/centers/new')
        }
      }
    } catch (error) {
      if (error?.response?.status === 404) {
        navigate('/centers/new')
      } else if (error?.response?.status === 401) {
        MySwal.fire({
          title: 'Erro',
          text: `${error?.response?.response?.data?.error}`,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      } else {
        MySwal.fire({
          title: 'Erro',
          text: `Erro Interno`,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    }
  }
  //Erro quando uso method Post
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 flex-col my-[5%]">
      <label className="text-gray-200" htmlFor="username">
        Username
      </label>
      <input
        {...register('username')}
        placeholder="Seu nome de usuário"
        id="username"
        autoComplete="username webauthn"
        type="text"
        className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
      />
      <span className="text-red-500">{errors.username?.message}</span>
      <label className="text-gray-200" htmlFor="password">
        Senha
      </label>
      <input
        {...register('password')}
        placeholder="Sua senha"
        id="password"
        autoComplete="password webauthn"
        type="password"
        className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
      />
      <span className="text-red-500">{errors.password?.message}</span>
      <Link to="#" target="_self" className="text-orange-600 mb-5 w-[63%] max-md:w-[53%]">
        Esqueci minha senha
      </Link>
      <button
        type="submit"
        className="bg-orange-700 w-full h-12 p-3 text-white shadow-shape rounded-md"
      >
        Entrar
      </button>
    </form>
  )
}
