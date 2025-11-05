<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-orange-500 mb-4">404</h1>
      <h2 class="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
      <p class="text-gray-600 mb-8">
        {{ error.message || 'The page you are looking for does not exist.' }}
      </p>
      <NuxtLink 
        to="/" 
        class="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-block"
      >
        Back to Home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  error: {
    type: Object,
    required: true
  }
})
</script>