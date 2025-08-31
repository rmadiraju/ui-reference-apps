import axios from 'axios'
import type { ApiData } from '../types/api'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export class DataService {
  static async getData(): Promise<ApiData> {
    const response = await axios.get(`${API_BASE_URL}/data`)
    return response.data
  }
} 