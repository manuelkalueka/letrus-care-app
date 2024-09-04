import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { useAuth } from '@renderer/contexts/auth-context'
import { useNavigate } from 'react-router-dom'

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
      await login(data)
      if (!loading) {
        navigate('/')

      }
      //ToDo colocar verificação de dados incorrectos
      // MySwal.fire({
      //   title: 'Erro',
      //   text: 'Verifique os dados de acesso',
      //   icon: 'error',
      //   confirmButtonText: 'OK'
      // })
    } catch (error) {
      MySwal.fire({
        title: 'Erro',
        text: 'Erro ao entrar na conta.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

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
      <a href="/forget-password" target="_self" className="text-orange-600 mb-5 w-[53%]">
        Esqueci minha senha
      </a>
      <button
        type="submit"
        className="bg-orange-700 w-full h-12 p-3 text-white shadow-shape rounded-md"
      >
        Entrar
      </button>
    </form>
  )
}
