import apiMananger from './api'
import { ICourse } from './course-service'

export interface IClass {
  _id?: string
  course: string | ICourse
  period: 'morning' | 'moon' | 'evening' | string
  students?: string[]
  teachers: string[]
  className: string
  center: string
  classLimit?: number
  userId: string
  schedule: string
  grade: string
}

export const getClassesService = async (centerId: string): Promise<IClass[]> => {
  const { data } = await apiMananger.get(`/classes/all/${centerId}`)
  const typedData: IClass[] = data
  return typedData
}

export const createClassService = async (classData: IClass): Promise<IClass> => {
  try {
    const { data } = await apiMananger.post('/classes/new', classData)
    const typedData: IClass = data
    return typedData
  } catch (error) {
    console.log(error)
    throw error
  }
}
