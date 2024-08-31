import { useAuth } from '@renderer/contexts/auth-context'
import apiMananger from './api'

export interface ICenter {
  name: string
  address: string
  nif: string
  phoneNumber: string
  email?: string
  documentCode: string
  createdBy?: string
}

export const createCenterService = async (data: ICenter) => {
  const { user } = useAuth()
  const { address, documentCode, email, name, nif, phoneNumber } = data
  try {
    const response = await apiMananger.post('/centers/new', {
      address,
      createdBy: user?._id,
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
