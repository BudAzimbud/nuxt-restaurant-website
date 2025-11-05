<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center mb-8 text-gray-800">Checkout</h1>
      
      <div v-if="cartItems.length === 0" class="text-center py-16">
        <div class="text-gray-400 text-8xl mb-6">🛒</div>
        <h2 class="text-2xl font-semibold text-gray-600 mb-4">No items to checkout</h2>
        <p class="text-gray-500 mb-8">Add some meals to your cart first!</p>
        <NuxtLink 
          to="/galeri" 
          class="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
        >
          Browse Menu
        </NuxtLink>
      </div>

      <!-- Checkout Form -->
      <div v-else class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Order Summary -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-semibold mb-6 text-gray-800">Order Summary</h2>
          
          <!-- Order Items -->
          <div class="space-y-4 mb-6">
            <div 
              v-for="item in cartItems" 
              :key="item.idMeal"
              class="flex items-center space-x-4 py-3 border-b border-gray-200"
            >
              <img 
                :src="item.strMealThumb" 
                :alt="item.strMeal"
                class="w-16 h-16 object-cover rounded-lg"
              >
              <div class="flex-grow">
                <h3 class="font-semibold text-gray-800">{{ item.strMeal }}</h3>
                <p class="text-gray-600 text-sm">Qty: {{ item.quantity }}</p>
              </div>
              <div class="text-right">
                <p class="font-bold">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
            </div>
          </div>
          
          <!-- Order Totals -->
          <div class="space-y-2">
            <div class="flex justify-between">
              <span>Subtotal:</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Tax (10%):</span>
              <span>${{ tax.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Delivery Fee:</span>
              <span>${{ deliveryFee.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-xl font-bold border-t pt-2">
              <span>Total:</span>
              <span class="text-orange-600">${{ total }}</span>
            </div>
          </div>
        </div>

        <!-- Checkout Form -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-semibold mb-6 text-gray-800">Delivery Information</h2>
          
          <form @submit.prevent="handleCheckout" class="space-y-4">
            <!-- Personal Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  v-model="checkoutForm.firstName"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  v-model="checkoutForm.lastName"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                v-model="checkoutForm.email"
                type="email"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <input
                v-model="checkoutForm.phone"
                type="tel"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
            </div>
            
            <!-- Delivery Address -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Delivery Address *</label>
              <textarea
                v-model="checkoutForm.address"
                required
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter your complete delivery address"
              ></textarea>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input
                  v-model="checkoutForm.city"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Postal Code *</label>
                <input
                  v-model="checkoutForm.postalCode"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
              </div>
            </div>
            
            <!-- Delivery Instructions -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Delivery Instructions (Optional)</label>
              <textarea
                v-model="checkoutForm.instructions"
                rows="2"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Any special instructions for delivery..."
              ></textarea>
            </div>
            
            <!-- Payment Method -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method *</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    v-model="checkoutForm.paymentMethod"
                    type="radio"
                    value="cash"
                    class="text-orange-500 focus:ring-orange-500"
                  >
                  <span class="ml-2">Cash on Delivery</span>
                </label>
                <label class="flex items-center">
                  <input
                    v-model="checkoutForm.paymentMethod"
                    type="radio"
                    value="card"
                    class="text-orange-500 focus:ring-orange-500"
                  >
                  <span class="ml-2">Credit/Debit Card</span>
                </label>
                <label class="flex items-center">
                  <input
                    v-model="checkoutForm.paymentMethod"
                    type="radio"
                    value="online"
                    class="text-orange-500 focus:ring-orange-500"
                  >
                  <span class="ml-2">Online Payment</span>
                </label>
              </div>
            </div>
            
            <!-- Submit Button -->
            <div class="pt-6">
              <button
                type="submit"
                :disabled="isProcessing"
                class="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isProcessing">Processing...</span>
                <span v-else>Bayar Sekarang - ${{ total.toFixed(2) }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>


const { cartItems, subtotal, tax, total, clearCart } = useCartStore()

const checkoutForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  instructions: '',
  paymentMethod: 'cash'
})

const isProcessing = ref(false)
const deliveryFee = ref(5.99)


const handleCheckout = async () => {
  isProcessing.value = true
  
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  showSuccessNotification()
  
  clearCart()
  
  Object.keys(checkoutForm).forEach(key => {
    if (key === 'paymentMethod') {
      checkoutForm[key] = 'cash'
    } else {
      checkoutForm[key] = ''
    }
  })
  
  isProcessing.value = false
}

const showSuccessNotification = () => {
  const notification = document.createElement('div')
  notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-6 rounded-lg shadow-lg z-50 max-w-sm'
  notification.innerHTML = `
    <div class="flex items-center space-x-3">
      <div class="text-2xl">✅</div>
      <div>
        <h3 class="font-bold">Pesanan Berhasil!</h3>
        <p class="text-sm">Pesanan akan diproses dan segera dikirim.</p>
      </div>
    </div>
  `
  
  document.body.appendChild(notification)
  
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification)
    }
  }, 5000)
  
  setTimeout(() => {
    navigateTo('/')
  }, 3000)
}

useHead({
  title: 'Checkout - Delicious Meals Restaurant',
  meta: [
    { name: 'description', content: 'Complete your order and get delicious meals delivered to your door' }
  ]
})
</script>