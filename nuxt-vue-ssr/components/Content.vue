<template>
  <main class="content">
    <div class="container">
      <section class="message-section">
        <h2>API Message</h2>
        <p v-if="loading">Loading...</p>
        <p v-if="error" class="error">{{ error }}</p>
        <div v-if="message" class="message-card">
          <p>{{ message.message }}</p>
          <small>Version: {{ message.version }}</small>
          <small>Timestamp: {{ formatTimestamp(message.timestamp) }}</small>
          <button @click="$emit('refresh-message')" :disabled="loading">
            Refresh Message
          </button>
        </div>
      </section>

      <section class="data-section">
        <h2>API Data</h2>
        <p v-if="loading">Loading...</p>
        <p v-if="error" class="error">{{ error }}</p>
        <div v-if="data" class="data-card">
          <p>Total Items: {{ data.total }}</p>
          <div class="items-list">
            <div v-for="item in data.items" :key="item.id" class="item">
              <h3>{{ item.name }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </div>
          <small>Timestamp: {{ formatTimestamp(data.timestamp) }}</small>
          <button @click="$emit('refresh-data')" :disabled="loading">
            Refresh Data
          </button>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { ApiMessage, ApiData } from '~/types/api'

interface Props {
  message: ApiMessage | null
  data: ApiData | null
  loading: boolean
  error: string | null
}

interface Emits {
  (e: 'refresh-message'): void
  (e: 'refresh-data'): void
}

defineProps<Props>()
defineEmits<Emits>()

const formatTimestamp = (timestamp: string): string => {
  return new Date(timestamp).toLocaleString()
}
</script>

<style scoped>
.content {
  flex: 1;
  padding: 2rem 0;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.message-section,
.data-section {
  margin-bottom: 2rem;
}

.message-section h2,
.data-section h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.8rem;
}

.message-card,
.data-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.message-card p {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #333;
}

.message-card small,
.data-card small {
  display: block;
  color: #666;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.items-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.item {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  border-left: 4px solid #667eea;
}

.item h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.1rem;
}

.item p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.error {
  color: #dc3545;
  background: #f8d7da;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #f5c6cb;
}

button {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

button:hover {
  background: #5a6fd8;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }
  
  .items-list {
    grid-template-columns: 1fr;
  }
}
</style> 