import apiMananger from './api'

interface Auth {
  name?: string
  username: string
  password: string
  email?: string
}

export const signupService = async (data: Auth) => {
  const { name, username, password, email } = data
  try {
    const response = await apiMananger.post('/users/register', {
      name,
      username,
      password,
      email
    })
    return response
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
