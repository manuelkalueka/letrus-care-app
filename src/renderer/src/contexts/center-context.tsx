import { createCenterService, ICenter } from '@renderer/services/center-service'

import React, { createContext, useState, useEffect, useContext } from 'react'

interface CenterContextData {
  loading: boolean
  center: object | null
  createCenter: (data: ICenter) => Promise<any>
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
      setLoading(false)
    }
    loadStorageData()
  }, [])

  async function createCenter(data: ICenter) {
    try {
      const response = await createCenterService(data)
      setCenter(response.data)
      localStorage.setItem('center', response.data)
      return response
    } catch (error) {
      console.log('Erro ao criar centro no contexto: ', error)
      throw error
    }
  }

  return (
    <CenterContext.Provider value={{ center, createCenter, loading }}>
      {children}
    </CenterContext.Provider>
  )
}
export function useCenter(): CenterContextData {
  const context = useContext(CenterContext)
  return context
}
