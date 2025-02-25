import React, { useEffect, useState } from 'react'
import { Footer } from '@renderer/components/Footer'
import { Sidebar } from '@renderer/components/Sidebar'
import { useNavigate } from 'react-router'
import {
  getAllPaymentsService,
  getPaymentService,
  IPayment,
  IPaymentReceipt
} from '@renderer/services/payment-service'
import { formateCurrency } from '@renderer/utils/format'
import { DownloadCloud, Search } from 'lucide-react'
import { HeaderMain } from '@renderer/components/HeaderMain'
import { useCenter } from '@renderer/contexts/center-context'
import Pagination from '@renderer/components/Pagination'
import { pdf } from '@react-pdf/renderer'
import { PaymentPDF } from '@renderer/reports/models/PaymentPDF'

export const PaymentScreen: React.FC = () => {
  const navigate = useNavigate()
  // const [payments, setPayments] = useState<object[]>([]) // Lista de pagamentos
  // const [searchQuery, setSearchQuery] = useState<string>('') // Filtro de busca
  const [filteredPayments, setFilteredPayments] = useState<object[]>([])
  const { center } = useCenter()

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchPayments = async (page: number): Promise<void> => {
    try {
      const { data } = await getAllPaymentsService(center?._id, page)
      // setPayments(data)
      setFilteredPayments(Object(data?.payments))
      setTotalPages(data?.totalPayments)
    } catch (error) {
      console.error('Erro ao obter pagamentos:', error)
    }
  }

  // Obtém todos os pagamentos
  useEffect(() => {
    fetchPayments(currentPage)
  }, [currentPage])

  // // Função de filtro
  // const handleSearch = (query: string) => {
  //   setSearchQuery(query)
  //   if (query) {
  //     const results = payments.filter(
  //       (payment: object | null) =>
  //         payment?.studentName.toLowerCase().includes(query.toLowerCase()) ||
  //         payment?.studentCode.toString().includes(query)
  //     )
  //     setFilteredPayments(results)
  //   } else {
  //     setFilteredPayments(payments)
  //   }
  // }
  interface selectedPaymentProps {
    payment: IPayment
    receipt: IPaymentReceipt
  }
  const [selectedPayment, setSelectedPayment] = useState<selectedPaymentProps | null>(null)

  const handleDownloadPDF = async (payment: IPayment): Promise<void> => {
    const tmpPayment: React.SetStateAction<selectedPaymentProps> = await getPaymentService(
      payment?._id as string
    )

    setSelectedPayment(tmpPayment)
  }

  useEffect(() => {
    if (selectedPayment) {
      const generatePDF = async (): Promise<void> => {
        const blob = await pdf(
          <PaymentPDF
            selectedPayment={{
              payment: selectedPayment?.payment,
              receipt: selectedPayment?.receipt
            }}
          />
        ).toBlob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `recibo-pagamento-${
          selectedPayment?.payment?.enrollmentId?.studentId?.name?.surname
            ? selectedPayment?.payment?.enrollmentId?.studentId?.name?.surname?.toLowerCase()
            : selectedPayment?.payment?.enrollmentId?.studentId?.name?.fullName
                ?.split(' ')
                ?.pop()
                ?.toLowerCase()
        }-${Date.now()}.pdf`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        setSelectedPayment(null)
      }

      generatePDF()
    }
  }, [selectedPayment])

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <HeaderMain />

      <div className="flex flex-1 justify-center  pt-[62px] lg:pt-[70px] overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 pt-4 overflow-auto">
          <div className="flex flex-col flex-1 w-11/12 mx-auto">
            {/* Título e Botão */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl text-zinc-400">Pagamentos</h2>
                <p className="text-zinc-600 mt-1">Mantém controlo das contribuições dos alunos</p>
              </div>
              <button
                onClick={() => navigate('/payments/new')}
                className="bg-orange-700 text-white px-4 py-2 rounded hover:brightness-110 transition-all"
              >
                Novo Pagamento
              </button>
            </div>

            {/* Barra de Busca */}
            <div className="flex items-center gap-3 mt-6">
              <Search className="text-zinc-500" />
              <input
                type="text"
                placeholder="Buscar por aluno ou código..."
                className="flex-1 p-2 rounded-md border border-gray-400 bg-zinc-300 text-gray-700 placeholder:text-gray-700"
              />
            </div>

            {/* Tabela de Pagamentos */}
            <div className="overflow-x-auto mt-4 bg-zinc-100 shadow-md rounded-lg">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs uppercase bg-zinc-300 text-zinc-600">
                  <tr>
                    <th className="py-3 px-4">Aluno</th>
                    <th className="py-3 px-4">Código</th>
                    <th className="py-3 px-4">Valor</th>
                    <th className="py-3 px-4">Mês</th>
                    <th className="py-3 px-4">Ano</th>
                    <th className="py-3 px-4">Estado</th>
                    <th className="py-3 px-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.length > 0 ? (
                    filteredPayments.map((payment: object | null, index: number) => (
                      <tr
                        key={index}
                        className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                      >
                        <td className="py-3 px-4">
                          {payment?.enrollmentId?.studentId?.name?.surname
                            ? payment?.enrollmentId?.studentId?.name?.surname
                            : payment?.enrollmentId?.studentId?.name?.fullName?.split(' ')?.pop()}
                        </td>
                        <td className="py-3 px-4">
                          {payment?.enrollmentId?.studentId?.studentCode}
                        </td>
                        <td className="py-3 px-4">{formateCurrency(payment?.amount)}</td>
                        <td className="py-3 px-4">{payment?.paymentMonthReference}</td>
                        <td className="py-3 px-4">{payment?.paymentYearReference}</td>
                        <td
                          className={`py-3 px-4 ${
                            payment?.status === 'paid'
                              ? 'text-green-600'
                              : payment?.status === 'pending'
                                ? 'text-orange-600'
                                : 'text-red-600'
                          }`}
                        >
                          {payment?.status}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleDownloadPDF(payment)}
                            className="bg-orange-200 text-orange-700 px-2 py-1 rounded hover:brightness-125"
                          >
                            <DownloadCloud />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-3 px-4 text-center">
                        Nenhum pagamento encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
