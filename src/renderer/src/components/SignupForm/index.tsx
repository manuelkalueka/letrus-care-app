import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { signupService } from '@renderer/services/user'

const schema = yup
  .object({
    username: yup.string().required('Preecha seu username'),
    password: yup
      .string()
      .min(6, 'Insira uma senha com 6 caracteres no mínimo')
      .required('Preecha sua senha'),
    confPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Senhas devem iguais')
      .required('Confirme sua senha')
  })
  .required()
type FormData = yup.InferType<typeof schema>

export const SignupForm: React.FC = () => {
  const MySwal = withReactContent(Swal)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  const onSubmit = async (data: FormData) => {
    try {
      const status = await signupService(data)

      if (status === 201) {
        MySwal.fire({
          title: 'Sucesso!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      } else {
        MySwal.fire({
          title: 'Erro ao cadastrar usuário',
          text: 'Verifique os dados.',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    } catch (error) {
      MySwal.fire({
        title: 'Erro interno',
        text: 'Erro ao cadastrar usuário.',
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
      <label className="text-gray-200" htmlFor="password">
        Confirmar Senha
      </label>
      <input
        {...register('confPassword')}
        placeholder="Confirme sua senha"
        id="password"
        autoComplete="password webauthn"
        type="password"
        className="w-full h-12 p-3  bg-zinc-950 rounded-md  focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
      />
      <span className="text-red-500">{errors.confPassword?.message}</span>
      <span className="text-zinc-400 mb-5">
        Ao se cadastrar, você aceita nossos{' '}
        <a href="#" className="text-orange-600">
          termos de uso
        </a>{' '}
        e a nossa{' '}
        <a href="#" className="text-orange-600">
          política de privacidade
        </a>
        .
      </span>
      <button
        type="submit"
        className="bg-orange-700 w-full h-12 p-3 text-white shadow-shape rounded-md"
      >
        Cadastar
      </button>
    </form>
  )
}