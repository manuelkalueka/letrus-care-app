import { AxiosResponse } from 'axios'
import apiMananger from './api'

interface IEnrollment {
  studentId?: string
  courseId: string
  grade: string | string
  name: { fullName: string; surname?: string }
  birthDate: Date
  gender: 'masculino' | 'feminino'
  parents: { father: string; mother: string }
  address: string
  phoneNumber: string
  email?: string
  centerId: string
  userId: string
  doc_file?: File
  image_file?: File
}

interface IResponse {
  enrollments: IEnrollment
  totalEnrollments: number
}

export const createEnrollment = async (data: IEnrollment): Promise<AxiosResponse> => {
  const {
    name,
    birthDate,
    gender,
    parents,
    address,
    phoneNumber,
    email,
    centerId,
    courseId,
    grade,
    userId
  } = data

  try {
    // Cria o estudante
    const { data: studentData } = await apiMananger.post('/students/new', {
      name,
      birthDate,
      gender,
      address,
      phoneNumber,
      email,
      parents,
      centerId,
      userId
    })

    // Usa o ID do estudante recém-criado para criar a inscrição
    const newEnrollment = await apiMananger.post('/enrollments/new', {
      courseId,
      grade,
      centerId,
      studentId: studentData?._id,
      userId
    })

    return newEnrollment
  } catch (error) {
    console.log('Erro ao criar inscrição:', error)
    throw error
  }
}

export const getEnrollmentsService = async (centerId: string, page: number): Promise<IResponse> => {
  try {
    const { data } = await apiMananger.get(`/enrollments/all/${centerId}?page=${page}`)
    const typeData: IResponse = data
    return typeData
  } catch (error) {
    console.log('Erro ao buscar inscrições: ', error)
    throw error
  }
}

export const getOneEnrollmentService = async (enrollmentId: string): Promise<AxiosResponse> => {
  try {
    const { data } = await apiMananger.get(`/enrollments/${enrollmentId}`)
    return data
  } catch (error) {
    console.log('Erro ao buscar inscrição: ', error)
    throw error
  }
}

export const getEnrollmentByStudentService = async (studentId: string): Promise<AxiosResponse> => {
  try {
    const { data } = await apiMananger.get(`/enrollments/student/${studentId}`)
    return data
  } catch (error) {
    console.log('Erro ao buscar inscrição com estudante: ', error)
    throw error
  }
}

export const editEnrollment = async (enrollmentId: string, data: IEnrollment): Promise<void> => {
  try {
    await apiMananger.put(`/enrollments/edit/${enrollmentId}`, data)
  } catch (error) {
    console.log('Erro ao editar inscrições: ', error)
    throw error
  }
}
