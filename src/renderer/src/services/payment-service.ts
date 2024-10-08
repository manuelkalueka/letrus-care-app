import apiMananger from './api'

interface IPayment {
  enrollmentId: string
  amount: number
  paymentDate: Date
  paymentMonthReference: string
  paymentYearReference: number
  dueDate: Date
  status: 'paid' | 'pending' | 'overdue'
  centerId: string
  user: string
}

export async function createPaymentService(data: IPayment): Promise<void> {
  try {
    await apiMananger.post('/payments/new', data)
  } catch (error) {
    console.log('Erro ao fazer pagamento: ', error)
    throw error
  }
}
