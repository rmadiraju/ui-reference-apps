<template>
  <header class="header">
    <div class="container">
      <h1>UI Reference Apps</h1>
      <p>Vite + Vue Client-Side Rendering</p>
    </div>
  </header>
</template>

<script setup lang="ts">
// Component logic can be added here
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 0;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
}

.header p {
  margin: 0;
  font-size: 1.2rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }
  
  .header p {
    font-size: 1rem;
  }
}
</style> 