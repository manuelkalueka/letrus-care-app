import apiMananger from './api'

interface IPayment {
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
}

export async function createPaymentService(data: IPayment): Promise<void> {
  try {
    await apiMananger.post('/payments/new', data)
  } catch (error) {
    console.log('Erro ao fazer pagamento: ', error)
    throw error
  }
}

export async function getAllPaymentsService(centerId: string) {
  try {
    const result = await apiMananger.get(`/payments/all/${centerId}`)
    return result
  } catch (error) {
    console.log('Erro ao buscar pagamentos: ', error)
    throw error
  }
}
