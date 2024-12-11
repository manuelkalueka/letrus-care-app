import { yupResolver } from '@hookform/resolvers/yup'
import { HeaderMain } from '@renderer/components/HeaderMain'
import { Sidebar } from '@renderer/components/Sidebar'
import { useAuth } from '@renderer/contexts/auth-context'
import { useCenter } from '@renderer/contexts/center-context'
import { getEnrollmentByStudentService } from '@renderer/services/enrollment-service'
import { createPaymentService } from '@renderer/services/payment-service'
import { searchStudentService } from '@renderer/services/student'
import { formateCurrency } from '@renderer/utils/format'
import { ArrowRight, BookUser, GraduationCap, ShieldCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

// Validação com yup
const schemaStudentSearch = yup
  .object({
    studentSearch: yup.string().required('Preencha o campo para pesquisar um aluno')
  })
  .required()

const schemaPayment = yup
  .object({
    enrollmentId: yup.string(),
    amount: yup.number().required(),
    paymentDate: yup.date(),
    paymentMonthReference: yup.string(),
    paymentYearReference: yup.number(),
    dueDate: yup.date(),
    status: yup.string().oneOf(['paid', 'pending', 'overdue']),
    centerId: yup.string(),
    user: yup.string(),
    paymentMethod: yup.string(),
    notes: yup.string()
  })
  .required()

//Colocar novas funções do form-hook para outro form
type FormData = yup.InferType<typeof schemaStudentSearch>
type FormPaymentData = yup.InferType<typeof schemaPayment>

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
interface NewPaymentScreenProps {
  resultStudent?: object
}

export const NewPaymentScreen: React.FC<NewPaymentScreenProps> = (props) => {
  const yearsList = getYearsInterval() // Obter lista de anos
  const monthsList = getMonths() // Obter lista de meses
  const [resultList, setResultList] = useState<[] | null>(null)
  const [results, setResults] = useState<object | null>(null) // Armazenar resultados da pesquisa
  const { center } = useCenter()
  const { user } = useAuth()
  const [isSelected, setIsSelected] = useState(false) // Estado para controle da seleção do estudante
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear()) // Ano atual por padrão
  const [selectedMonth, setSelectedMonth] = useState<string>(monthsList[new Date().getMonth()]) // Mês actual padrão

  // Hook do formulário de busca do estudante
  const {
    register: registerSearch,
    handleSubmit: handleSubmitSearch,
    watch: watchSearch,
    reset: resetSearch,
    formState: { errors: errorsSearch }
  } = useForm<FormData>({
    resolver: yupResolver(schemaStudentSearch)
  })

  // Hook do formulário de pagamento
  const { register: registerPayment, handleSubmit: handleSubmitPayment } = useForm<FormPaymentData>(
    {
      resolver: yupResolver(schemaPayment)
    }
  )

  const studentSearch = watchSearch('studentSearch') // Observa mudanças no campo de busca

  // Função para buscar dados da API
  const fetchResults = async (query: string) => {
    if (query) {
      try {
        const response = await searchStudentService(center?._id, query)
        setResultList(response) // Armazena os resultados vindos da API
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
  const onSubmit = async (data: FormData): Promise<void> => {
    await fetchResults(data.studentSearch) // Executa a busca quando o usuário submete
  }

  const onSubmitPaymentForm = async (data: FormPaymentData): Promise<void> => {
    await createPaymentService(data) // Executa a busca quando o usuário submete
  }

  const [enrollmentByStudent, setEnrollmentByStudent] = useState<object | null>(null)

  useEffect(() => {
    async function getEnrollmentByStudent(studentId: string): Promise<void> {
      if (studentId) {
        const enrollment = await getEnrollmentByStudentService(studentId)
        setEnrollmentByStudent(enrollment)
      }
    }
    getEnrollmentByStudent(results?._id)
  }, [results])

  // Limpa Todos os Campos
  function resetStatesAndFields(): void {
    setIsSelected(false)
    setResults(null)
    setEnrollmentByStudent(null)
    resetSearch()
  }

  function selectedStudentForPayment(student: object | null): void {
    setIsSelected(true)
    setResults(student)
  }

  // Componente de formulário de pagamento
  interface PaymentFormProps {
    resultsInForm: object | null
  }
  const PaymentForm: React.FC<PaymentFormProps> = ({ resultsInForm }) => {
    const paymentMethods = ['Dinheiro', 'Multicaixa Express', 'Transferência Bancária (ATM)']
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('')

    return (
      <>
        <form
          className="flex flex-col gap-4 flex-1"
          onSubmit={handleSubmitPayment(onSubmitPaymentForm)}
        >
          {/* Informações do Aluno */}
          <h3 className="text-xl text-zinc-100 space-y-2">Dados do Estudante</h3>
          <div className="flex flex-col gap-2">
            <label className="text-zinc-300" htmlFor="fullName">
              Nome Completo
            </label>
            <input
              id="fullName"
              placeholder="Nome Completo do Aluno"
              type="text"
              value={resultsInForm?.name?.fullName}
              className="w-full h-12 p-3 bg-zinc-950 rounded-md border-gray-700 text-gray-100"
              disabled
            />
            <label className="text-zinc-300" htmlFor="studentCode">
              Código do Aluno
            </label>
            <input
              id="studentCode"
              placeholder="Código do Aluno"
              type="text"
              value={resultsInForm?.studentCode}
              className="w-full h-12 p-3 bg-zinc-950 rounded-md border-gray-700 text-gray-100"
              disabled
            />
          </div>

          {/* Dados do Pagamento */}
          <h3 className="text-xl text-zinc-100 space-y-2">Detalhes do Pagamento</h3>
          <div className="flex flex-col gap-2">
            {/* Mês de Referência */}
            <label className="text-zinc-300" htmlFor="month-select">
              Mês de Referência
            </label>
            <select
              id="month-select"
              {...registerPayment('paymentMonthReference')}
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

            {/* Ano de Referência */}
            <label className="text-zinc-300" htmlFor="year-select">
              Ano de Referência
            </label>
            <select
              id="year-select"
              value={selectedYear}
              {...registerPayment('paymentYearReference')}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-full h-12 p-3 bg-zinc-950 rounded-md border-gray-700 text-gray-100"
            >
              {yearsList.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            {/* Valor a Pagar */}
            <label className="text-zinc-300">Propina</label>
            <input
              value={formateCurrency(enrollmentByStudent?.courseId?.fee)}
              disabled
              className="w-full h-12 p-3 bg-zinc-950 rounded-md border-gray-700 text-gray-100"
              placeholder="Exemplo: 150.00"
            />
            <label className="text-zinc-300">Multa</label>
            <input
              value={formateCurrency(enrollmentByStudent?.courseId?.feeFine)}
              disabled
              className="w-full h-12 p-3 bg-zinc-950 rounded-md border-gray-700 text-gray-100"
              placeholder="Exemplo: 150.00"
            />
            <label className="text-zinc-300">Valor a Pagar</label>
            <input
              disabled
              value={formateCurrency(
                Number(enrollmentByStudent?.courseId?.fee + enrollmentByStudent?.courseId?.feeFine)
              )}
              {...registerPayment('amount')}
              className="w-full h-12 p-3 bg-zinc-950 rounded-md border-gray-700 text-gray-100"
              placeholder="Exemplo: 150.00"
            />

            {/* Método de Pagamento */}
            <label className="text-zinc-300" htmlFor="payment-method">
              Método de Pagamento
            </label>
            <select
              id="payment-method"
              value={selectedPaymentMethod}
              {...registerPayment('paymentMethod')}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="w-full h-12 p-3 bg-zinc-950 rounded-md border-gray-700 text-gray-100"
            >
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>

            {/* Observações */}
            <label className="text-zinc-300" htmlFor="notes">
              Observações
            </label>
            <textarea
              id="notes"
              {...registerPayment('notes')}
              className="w-full p-2 bg-zinc-950 rounded-md border-gray-700 text-gray-100"
              placeholder="Insira detalhes adicionais sobre o pagamento, se necessário."
            ></textarea>
          </div>

          {/* Dados Ocultos */}
          <input
            type="hidden"
            value={enrollmentByStudent?._id}
            {...registerPayment('enrollmentId')}
          />
          <input type="hidden" value={center?._id} {...registerPayment('centerId')} />
          <input type="hidden" value={user?._id} {...registerPayment('userId')} />

          {/* Botões */}
          <div className="flex gap-8 items-center">
            <button
              type="submit"
              className="bg-orange-600 text-white rounded-md py-2 mt-4 hover:bg-orange-700 transition-all p-2"
            >
              Confirmar Pagamento
            </button>
            <button
              type="reset"
              onClick={resetStatesAndFields}
              className="bg-red-600 text-white rounded-md py-2 mt-4 hover:bg-red-700 transition-all p-2"
            >
              Cancelar
            </button>
          </div>
        </form>
      </>
    )
  }

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
              {resultList &&
                !isSelected &&
                resultList.map((resultItem) => (
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
              {!!resultList === false && (
                <div className="flex items-center gap-2">
                  <p>Estudante não encontrado!</p>
                </div>
              )}
            </div>
          </section>
          {/* Area do estudante Selecionado  */}
          {(results || props.resultStudent) && isSelected && (
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
