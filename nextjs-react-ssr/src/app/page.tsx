import { Header } from '@/components/Header'
import { Content } from '@/components/Content'
import { Footer } from '@/components/Footer'
import { MessageService } from '@/services/MessageService'
import { DataService } from '@/services/DataService'
import type { ApiMessage, ApiData } from '@/types/api'

export default async function HomePage() {
  // Server-side data fetching
  let message: ApiMessage | null = null
  let data: ApiData | null = null
  let error: string | null = null

  try {
    [message, data] = await Promise.all([
      MessageService.getMessage(),
      DataService.getData()
    ])
  } catch (err) {
    error = 'Failed to fetch data from API'
    console.error('Error fetching data:', err)
  }

  return (
    <div className="app">
      <Header />
      <Content 
        message={message}
        data={data}
        loading={false}
        error={error}
        onRefreshMessage={async () => {
          'use server'
          // Server action for refreshing data
        }}
        onRefreshData={async () => {
          'use server'
          // Server action for refreshing data
        }}
      />
      <Footer />
    </div>
  )
} 