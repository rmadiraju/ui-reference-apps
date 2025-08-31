import React, { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { Content } from './components/Content'
import { Footer } from './components/Footer'
import { MessageService } from './services/MessageService'
import { DataService } from './services/DataService'
import type { ApiMessage, ApiData } from './types/api'
import './App.css'

function App() {
  const [message, setMessage] = useState<ApiMessage | null>(null)
  const [data, setData] = useState<ApiData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMessage = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await MessageService.getMessage()
      setMessage(response)
    } catch (err) {
      setError('Failed to fetch message from API')
      console.error('Error fetching message:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await DataService.getData()
      setData(response)
    } catch (err) {
      setError('Failed to fetch data from API')
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessage()
    fetchData()
  }, [])

  return (
    <div className="app">
      <Header />
      <Content 
        message={message}
        data={data}
        loading={loading}
        error={error}
        onRefreshMessage={fetchMessage}
        onRefreshData={fetchData}
      />
      <Footer />
    </div>
  )
}

export default App 