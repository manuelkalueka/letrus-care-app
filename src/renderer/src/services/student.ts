import { AxiosResponse } from 'axios'
import apiMananger from './api'

export const searchStudentService = async (
  centerId: string,
  query: string
): Promise<AxiosResponse | null> => {
  try {
    const { data } = await apiMananger.get(`/students/search/${centerId}?query=${query}`)
    return data
  } catch (error) {
    if (error?.request?.status === 404) {
      return null
    } else {
      console.log('Erro ao buscar inscrições: ', error)
      throw error
    }
  }
}
