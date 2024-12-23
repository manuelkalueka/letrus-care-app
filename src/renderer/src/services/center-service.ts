import { AxiosResponse } from 'axios'
import apiMananger from './api'

export interface ICenter {
  name: string
  address: string
  nif?: string
  phoneNumber: string
  email?: string
  documentCode?: string
  createdBy?: string
}

export const createCenterService = async (data: ICenter, createdBy: string) => {
  try {
    const { address, documentCode, email, name, nif, phoneNumber } = data

    const response = await apiMananger.post('/centers/new', {
      address,
      createdBy,
      documentCode,
      email,
      name,
      nif,
      phoneNumber
    })
    return response
  } catch (error) {
    console.log('Erro ao criar centro:', error)
    throw error
  }
}

export const getCenterService = async (createdBy: string): Promise<AxiosResponse> => {
  try {
    const response = await apiMananger.get(`/centers/user/${createdBy}`)
    return response
  } catch (error) {
    console.log('Erro ao buscar centro:', error)
    throw error
  }
}

type centerFunctionProps = { isExists: boolean; response: AxiosResponse | null }
export const isCenterExists = async (createdBy: string): Promise<centerFunctionProps> => {
  try {
    const response = await getCenterService(createdBy)
    const isExists = !!response.data
    return { isExists, response }
  } catch (error) {
    console.log('Erro ao verificar existencia de centro ', error)

    throw error
  }
}

export const editCenterService = async (centerId: string, data: ICenter) => {
  try {
    const response = await apiMananger.put(`/centers/edit/${centerId}`, data)
    return response.data
  } catch (error) {
    console.log('Erro editar centro ', error)

    throw error
  }
}
