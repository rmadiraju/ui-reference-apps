<template>
  <div class="app">
    <Header />
    <Content 
      :message="message"
      :data="data"
      :loading="pending"
      :error="error"
      @refresh-message="refreshMessage"
      @refresh-data="refreshData"
    />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import type { ApiMessage, ApiData } from '~/types/api'

// Server-side data fetching
const { data: message } = await useFetch<ApiMessage>('/api/message')
const { data: data, pending, error, refresh: refreshData } = await useFetch<ApiData>('/api/data')

const refreshMessage = async () => {
  await refresh()
}

const refresh = async () => {
  await $fetch('/api/message')
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style> 