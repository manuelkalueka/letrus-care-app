import React, { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '@renderer/contexts/auth-context'
import { useCenter } from '@renderer/contexts/center-context'
import { getEnrollmentByStudentService } from '@renderer/services/enrollment-service'
import { createPaymentService } from '@renderer/services/payment-service'
import { formateCurrency } from '@renderer/utils/format'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import * as yup from 'yup'

const schemaPayment = yup
  .object({
    enrollmentId: yup.string().required(),
    amount: yup.number().required(),
    paymentDate: yup.date().required(),
    paymentMonthReference: yup.string().required(),
    paymentYearReference: yup.number().required(),
    status: yup.string().oneOf(['paid', 'pending', 'overdue']).required(),
    paymentMethod: yup
      .string()
      .oneOf(['Dinheiro', 'Multicaixa Express', 'Transferência Bancária (ATM)'])
      .required(),
    centerId: yup.string().required(),
    userId: yup.string().required(),
    notes: yup.string()
  })
  .required()

//Colocar novas funções do form-hook para outro form
type FormPaymentData = yup.InferType<typeof schemaPayment>

// Componente de formulário de pagamento
interface PaymentFormProps {
  resultsInForm: object | null
}
export const PaymentForm: React.FC<PaymentFormProps> = (props) => {
  // Hook do formulário de pagamento
  const { register, handleSubmit } = useForm<FormPaymentData>({
    resolver: yupResolver(schemaPayment)
  })

  // Função para gerar a lista de anos
  function getYearsInterval(): number[] {
    const currentYear = new Date().getFullYear()
    const startYear = currentYear - 2
    const endYear = currentYear

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

  const yearsList = getYearsInterval() // Obter lista de anos
  const monthsList = getMonths() // Obter lista de meses

  const { user } = useAuth()
  const { center } = useCenter()

  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear()) // Ano atual por padrão
  const [selectedMonth, setSelectedMonth] = useState<string>(monthsList[new Date().getMonth()]) // Mês actual

  const paymentMethods = ['Dinheiro', 'Multicaixa Express', 'Transferência Bancária (ATM)']
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('')

  const onSubmitPaymentForm = async (data: FormPaymentData): Promise<void> => {
    try {
      await createPaymentService(data)
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Pagamento Efeito com sucesso, baixe o comprovativo!!',
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: 'h-44 p-2',
          title: 'text-sm',
          icon: 'text-xs'
        },
        timerProgressBar: true
      })
    } catch (error) {
      Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: 'Ocorreu um erro, tente mais tarde...',
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: 'h-44 p-2',
          title: 'text-sm',
          icon: 'text-xs'
        },
        timerProgressBar: true
      })
      console.log('Erro ao realizar pagamento no front: ', error)
    }
  }
  const [enrollmentByStudent, setEnrollmentByStudent] = useState<object | null>(null)

  useEffect(() => {
    async function getEnrollmentByStudent(studentId: string): Promise<void> {
      if (studentId) {
        const enrollment = await getEnrollmentByStudentService(studentId)
        setEnrollmentByStudent(enrollment)
      }
    }
    getEnrollmentByStudent(props.resultsInForm?._id)
  }, [props.resultsInForm])

  // Limpa Todos os Campos
  // function resetStatesAndFields(): void {
  //   setIsSelected(false)
  //   setResults(null)
  //   setEnrollmentByStudent(null)
  //   resetSearch()
  // }

  return (
    <>
      <form className="flex flex-col gap-4 flex-1" onSubmit={handleSubmit(onSubmitPaymentForm)}>
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
            value={props.resultsInForm?.name?.fullName}
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
            value={props.resultsInForm?.studentCode}
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
            {...register('paymentMonthReference')}
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
            {...register('paymentYearReference')}
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
            {...register('amount')}
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
            {...register('paymentMethod')}
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
            {...register('notes')}
            className="w-full p-2 bg-zinc-950 rounded-md border-gray-700 text-gray-100"
            placeholder="Insira detalhes adicionais sobre o pagamento, se necessário."
          ></textarea>
        </div>

        {/* Dados Ocultos */}
        <input type="hidden" value={enrollmentByStudent?._id} {...register('enrollmentId')} />
        <input type="hidden" value={center?._id} {...register('centerId')} />
        <input type="hidden" value={user?._id} {...register('userId')} />

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
            // onClick={resetStatesAndFields}
            className="bg-red-600 text-white rounded-md py-2 mt-4 hover:bg-red-700 transition-all p-2"
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  )
}
