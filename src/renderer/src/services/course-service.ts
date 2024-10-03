import apiMananger from './api'

export interface ICourse extends Document {
  name: string
  description: string
  startDate: Date
  endDate: Date
  fee: number
  centerId: string
  status?: 'active' | 'inactive'
}

export async function createCourse(data: ICourse): Promise<void> {
  try {
    await apiMananger.post('/courses/new', data)
  } catch (error) {
    console.log('Erro ao criar curso ', error)
    throw error
  }
}

export const getOneCourseService = async (courseId: string) => {
  try {
    const { data } = await apiMananger.get(`/courses/${courseId}`)
    return data
  } catch (error) {
    console.log('Erro ao buscar curso: ', error)
    throw error
  }
}

export async function getCoursesService(centerId: string) {
  try {
    const { data } = await apiMananger.get(`/courses/all/${centerId}`)
    return data
  } catch (error) {
    console.log('Erro ao buscar cursos', error)
    throw error
  }
}

export const editCourse = async (courseId: string, data: ICourse) => {
  try {
    await apiMananger.put(`/courses/edit/${courseId}`, data)
  } catch (error) {
    console.log('Erro ao editar curso: ', error)
    throw error
  }
}

export async function deleteCourseService(id: string): Promise<void> {
  try {
    await apiMananger.patch(`/courses/delete/${id}`)
  } catch (error) {
    console.log('Erro ao eliminar curso', error)
    throw error
  }
}
