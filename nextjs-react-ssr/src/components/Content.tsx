import type { ApiMessage, ApiData } from '@/types/api'

interface ContentProps {
  message: ApiMessage | null
  data: ApiData | null
  loading: boolean
  error: string | null
  onRefreshMessage: () => void
  onRefreshData: () => void
}

export function Content({
  message,
  data,
  loading,
  error,
  onRefreshMessage,
  onRefreshData
}: ContentProps) {
  return (
    <main className="content">
      <div className="container">
        <section className="message-section">
          <h2>API Message</h2>
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          {message && (
            <div className="message-card">
              <p>{message.message}</p>
              <small>Version: {message.version}</small>
              <small>Timestamp: {new Date(message.timestamp).toLocaleString()}</small>
              <button onClick={onRefreshMessage} disabled={loading}>
                Refresh Message
              </button>
            </div>
          )}
        </section>

        <section className="data-section">
          <h2>API Data</h2>
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          {data && (
            <div className="data-card">
              <p>Total Items: {data.total}</p>
              <div className="items-list">
                {data.items.map((item) => (
                  <div key={item.id} className="item">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
              <small>Timestamp: {new Date(data.timestamp).toLocaleString()}</small>
              <button onClick={onRefreshData} disabled={loading}>
                Refresh Data
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  )
} 