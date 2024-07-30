import React from 'react'
import { LogoLectrus } from '@renderer/components/LogoLectrus'
import { SignupForm } from '@renderer/components/SignupForm'
import { ChevronRight, CornerUpRight } from 'lucide-react'

export const SignupScreen: React.FC = () => {
  return (
    <div className="flex w-full h-dvh bg-zinc-800">
      <div className="h-full w-[70%] bg-orange-700 bg-pattern bg-no-repeat bg-center bg-cover"></div>
      <div className="h-full flex justify-center flex-1">
        <section className="my-[15%] px-[15%] max-w-full w-full max-h-full text-zinc-100">
          <LogoLectrus />
          <h2 className="font-bold text-gray-200 text-2xl mt-16 mb-12 max-md:mt-12 max-md:mb-8">
            Cadastre-se gratuitamente
          </h2>
          <SignupForm />
          <div className="w-full h-[2px] bg-gray-700 mb-6 mt-16 max-md:mt-12"></div>
          <a
            href="/login"
            className="flex items-center justify-between my-5 py-[4%] px-[6%] text-zinc-300 bg-zinc-700 rounded-md hover:brightness-110"
          >
            <div className="flex flex-row">
              <CornerUpRight className="text-orange-500" />
              <section className="flex flex-col ml-5">
                <p>Já possui uma conta?</p>
                <p className="text-orange-500 font-bold">Entre na Plataforma</p>
              </section>
            </div>
            <ChevronRight />
          </a>
        </section>
      </div>
    </div>
  )
}