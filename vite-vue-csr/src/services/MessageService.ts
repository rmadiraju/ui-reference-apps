import axios from 'axios'
import type { ApiMessage } from '@/types/api'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export class MessageService {
  static async getMessage(): Promise<ApiMessage> {
    const response = await axios.get(`${API_BASE_URL}/message`)
    return response.data
  }
} 