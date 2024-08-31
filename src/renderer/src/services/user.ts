import apiMananger from './api'

export interface IAuth {
  username: string
  password: string
  role?: string
}

export const signupService = async (data: IAuth): Promise<number | undefined> => {
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
  }
}

export const loginService = async ({ username, password }: IAuth) => {
  try {
    const response = await apiMananger.post('/users/login', {
      username,
      password
    })

    return response
  } catch (error) {
    console.log(error)
  }
}
