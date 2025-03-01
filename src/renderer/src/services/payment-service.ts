import apiMananger from './api'

export interface IPayment {
  _id?: string
  enrollmentId: string
  amount: number
  paymentDate?: Date
  paymentMonthReference: string
  paymentYearReference: number
  dueDate?: Date
  status?: 'paid' | 'pending' | 'overdue'
  paymentMethod?: 'Dinheiro' | 'Multicaixa Express' | 'Transferência Bancária (ATM)'
  centerId: string
  userId: string
  lateFee: number
}

export interface IPaymentReceipt {
  receiptNumber: string
  paymentId: string
}

export async function createPaymentService(data: IPayment): Promise<void> {
  try {
    await apiMananger.post('/payments/new', data)
  } catch (error) {
    console.log('Erro ao fazer pagamento: ', error)
    throw error
  }
}
interface IResponse {
  payments: IPayment[]
  totalPayments: number
}

export async function getAllPaymentsService(centerId: string, page: number): Promise<IResponse> {
  try {
    const result = await apiMananger.get(`/payments/all/${centerId}?page=${page}`)
    const typedData: IResponse = result.data
    return typedData
  } catch (error) {
    console.log('Erro ao buscar pagamentos: ', error)
    throw error
  }
}

export async function getStudentPaymentsService(enrollmentId: string): Promise<IPayment[]> {
  try {
    const { data: results } = await apiMananger.get(`/payments/student/${enrollmentId}`)
    const typedResults: IPayment[] = results
    return typedResults
  } catch (error) {
    console.log('Erro ao buscar pagamentos do estudante: ', error)
    throw error
  }
}

export async function getPaymentService(
  id: string
): Promise<{ payment: IPayment; receipt: IPaymentReceipt }> {
  try {
    const { data: result } = await apiMananger.get(`/payments/${id}`)
    const typedResult: { payment: IPayment; receipt: IPaymentReceipt } = result
    return typedResult
  } catch (error) {
    console.log('Erro ao buscar pagamento: ', error)
    throw error
  }
}

export const searchPaymentsService = async (
  centerId: string,
  query: string
): Promise<IPayment[] | undefined> => {
  try {
    const { data } = await apiMananger.get(`/payments/search/${centerId}?query=${query}`)
    return data
  } catch (error) {
    console.log('Erro ao pesquisar pagamentos: ', error)
  }
}
