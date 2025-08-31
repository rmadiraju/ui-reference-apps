import axios from 'axios'
import type { ApiData } from '@/types/api'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api'

export class DataService {
  static async getData(): Promise<ApiData> {
    const response = await axios.get(`${API_BASE_URL}/data`)
    return response.data
  }
} 