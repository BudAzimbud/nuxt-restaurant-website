import { useFetch, useRuntimeConfig } from "nuxt/app"

const useApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl

  const fetchMeals = async (endpoint: string) => {
    try {
      const { data } = await useFetch(`${baseURL}${endpoint}`)
      return data.value
    } catch (error) {
      console.error('Error fetching meals:', error)
      throw error
    }
  }

  return {
    fetchMeals,
    
    getCategories: () => fetchMeals('/categories.php'),
    
    getMealsByCategory: (category: string) => fetchMeals(`/filter.php?c=${category}`),
    
    searchMeals: (query: string) => fetchMeals(`/search.php?s=${query}`),
    
    getMealDetails: (id: string) => fetchMeals(`/lookup.php?i=${id}`),
    
    getRandomMeal: () => {
      return fetchMeals('/random.php')},
  }
}

export default useApi