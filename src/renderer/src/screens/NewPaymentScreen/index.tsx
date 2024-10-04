import { yupResolver } from '@hookform/resolvers/yup'
import { HeaderMain } from '@renderer/components/HeaderMain'
import { Sidebar } from '@renderer/components/Sidebar'
import { useCenter } from '@renderer/contexts/center-context'
import { searchStudentService } from '@renderer/services/student'
import { ArrowRight, BookUser } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
const schema = yup
  .object({
    studentSearch: yup.string().required('Preecha o campo para pesquisar um aluno')
  })
  .required()

type FormData = yup.InferType<typeof schema>

export const NewPaymentScreen: React.FC = () => {
  const [results, setResults] = useState<object | null>(null)
  const { center } = useCenter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const studentSearch = watch('studentSearch')

  // Função para buscar dados da API
  const fetchResults = async (query: string) => {
    if (query) {
      try {
        const response = await searchStudentService(center?._id, query)
        setResults(response) // Define os resultados vindos da API
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
        setResults(null)
      }
    } else {
      setResults(null) // Limpa os resultados se o input estiver vazio
    }
  }

  // useEffect para monitorar o valor do campo de pesquisa e fazer a busca
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchResults(studentSearch)
    }, 500) // Adiciona um pequeno debounce (meio segundo)

    return () => clearTimeout(delayDebounceFn) // Limpa o debounce se o usuário continuar digitando
  }, [studentSearch]) // Reexecuta sempre que o valor de searchQuery mudar

  const onSubmit = async (data: FormData): Promise<void> => {
    //executa ao clicar no botão submit
    await fetchResults(data.studentSearch)
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
          <section className="flex items-center justify-center">
            <div className="max-w-3xl w-full px-6 text-center space-y-10">
              <div className="flex flex-col items-center gap-2">
                <p>Estudante correspondete: {results?.name?.fullName}</p>
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
        </div>
      </div>
    </div>
  )
}
  