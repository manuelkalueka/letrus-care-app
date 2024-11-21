import { createCenterService, editCenterService, ICenter } from '@renderer/services/center-service'

import React, { createContext, useState, useEffect, useContext } from 'react'

interface CenterContextData {
  loading: boolean
  center: object | null
  createCenter: (data: ICenter) => Promise<void>
  editCenterContext: (centerId: string, data: ICenter) => Promise<void>
}

// Criação do contexto
export const CenterContext = createContext<CenterContextData>({} as CenterContextData)

export const CenterProvider: React.FC = ({ children }) => {
  const [center, setCenter] = useState<object | null>(null)
  const [loading, setLoading] = useState(true)

  // Persistência do usuário e token no local storage
  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const storagedCenter = localStorage.getItem('center')
      if (storagedCenter) {
        setCenter(JSON.parse(storagedCenter))
      }
      //ToDo colocar função de colocar centro no login
      setLoading(false)
    }
    loadStorageData()
  }, [])

  async function createCenter(data: ICenter) {
    try {
      const response = await createCenterService(data)
      setCenter(response?.data)
      localStorage.setItem('center', JSON.stringify(response?.data))
      return response
    } catch (error) {
      console.log('Erro ao criar centro no contexto: ', error)
      throw error
    }
  }

  async function editCenterContext(centerId: string, data: ICenter): Promise<void> {
    try {
      const response = await editCenterService(centerId, data)
      setCenter(response?.data)
      localStorage.removeItem('center')
      localStorage.setItem('center', JSON.stringify(response?.data))
    } catch (error) {
      console.log('Erro ao editar centro no contexto: ', error)
      throw error
    }
  }

  return (
    <CenterContext.Provider value={{ center, createCenter, loading, editCenterContext }}>
      {children}
    </CenterContext.Provider>
  )
}
export function useCenter(): CenterContextData {
  const context = useContext(CenterContext)
  return context
}
