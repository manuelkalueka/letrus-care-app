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

export async function getCoursesService() {
  try {
    const { data } = await apiMananger.get('/courses/all')
    return data
  } catch (error) {
    console.log('Erro ao buscar cursos', error)
    throw error
  }
}

export async function deleteCourseService(id: string): Promise<void> {
  try {
    await apiMananger.patch(`/courses/delete/${id}`)
  } catch (error) {
    console.log('Erro ao eliminar cursos', error)
    throw error
  }
}
