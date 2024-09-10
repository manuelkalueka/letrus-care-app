import apiMananger from './api'
import { useState } from 'react'

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
  const storagedUser = localStorage.getItem('user')

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
    const { data } = await apiMananger.get(`/centers/user/${createdBy}`)
    const isExists = !!data
    return isExists
  } catch (error) {
    console.log('Erro ao verificar existencia de centro ', error)

    throw error
  }
}
