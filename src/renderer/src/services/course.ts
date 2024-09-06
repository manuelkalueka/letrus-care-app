import apiMananger from './api'

export interface ICourse extends Document {
  name: string
  description: string
  startDate: Date
  endDate: Date
  fee: number
  centerId: string
  status: 'active' | 'inactive'
}

export async function createCourse(data: ICourse): Promise<void> {
  try {
    await apiMananger.post('/courses/new', data)
  } catch (error) {
    console.log('Erro ao criar curso ', error)
    throw error
  }
}
