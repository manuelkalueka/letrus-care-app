import { AxiosResponse } from 'axios'
import apiMananger from './api'

interface ITeacher {
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

export async function getTeachersService(centerId: string): Promise<AxiosResponse> {
  try {


    const { data } = await apiMananger.get(`/teachers/all/${centerId}`)
    return data
  } catch (error) {
    console.log('Erro ao buscar professores', error)
    throw error
  }
}
