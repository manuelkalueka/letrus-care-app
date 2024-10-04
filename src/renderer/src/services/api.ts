import axios from 'axios'
import { BASE_URL } from '../my-env'
const apiMananger = axios.create({
  baseURL: BASE_URL,
  timeout: 9000
})

export default apiMananger
