import axios from 'axios'
import type { ApiMessage } from '@/types/api'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api'

export class MessageService {
  static async getMessage(): Promise<ApiMessage> {
    const response = await axios.get(`${API_BASE_URL}/message`)
    return response.data
  }
} 