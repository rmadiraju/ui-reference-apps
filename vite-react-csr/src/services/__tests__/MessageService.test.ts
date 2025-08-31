import axios from 'axios'
import { MessageService } from '../MessageService'

// Mock axios
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('MessageService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getMessage', () => {
    it('should fetch message from API successfully', async () => {
      const mockResponse = {
        message: 'Hello from UI Reference Backend!',
        timestamp: '2024-01-01T00:00:00.000Z',
        version: '1.0.0'
      }

      mockedAxios.get.mockResolvedValueOnce({ data: mockResponse })

      const result = await MessageService.getMessage()

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/message')
      expect(result).toEqual(mockResponse)
    })

    it('should handle API errors', async () => {
      const errorMessage = 'Network Error'
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage))

      await expect(MessageService.getMessage()).rejects.toThrow(errorMessage)
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/message')
    })
  })
}) 