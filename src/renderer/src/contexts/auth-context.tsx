import apiMananger from '@renderer/services/api'
import { IAuth, loginService, signupService } from '@renderer/services/user'
import React, { createContext, useState, useEffect, useContext } from 'react'

interface AuthContextData {
  signed: boolean
  loading: boolean
  user: object | null
  login: (data: IAuth) => Promise<object | null>
  signup: (data: IAuth) => Promise<number | undefined>
  logout: () => void
}

// Criação do contexto
export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null)
  const [loading, setLoading] = useState(true)

  // Persistência do usuário e token no local storage
  useEffect(() => {
    function loadStorageData(): void {
      const storagedUser = localStorage.getItem('user')
      const storagedToken = localStorage.getItem('token')

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser))
        apiMananger.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`
      }
      setLoading(false)
    }
    loadStorageData()
  }, [])

  // Função para login
  const login = async ({ password, username }: IAuth): Promise<object | null> => {
    try {
      const response = await loginService({ password, username })

      const { data } = response
      setUser(data?.user)
      localStorage.setItem('user', JSON.stringify(data?.user))
      localStorage.setItem('token', data?.token)
      apiMananger.defaults.headers.common['Authorization'] = `Bearer ${data?.token}`

      return response?.data
    } catch (error) {
      console.log('Erro no login em contexto ', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Função para signup
  const signup = async (data: IAuth): Promise<number | undefined> => {
    try {
      const status = await signupService(data)
      return status
    } catch (error) {
      console.log('erro de cadastro no contexto ', error)
      throw error
    }
  }

  // Função para logout
  const logout = (): void => {
    localStorage.removeItem('center')

    localStorage.removeItem('user')
    localStorage.removeItem('token')

    delete apiMananger.defaults.headers.common['Authorization']
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)
  return context
}
