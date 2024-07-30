import apiMananger from './api'

interface Auth {
  username: string
  password: string
  role?: string
}

export const signupService = async (data: Auth) => {
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

export const loginService = async ({ username, password }: Auth) => {
  try {
    const response = await apiMananger.post('/users/login', {
      username,
      password
    })
    apiMananger.defaults.headers.common['Authorization'] = response.data.token
    return response
  } catch (error) {
    console.log(error)
  }
}
