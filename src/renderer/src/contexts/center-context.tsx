import {
  createCenterService,
  editCenterService,
  getCenterService,
  ICenter,
  isCenterExists
} from '@renderer/services/center-service'

import React, { createContext, useState, useEffect, useContext } from 'react'
import { useAuth } from './auth-context'
import { AxiosResponse } from 'axios'
import { getFromLocalStorage, saveToLocalStorage } from '@renderer/utils/localStorage'

interface CenterContextData {
  loading: boolean
  center: object | null
  createCenter: (data: ICenter, createdBy: string) => Promise<AxiosResponse>
  centerExistsContext: (userId: string) => Promise<boolean>
  editCenterContext: (centerId: string, data: ICenter) => Promise<void>
}

// Criação do contexto
export const CenterContext = createContext<CenterContextData>({} as CenterContextData)

export const CenterProvider: React.FC = ({ children }) => {
  const [center, setCenter] = useState<object | null>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  // Persistência do centro no local storage
  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const storagedCenter = localStorage.getItem('center')
      if (storagedCenter) {
        setCenter(JSON.parse(storagedCenter))
      } else if (user) {
        try {
          const response = await getCenterService(user?._id)
          setCenter(response.data)
          localStorage.setItem('center', JSON.stringify(response.data))
        } catch (error) {
          console.log('Erro ao carregar centro do backend:', error)
        }
      }
      setLoading(false)
    }
    loadStorageData()
  }, [user])

  async function createCenter(data: ICenter): Promise<AxiosResponse> {
    try {
      const response = await createCenterService(data, user?._id)
      setCenter(response?.data)
      saveToLocalStorage('center', response?.data)
      return response
    } catch (error) {
      console.log('Erro ao criar centro no contexto: ', error)
      throw error
    }
  }

  async function editCenterContext(centerId: string, data: ICenter): Promise<void> {
    try {
      const response = await editCenterService(centerId, data)
      setCenter(response.data)
      saveToLocalStorage('center', response.data)
    } catch (error) {
      console.log('Erro ao editar centro no contexto: ', error)
      throw error
    }
  }

  async function centerExistsContext(userId: string): Promise<boolean> {
    const cachedCenter = getFromLocalStorage('center')
    if (cachedCenter) {
      setCenter(cachedCenter)
      return true
    }

    const { isExists, response } = await isCenterExists(userId)
    if (isExists) {
      saveToLocalStorage('center', response?.data)
      setCenter(response?.data)
    }
    return isExists
  }

  return (
    <CenterContext.Provider
      value={{ center, createCenter, loading, editCenterContext, centerExistsContext }}
    >
      {children}
    </CenterContext.Provider>
  )
}

export function useCenter(): CenterContextData {
  const context = useContext(CenterContext)
  return context
}
