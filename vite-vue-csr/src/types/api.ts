export interface ApiMessage {
  message: string
  timestamp: string
  version: string
}

export interface ApiDataItem {
  id: number
  name: string
  description: string
}

export interface ApiData {
  items: ApiDataItem[]
  total: number
  timestamp: string
}

export interface ApiEchoRequest {
  message: string
}

export interface ApiEchoResponse {
  echo: string
  timestamp: string
} 