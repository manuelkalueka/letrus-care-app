import { AxiosResponse } from 'axios'
import apiMananger from './api'

export interface IAuth {
  _id?: string
  username: string
  password: string
  role?: string
}

export const signupService = async (data: IAuth): Promise<number> => {
  const { username, password, role } = data
  try {
    const { status } = await apiMananger.post('/users/new', {
      username,
      password,
      role
    })
    return status
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const loginService = async ({ username, password }: IAuth): Promise<AxiosResponse> => {
  try {
    const response = await apiMananger.post('/users/login', {
      username,
      password
    })

    return response
  } catch (error) {
    console.log('erro no login: ', error)
    throw error
  }
}

export const logoutService = async (): Promise<void> => {
  try {
    await apiMananger.post('/users/logout')
  } catch (error) {
    console.log(error)
  }
}
