import { AxiosResponse } from 'axios'
import apiMananger from './api'

export interface ITeacher {
  _id?: string
  fullName: string
  birthDate: Date
  address: string
  phoneNumber: string
  email: string
  hireDate?: Date
  centerId: string
  user: string
  courses: string[]
  teacherCode?: string
  status: 'active' | 'inactive' | string
}

export async function createTeacher(data: ITeacher): Promise<number> {
  try {
    await apiMananger.post('/teachers/new', data)
    return 201
  } catch (error) {
    console.log('Erro ao criar professor', error)
    throw error
  }
}

export async function getTeachersService(centerId: string, page: number): Promise<AxiosResponse> {
  try {
    const { data } = await apiMananger.get(`/teachers/all/paginated/${centerId}?page=${page}`)
    return data
  } catch (error) {
    console.log('Erro ao buscar professores', error)
    throw error
  }
}

export async function getTeachersServiceAll(centerId: string): Promise<ITeacher[]> {
  try {
    const { data } = await apiMananger.get(`/teachers/all/${centerId}`)
    const typedData: ITeacher[] = data
    return typedData
  } catch (error) {
    console.log('Erro ao buscar professores', error)
    throw error
  }
}
