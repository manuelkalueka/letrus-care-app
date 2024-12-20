import { useAuth } from '@renderer/contexts/auth-context'
import apiMananger from './api'
import { AxiosResponse } from 'axios'

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
    if (storagedUser) {
      const user = JSON.parse(storagedUser)

      const { address, documentCode, email, name, nif, phoneNumber } = data
      const createdBy = user?._id

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
    }
  } catch (error) {
    console.log('Erro ao criar centro:', error)
    throw error
  }
}

export const isCenterExists = async (createdBy: string): Promise<boolean> => {
  try {
    const response = await apiMananger.get(`/centers/user/${createdBy}`)
    localStorage.setItem('center', response.data)
    const isExists = !!response.data
    return isExists
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
