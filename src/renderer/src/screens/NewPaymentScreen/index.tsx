import { yupResolver } from '@hookform/resolvers/yup'
import { HeaderMain } from '@renderer/components/HeaderMain'
import { Sidebar } from '@renderer/components/Sidebar'
import { ArrowRight, BookUser } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
const schema = yup
  .object({
    studentSearch: yup.string().required('Preecha o campo para pesquisar um aluno')
  })
  .required()

type FormData = yup.InferType<typeof schema>

export const NewPaymentScreen: React.FC = () => {
  const [student, setStudent] = useState<object | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData): Promise<void> => {
    console.log(data)
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <HeaderMain />

      <div className="flex flex-1 pt-[62px] lg:pt-[70px] overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto p-4">
          <div className="flex flex-col flex-1 w-11/12 mx-auto">
            <h2 className="text-3xl text-zinc-400">Novo Pagamento</h2>
            <article className="text-zinc-600 mt-3">
              <p>Regularize o Pagamento</p>
            </article>
          </div>
          {student ? (
            <p>Serei a Ficha de Pagamento</p>
          ) : (
            <section className="flex items-center justify-center">
              <div className="max-w-3xl w-full px-6 text-center space-y-10">
                <div className="flex flex-col items-center gap-2">
                  <p className="text-zinc-300 text-lg">
                    Pesquisar estudantes para começar o processo de pagamento!
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="h-16 bg-zinc-900 px-4 rounded-lg flex items-center justify-between shadow-shape gap-3"
                >
                  <div className="flex items-center gap-2 flex-1">
                    <BookUser className="size-8 text-zinc-400" />
                    <input
                      type="text"
                      {...register('studentSearch')}
                      placeholder="Nome ou código do Aluno"
                      className="bg-transparent text-lg placeholder-zinc-400 outline-none rounded-md shadow-shape flex-1"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-orange-600 text-orange-100 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-orange-700 transition-all"
                  >
                    Continuar
                    <ArrowRight className="size-5" />
                  </button>
                </form>
                {errors.studentSearch && (
                  <p className="text-red-400">{errors.studentSearch.message}</p>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
