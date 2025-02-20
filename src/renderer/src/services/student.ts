import apiMananger from './api'

export interface IStudent {
  _id: string
  name: { fullName: string; surname?: string }
  birthDate: Date
  gender: 'masculino' | 'feminino' | string
  parents: { father: string; mother: string }
  address: string
  phoneNumber: string
  email?: string
  status: 'active' | 'inactive' | string
  centerId: string
  endStudiedDate: Date
  studentCode: string
}

export const searchStudentService = async (
  centerId: string,
  query: string
): Promise<IStudent[] | null> => {
  try {
    const { data } = await apiMananger.get(`/students/search/${centerId}?query=${query}`)
    const typedData: IStudent[] = data
    return typedData
  } catch (error) {
    if (error?.request?.status === 404) {
      return null
    } else {
      console.log('Erro ao pesquisar aluno: ', error)
      throw error
    }
  }
}

export const getStudentById = async (id: string): Promise<IStudent | null> => {
  try {
    const { data } = await apiMananger.get(`/students/${id}`)
    const typedData: IStudent = data
    return typedData
  } catch (error) {
    if (error?.request?.status === 404) {
      return null
    } else {
      console.log('Erro ao buscar aluno: ', error)
      throw error
    }
  }
}
