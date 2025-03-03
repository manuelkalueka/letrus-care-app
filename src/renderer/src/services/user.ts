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
    return 500 // or any other default status code
  }
}

export const loginService = async ({ username, password }: IAuth): Promise<AxiosResponse> => {
  const response = await apiMananger.post('/users/login', {
    username,
    password
  })

  return response
}

export const logoutService = async (): Promise<void> => {
  try {
    await apiMananger.post('/users/logout')
  } catch (error) {
    console.log(error)
  }
}
