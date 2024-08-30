import apiMananger from './api'

interface ICenter {
  name: string
  address: string
  nif: string
  phoneNumber: string
  email?: string
  documentCode: string
  createdBy?: string
}

export const createCenter = async (data: ICenter) => {
  const { address, documentCode, email, name, nif, phoneNumber } = data
  try {
    const response = await apiMananger.post('/centers/new', {
      address,
      createdBy: '66a7bcdb7baa3186dd5eddd2',
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
