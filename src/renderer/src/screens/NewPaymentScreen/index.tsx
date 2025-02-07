import React, { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { HeaderMain } from '@renderer/components/HeaderMain'
import { Sidebar } from '@renderer/components/Sidebar'
import { useCenter } from '@renderer/contexts/center-context'
import { getStudentById, searchStudentService } from '@renderer/services/student'
import { ArrowRight, BookUser, GraduationCap, ShieldCheck } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { PaymentForm } from './PaymentForm'
import { useLocation } from 'react-router'

// Validação com yup
const schemaStudentSearch = yup
  .object({
    studentSearch: yup.string().required('Preencha o campo para pesquisar um aluno')
  })
  .required()

//Colocar novas funções do form-hook para outro form
type FormSearchData = yup.InferType<typeof schemaStudentSearch>

// Componente de Novo Pagamento
interface NewPaymentScreenProps {
  resultStudent?: object
}

export const NewPaymentScreen: React.FC<NewPaymentScreenProps> = (props) => {
  const location = useLocation()
  const enrollmentFromState = location.state?.enrollment || null
  const { center } = useCenter()

  const [resultList, setResultList] = useState<[] | null>(null)
  const [results, setResults] = useState<object | null>(null)
  const [isSelected, setIsSelected] = useState(false)

  // Hook do formulário de busca do estudante
  const {
    register: registerSearch,
    handleSubmit: handleSubmitSearch,
    watch: watchSearch,
    reset: resetSearch,
    formState: { errors: errorsSearch }
  } = useForm<FormSearchData>({
    resolver: yupResolver(schemaStudentSearch)
  })

  const studentSearch = watchSearch('studentSearch') // Observa mudanças no campo de busca

  useEffect(() => {
    async function getStudentInEnrollment(id: string): Promise<void> {
      const studentFromState = await getStudentById(id)
      if (studentFromState) {
        setResults(studentFromState)
        const tmpStudent = [Object(studentFromState)]
        setResultList(tmpStudent as [])
        setIsSelected(true)
      }
    }

    getStudentInEnrollment(enrollmentFromState?.studentId)
  }, [])

  // Função para buscar dados da API
  const fetchResults = async (query: string) => {
    if (query) {
      try {
        const response = await searchStudentService(center?._id, query)
        setResultList(Object(response))
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
        setResultList(null)
      }
    } else {
      setResultList(null) // Limpa os resultados se o input estiver vazio
    }
  }

  // useEffect para monitorar o valor do campo de pesquisa e fazer a busca
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchResults(studentSearch) // Busca após 500ms de pausa
    }, 500)

    return () => clearTimeout(delayDebounceFn) // Limpa o debounce se o usuário continuar digitando
  }, [studentSearch])

  // Função de submit para o formulário
  const onSubmit = async (data: FormSearchData): Promise<void> => {
    await fetchResults(data.studentSearch) // Executa a busca quando o usuário submete
  }

  function selectedStudentForPayment(student: object | null): void {
    setResults(student)
    setIsSelected(true)
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <HeaderMain />

      <div className="flex flex-1 justify-center  pt-[62px] lg:pt-[70px] overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto p-4">
          <div className="flex flex-col w-11/12 mx-auto">
            <h2 className="text-3xl text-zinc-400">Novo Pagamento</h2>
            <article className="text-zinc-600 mt-3">
              <p>Regularize o Pagamento</p>
            </article>
          </div>
          {/* Secção de Pesquisa de Estudante */}
          <section className="flex items-center justify-center pt-10">
            <div className="flex flex-col items-center max-w-3xl w-full px-6 text-center space-y-4">
              {/* Formulário de busca do estudante */}
              {!isSelected && (
                <form
                  onSubmit={handleSubmitSearch(onSubmit)}
                  className="h-16 bg-zinc-900 px-4 rounded-lg flex items-center justify-between shadow-shape gap-3"
                >
                  <div className="flex items-center gap-2 flex-1">
                    <BookUser className="size-8 text-zinc-400" />
                    <input
                      type="text"
                      {...registerSearch('studentSearch')}
                      autoFocus={true}
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
              )}

              {errorsSearch.studentSearch && !isSelected && (
                <p className="text-red-400">{errorsSearch.studentSearch.message}</p>
              )}

              {/* Exibe os resultados da busca */}
              {!isSelected &&
                resultList?.map((resultItem) => (
                  <div
                    key={resultItem._id}
                    className="bg-zinc-800 flex items-center justify-center gap-2 hover:brightness-110 min-w-min h-12 rounded-md cursor-pointer px-4 transition-all"
                    onClick={() => {
                      selectedStudentForPayment(resultItem)
                    }}
                  >
                    <p>
                      <GraduationCap />
                    </p>
                    <p>
                      <span className="text-orange-600">{resultItem?.name?.fullName}</span>
                    </p>
                    <div className="bg-zinc-900 h-5 border shadow-shape border-zinc-400" />
                    <p className="flex items-center justify-center gap-1 pl-2">
                      <ShieldCheck /> Selecionar
                    </p>
                  </div>
                ))}
              {!!resultList && (
                <div className="flex items-center gap-2">
                  <p>Estudante não encontrado!</p>
                </div>
              )}
            </div>
          </section>
          {/* Area do estudante Selecionado  */}
          {isSelected && (
            <div className="flex flex-col bg-zinc-800 w-11/12 mx-auto p-4 rounded-lg shadow-md transition-all">
              {/* Formulário de pagamento aparece ao selecionar o estudante */}
              <PaymentForm resultsInForm={props.resultStudent ? props.resultStudent : results} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
