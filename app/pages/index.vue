<template>
  <div class="min-h-screen bg-gray-50">
    <section class="bg-gradient-to-r from-orange-500 to-red-600 text-white">
      <div class="container mx-auto px-4 py-20 text-center">
        <h1 class="text-5xl font-bold mb-4">Delicious Meals</h1>
        <p class="text-xl mb-8">Discover amazing recipes from around the world</p>
        <NuxtLink 
          to="/galeri" 
          class="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Browse Menu
        </NuxtLink>
      </div>
    </section>

    <section class="container mx-auto px-4 py-16">
      <div class="flex justify-between items-center mb-12">
        <h2 class="text-3xl font-bold text-gray-800">Browse by Category</h2>
        <NuxtLink to="/galeri" class="text-orange-600 hover:text-orange-700 font-semibold">
          View All Menu →
        </NuxtLink>
      </div>
      
      <div v-if="loadingCategories" class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
        <p class="mt-4">Loading categories...</p>
      </div>

      <div v-else-if="categories.length" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <NuxtLink 
          v-for="category in categories" 
          :key="category.idCategory"
          :to="`/galeri?category=${category.strCategory}`"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
        >
          <img 
            :src="category.strCategoryThumb" 
            :alt="category.strCategory"
            class="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
          >
          <div class="p-4 text-center">
            <h3 class="font-bold text-lg text-gray-800">{{ category.strCategory }}</h3>
          </div>
        </NuxtLink>
      </div>
    </section>

    <section class="container mx-auto px-4 py-16 bg-white">
      <div class="flex justify-between items-center mb-12">
        <h2 class="text-3xl font-bold text-gray-800">Popular Dishes</h2>
        <NuxtLink to="/galeri" class="text-orange-600 hover:text-orange-700 font-semibold">
          See All Dishes →
        </NuxtLink>
      </div>
      
      <div v-if="loadingMeals" class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
        <p class="mt-4">Loading delicious meals...</p>
      </div>

      <div v-else-if="featuredMeals.length" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div 
          v-for="meal in featuredMeals" 
          :key="meal.idMeal"
          class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <img 
            :src="meal.strMealThumb" 
            :alt="meal.strMeal"
            class="w-full h-48 object-cover"
          >
          <div class="p-4">
            <h3 class="font-bold text-lg mb-1 text-gray-800 line-clamp-1">{{ meal.strMeal }}</h3>
            <p class="text-sm text-gray-600 mb-3">{{ meal.strCategory }}</p>
            <div class="flex justify-between items-center">
              <span class="text-xl font-bold text-orange-600">Rp 45.000</span>
              <button 
                @click="handleAddToCart(meal)"
                class="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors text-sm font-semibold"
              >
                + Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center">
        <p class="text-gray-600">No meals available at the moment.</p>
      </div>
    </section>

    <CartDrawer :is-open="isCartDrawerOpen" @close="isCartDrawerOpen = false" />
  </div>
</template>

<script setup>
import { useCartStore } from "~/stores/cart"

const featuredMeals = ref([])
const loadingMeals = ref(true)
const isCartDrawerOpen = ref(false)

const config = useRuntimeConfig()
const cartStore = useCartStore()

onMounted(() => {
  window.addEventListener('open-cart-drawer', () => {
    isCartDrawerOpen.value = true
  })
})

const { data: categoriesData, pending: loadingCategories } = await useFetch(
  `${config.public.apiBaseUrl}/categories.php`
)

const categories = computed(() => categoriesData.value?.categories || [])

const loadFeaturedMeals = async () => {
  loadingMeals.value = true
  try {
    // Use first 6 categories from API, or fallback to popular ones
    const categoriesToUse = categories.value.length >= 6 
      ? categories.value.slice(0, 6).map(c => c.strCategory)
      : ['Chicken', 'Beef', 'Seafood', 'Pasta', 'Dessert', 'Vegetarian']
    
    const allMeals = []
    
    for (const categoryName of categoriesToUse) {
      const { data } = await useFetch(
        `${config.public.apiBaseUrl}/filter.php?c=${categoryName}`
      )
      if (data.value?.meals) {
        // Take 2 meals from each category
        allMeals.push(...data.value.meals.slice(0, 2))
      }
    }
    
    featuredMeals.value = allMeals
  } catch (error) {
    console.error('Error loading meals:', error)
    featuredMeals.value = []
  } finally {
    loadingMeals.value = false
  }
}

const handleAddToCart = (meal) => {
  cartStore.addToCart(meal)
}

onMounted(() => {
  loadFeaturedMeals()
})

useHead({
  title: 'Home - Delicious Meals Restaurant',
  meta: [
    { name: 'description', content: 'Discover amazing recipes and delicious meals from around the world' }
  ]
})
</script>