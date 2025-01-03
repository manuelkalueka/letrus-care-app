import { AxiosResponse } from 'axios'
import apiMananger from './api'

interface IClass {
  course: string
  period: 'morning' | 'moon' | 'evening' | string
  students?: string[]
  teachers: string[]
  className: string
  center: string
  classLimit?: number
  userId: string
  schedule: string
}

export const getClassesService = async (centerId: string): Promise<AxiosResponse> => {
  const { data } = await apiMananger.get(`/classes/all/${centerId}`)
  return data
}

export const createClassService = async (classData: IClass): Promise<AxiosResponse> => {
  try {
    const { data } = await apiMananger.post('/classes/new', classData)
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}
