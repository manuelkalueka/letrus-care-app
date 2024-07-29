import { LogoLectrus } from '@renderer/components/LogoLectrus'
import React from 'react'
import { LoginForm } from '@renderer/components/LoginForm'
import { ChevronRight, UserPlus } from 'lucide-react'

export const LoginScreen: React.FC = () => {
  return (
    <div className="flex w-full h-dvh bg-zinc-800">
      <div className="h-full w-[70%] bg-blue-900"></div>
      <div className="h-full flex justify-center flex-1">
        <section className="my-[15%] px-[15%] max-w-full w-full max-h-full text-zinc-100">
          <LogoLectrus />
          <h2 className="font-bold text-gray-200 text-2xl mt-16 mb-12 max-md:mt-12 max-md:mb-8">
            Acesse sua conta
          </h2>
          <LoginForm />
          <div className="w-full h-[2px] bg-gray-700 mb-6 mt-16 max-md:mt-12"></div>
          <a
            href="/signup"
            className="flex items-center justify-between my-5 py-[4%] px-[6%] text-zinc-300 bg-gray-700 rounded-md"
          >
            <div className="flex flex-row">
              <UserPlus className="text-blue-500" />
              <section className="flex flex-col ml-5">
                <p>Não tem uma conta?</p>
                <p className="text-blue-500">Se inscreva gratuitamente</p>
              </section>
            </div>
            <ChevronRight />
          </a>
        </section>
      </div>
    </div>
  )
}
