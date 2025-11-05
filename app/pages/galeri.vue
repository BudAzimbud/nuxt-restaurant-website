<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center mb-8 text-gray-800">Menu Gallery</h1>
      
      <div class="bg-white p-6 rounded-lg shadow-md mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search Meals</label>
            <input
              v-model="searchQuery"
              @input="handleSearch"
              type="text"
              placeholder="Search for meals..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              v-model="selectedCategory"
              @change="handleCategoryFilter"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category.idCategory" :value="category.strCategory">
                {{ category.strCategory }}
              </option>
            </select>
          </div>
          
          <div class="flex items-end">
            <button
              @click="clearFilters"
              class="w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <div v-if="pending" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
        <p class="mt-4">Loading meals...</p>
      </div>

      <div v-else-if="meals?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="meal in meals" 
          :key="meal.idMeal"
          class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
        >
          <div class="relative">
            <img 
              :src="meal.strMealThumb" 
              :alt="meal.strMeal"
              class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            >
            <div class="absolute top-2 right-2">
              <span class="bg-orange-500 text-white px-2 py-1 rounded text-sm">
                {{ meal.strCategory }}
              </span>
            </div>
          </div>
          
          <div class="p-4">
            <h3 class="font-bold text-lg mb-2 text-gray-800 line-clamp-2">{{ meal.strMeal }}</h3>
            <p class="text-gray-600 text-sm mb-3">{{ meal.strArea || 'International' }}</p>
            
            <div class="flex justify-between items-center">
              <span class="text-xl font-bold text-orange-600">
                Rp 45.000
              </span>
              <button 
                @click="cartStore.addToCart(meal)"
                class="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors text-sm font-semibold"
              >
                + Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12">
        <div class="text-gray-400 text-6xl mb-4">🍽️</div>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">No meals found</h3>
        <p class="text-gray-500">Try adjusting your search or filter criteria</p>
      </div>
    </div>

    <CartDrawer :is-open="isCartDrawerOpen" @close="isCartDrawerOpen = false" />
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'
const { getCategories, getMealsByCategory, searchMeals } = useApi()
const cartStore = useCartStore()

const searchQuery = ref('')
const selectedCategory = ref('')
const meals = ref([])
const pending = ref(false)
const isCartDrawerOpen = ref(false)

onMounted(() => {
  window.addEventListener('open-cart-drawer', () => {
    isCartDrawerOpen.value = true
  })
})

const { data: categories } = await useLazyAsyncData('categories', async () => {
  const result = await getCategories()
  return result?.categories || []
})

const loadRandomMeals = async () => {
  pending.value = true
  try {
    const categoryList = ['Chicken', 'Beef', 'Seafood', 'Vegetarian', 'Pasta', 'Dessert']
    const allMeals = []
    
    for (const category of categoryList) {
      const result = await getMealsByCategory(category)
      if (result?.meals) {
        allMeals.push(...result.meals)
      }
    }
    
    meals.value = allMeals 
  } catch (error) {
    console.error('Error loading meals:', error)
  } finally {
    pending.value = false
  }
}

const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    await loadRandomMeals()
    return
  }
  
  pending.value = true
  try {
    const result = await searchMeals(searchQuery.value)
    meals.value = result?.meals || []
  } catch (error) {
    console.error('Error searching meals:', error)
    meals.value = []
  } finally {
    pending.value = false
  }
}

const handleCategoryFilter = async () => {
  if (!selectedCategory.value) {
    await loadRandomMeals()
    return
  }
  
  pending.value = true
  try {
    const result = await getMealsByCategory(selectedCategory.value)
    meals.value = result?.meals || []
  } catch (error) {
    console.error('Error filtering by category:', error)
    meals.value = []
  } finally {
    pending.value = false
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  loadRandomMeals()
}

onMounted(() => {
  loadRandomMeals()
})

useHead({
  title: 'Menu Gallery - Delicious Meals Restaurant',
  meta: [
    { name: 'description', content: 'Browse our complete menu of delicious meals from around the world' }
  ]
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>