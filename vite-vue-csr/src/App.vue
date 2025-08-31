<template>
  <div class="app">
    <Header />
    <Content 
      :message="message"
      :data="data"
      :loading="loading"
      :error="error"
      @refresh-message="fetchMessage"
      @refresh-data="fetchData"
    />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Header from './components/Header.vue'
import Content from './components/Content.vue'
import Footer from './components/Footer.vue'
import { MessageService } from './services/MessageService'
import { DataService } from './services/DataService'
import type { ApiMessage, ApiData } from './types/api'

const message = ref<ApiMessage | null>(null)
const data = ref<ApiData | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const fetchMessage = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await MessageService.getMessage()
    message.value = response
  } catch (err) {
    error.value = 'Failed to fetch message from API'
    console.error('Error fetching message:', err)
  } finally {
    loading.value = false
  }
}

const fetchData = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await DataService.getData()
    data.value = response
  } catch (err) {
    error.value = 'Failed to fetch data from API'
    console.error('Error fetching data:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchMessage()
  fetchData()
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style> 