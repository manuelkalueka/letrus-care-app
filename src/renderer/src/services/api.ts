import axios from 'axios'
import { BASE_URL } from '../my-env'

const apiMananger = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})

export default apiMananger
