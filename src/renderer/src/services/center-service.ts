import apiMananger from './api'

interface ICenter {
  name: string
  address: string
  nif: string
  phoneNumber: string
  email: string
  createdAt: Date
  documentCode: string
  createdBy: string
}

export const createCenter = async (data: ICenter): Promise<void> => {
  const {address, createdAt, createdBy, documentCode,  email, name, nif, phoneNumber} = data
  try {
    await apiMananger.post('/centers/new', data)
  } catch (error) {
    console.log('Erro ao criar centro:', error)
    throw error
  }
}
