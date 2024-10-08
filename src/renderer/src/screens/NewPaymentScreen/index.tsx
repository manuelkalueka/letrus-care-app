import { yupResolver } from '@hookform/resolvers/yup'
import { HeaderMain } from '@renderer/components/HeaderMain'
import { Sidebar } from '@renderer/components/Sidebar'
import { useAuth } from '@renderer/contexts/auth-context'
import { useCenter } from '@renderer/contexts/center-context'
import { getEnrollmentByStudentService } from '@renderer/services/enrollment-service'
import { searchStudentService } from '@renderer/services/student'
import { ArrowRight, BookUser, GraduationCap, ShieldCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

// Validação com yup
const schema = yup
  .object({
    studentSearch: yup.string().required('Preencha o campo para pesquisar um aluno')
  })
  .required()

type FormData = yup.InferType<typeof schema>

// Função para gerar a lista de anos
function getYearsInterval(): number[] {
  const currentYear = new Date().getFullYear()
  const startYear = currentYear - 2
  const endYear = currentYear + 3

  // Gera a lista de anos entre startYear e endYear
  return Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index)
}

// Função para obter os meses
function getMonths(): string[] {
  return [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]
}

// Componente de Novo Pagamento
export const NewPaymentScreen: React.FC = () => {
  const [results, setResults] = useState<object | null>(null) // Armazenar resultados da pesquisa
  const { center } = useCenter()
  const { user } = useAuth()
  const [isSelected, setIsSelected] = useState(false) // Estado para controle da seleção do estudante
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear()) // Ano atual por padrão
  const [selectedMonth, setSelectedMonth] = useState<string>('Janeiro') // Mês padrão

  const yearsList = getYearsInterval() // Obter lista de anos
  const monthsList = getMonths() // Obter lista de meses

  // Hook para capturar dados do formulário
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const studentSearch = watch('studentSearch') // Observa mudanças no campo de busca

  // Função para buscar dados da API
  const fetchResults = async (query: string) => {
    if (query) {
      try {
        const response = await searchStudentService(center?._id, query)
        setResults(response) // Armazena os resultados vindos da API
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
      fetchResults(studentSearch) // Busca após 500ms de pausa
    }, 500)

    return () => clearTimeout(delayDebounceFn) // Limpa o debounce se o usuário continuar digitando
  }, [studentSearch])

  // Função de submit para o formulário
  const onSubmit = async (data: FormData): Promise<void> => {
    await fetchResults(data.studentSearch) // Executa a busca quando o usuário submete
  }
  const [enrollmentByStudent, setEnrollmentByStudent] = useState<object | null>(null)

  useEffect(() => {
    async function getEnrollmentByStudent(studentId: string): Promise<void> {
      if (studentId) {
        const enrollment = await getEnrollmentByStudentService(studentId)
        setEnrollmentByStudent(enrollment)
      }
      setEnrollmentByStudent(null)
    }
    getEnrollmentByStudent(results?._id)
  }, [results])

  // Componente de formulário de pagamento
  const PaymentForm: React.FC = () => (
    <>
      <h3 className="text-xl text-zinc-100 mb-4">Detalhes do Pagamento</h3>
      <form className="flex flex-col gap-4 flex-1">
        {/* Informações do Aluno */}
        <h3>Dados do Estudante</h3>
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName">Nome Completo</label>
          <input
            id="fullName"
            placeholder="Nome Completo do Aluno"
            type="text"
            value={results?.name?.fullName}
            className="w-full h-12 p-3 bg-zinc-950 rounded-md border-gray-700 text-gray-100"
            disabled
          />
          <label htmlFor="studentCode">Código do Aluno</label>
          <input
            id="studentCode"
            placeholder="Código do Aluno"
            type="text"
            value={results?.studentCode}
            className="w-full h-12 p-3 bg-zinc-950 rounded-md border-gray-700 text-gray-100"
            disabled
          />
        </div>

        {/* Dados de Pagamento */}
        <h3>Detalhes do Pagamento</h3>
        <div className="flex flex-col gap-2">
          <label htmlFor="month-select">Mês de Referência</label>
          <select
            id="month-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full h-12 p-3 bg-zinc-950 rounded-md border-gray-700 text-gray-100"
          >
            {monthsList.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <label htmlFor="year-select">Ano de Referência</label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="w-full h-12 p-3 bg-zinc-950 rounded-md border-gray-700 text-gray-100"
          >
            {yearsList.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* Valor do Pagamento */}
          <label>Valor da Propina</label>
          <input
            type="text"
            value="00.00 AOA"
            disabled
            className="w-full h-12 p-3 bg-zinc-950 rounded-md border-gray-700 text-gray-100"
          />
          <label>Juros/Multa</label>
          <input
            type="text"
            value="00.00 AOA"
            disabled
            className="w-full h-12 p-3 bg-zinc-950 rounded-md border-gray-700 text-gray-100"
          />
          <label>Total a Pagar</label>
          <input
            type="text"
            value="00.00 AOA"
            disabled
            className="w-full h-12 p-3 bg-zinc-950 rounded-md border-gray-700 text-gray-100"
          />
        </div>

        {/* Método de Pagamento */}
        <h3>Meio de Pagamento</h3>
        <div className="flex items-center gap-2">
          <input type="radio" id="cash" name="paymentMethod" value="cash" />
          <label htmlFor="cash">Cash</label>
        </div>
        <div className="flex items-center gap-2">
          <input type="radio" id="bankTransfer" name="paymentMethod" value="bankTransfer" />
          <label htmlFor="bankTransfer">Transferência Bancária</label>
        </div>
        <div>
          <input
            type="hidden"
            value={enrollmentByStudent?._id}
            className="w-full h-12 p-3 bg-zinc-950 rounded-md border-gray-700 text-gray-100"
          />
          <input type="hidden" value={center?._id} />
          <input type="hidden" value={user?._id} />
        </div>
        {/* Botões */}
        <div className="flex gap-8 items-center">
          <button className="bg-orange-600 text-white rounded-md py-2 mt-4 hover:bg-orange-700 transition-all p-2">
            Confirmar Pagamento
          </button>
          <button
            type="reset"
            onClick={() => {
              setIsSelected(false)
              setResults(null)
              reset()
            }}
            className="bg-red-600 text-white rounded-md py-2 mt-4 hover:bg-red-700 transition-all p-2"
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  )

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <HeaderMain />

      <div className="flex flex-1 pt-[62px] lg:pt-[70px] overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto p-4">
          <div className="flex flex-col w-11/12 mx-auto">
            <h2 className="text-3xl text-zinc-400">Novo Pagamento</h2>
            <article className="text-zinc-600 mt-3">
              <p>Regularize o Pagamento</p>
            </article>
          </div>

          <section className="flex items-center justify-center pt-10">
            <div className="flex flex-col items-center max-w-3xl w-full px-6 text-center space-y-10">
              {/* Formulário de busca do estudante */}
              {!isSelected && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="h-16 bg-zinc-900 px-4 rounded-lg flex items-center justify-between shadow-shape gap-3"
                >
                  <div className="flex items-center gap-2 flex-1">
                    <BookUser className="size-8 text-zinc-400" />
                    <input
                      type="text"
                      {...register('studentSearch')}
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

              {errors.studentSearch && !isSelected && (
                <p className="text-red-400">{errors.studentSearch.message}</p>
              )}

              {/* Exibe os resultados da busca */}
              {results ? (
                !isSelected && (
                  <div
                    className="bg-zinc-800 flex items-center justify-center gap-2 hover:brightness-110 min-w-min h-12 rounded-md cursor-pointer px-4 transition-all"
                    onClick={() => {
                      setIsSelected(true)
                    }}
                  >
                    <p>
                      <GraduationCap />
                    </p>
                    <p>
                      <span className="text-orange-600">{results?.name?.fullName}</span>
                    </p>
                    <div className="bg-zinc-900 h-5 border shadow-shape border-zinc-400" />
                    <p className="flex items-center justify-center gap-1 pl-2">
                      <ShieldCheck /> Selecionar
                    </p>
                  </div>
                )
              ) : (
                <div className="flex items-center gap-2">
                  <p>Estudante não encontrado!</p>
                </div>
              )}
            </div>
          </section>
          {results && isSelected && (
            <div className="flex flex-col bg-zinc-800 w-11/12 mx-auto p-4 rounded-lg shadow-md transition-all">
              {/* Formulário de pagamento aparece ao selecionar o estudante */}
              <PaymentForm />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
