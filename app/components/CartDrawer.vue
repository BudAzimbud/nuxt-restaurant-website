<template>
  <div>
    <!-- Overlay -->
    <Transition name="fade">
      <div
        v-if="isOpen"
        @click="closeDrawer"
        class="fixed inset-0 bg-black bg-opacity-50 z-40"
      ></div>
    </Transition>

    <!-- Drawer -->
    <Transition name="slide">
      <div
        v-if="isOpen"
        class="fixed right-0 top-0 h-full w-full md:w-[500px] bg-white shadow-2xl z-50 flex flex-col"
      >
        <!-- Header -->
        <div class="bg-orange-500 text-white p-4 flex justify-between items-center">
          <h2 class="text-xl font-semibold">
            Shopping Cart ({{ totalItems }} items)
          </h2>
          <button
            @click="closeDrawer"
            class="text-white hover:bg-orange-600 rounded-full p-2 transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Empty Cart -->
        <div v-if="cartItems.length === 0" class="flex-1 flex flex-col items-center justify-center p-8">
          <div class="text-gray-400 text-6xl mb-4">🛒</div>
          <h3 class="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
          <p class="text-gray-500 mb-6 text-center">Start adding some delicious meals!</p>
          <button
            @click="closeDrawer"
            class="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Browse Menu
          </button>
        </div>

        <!-- Cart Items -->
        <div v-else class="flex-1 overflow-y-auto">
          <div class="divide-y divide-gray-200">
            <div
              v-for="item in cartItems"
              :key="item.idMeal"
              class="p-4 flex items-center space-x-4 hover:bg-gray-50 transition"
            >
              <!-- Image -->
              <img
                :src="item.strMealThumb"
                :alt="item.strMeal"
                class="w-20 h-20 object-cover rounded-lg flex-shrink-0"
              >

              <!-- Details -->
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-gray-800 truncate">{{ item.strMeal }}</h3>
                <p class="text-sm text-gray-600">{{ item.strCategory }}</p>
                <p class="text-orange-600 font-bold mt-1">
                  Rp {{ item.price.toLocaleString('id-ID') }}
                </p>

                <!-- Quantity Controls -->
                <div class="flex items-center space-x-2 mt-2">
                  <button
                    @click="decreaseQuantity(item.idMeal)"
                    class="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                  >
                    <span class="text-sm font-bold">-</span>
                  </button>
                  <span class="w-8 text-center font-semibold text-sm">{{ item.quantity }}</span>
                  <button
                    @click="increaseQuantity(item.idMeal)"
                    class="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                  >
                    <span class="text-sm font-bold">+</span>
                  </button>
                </div>
              </div>

              <!-- Remove Button -->
              <button
                @click="removeFromCart(item.idMeal)"
                class="text-red-500 hover:text-red-700 p-2 flex-shrink-0"
                title="Remove"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Summary & Actions -->
        <div v-if="cartItems.length > 0" class="border-t bg-gray-50 p-4 space-y-3">
          <!-- Summary -->
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Subtotal:</span>
              <span class="font-semibold">Rp {{ subtotal.toLocaleString('id-ID') }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Pajak (10%):</span>
              <span class="font-semibold">Rp {{ tax.toLocaleString('id-ID') }}</span>
            </div>
            <div class="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total:</span>
              <span class="text-orange-600">Rp {{ total.toLocaleString('id-ID') }}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-2">
            <NuxtLink
              to="/checkout"
              @click="closeDrawer"
              class="block w-full bg-orange-500 text-white py-3 rounded-lg font-semibold text-center hover:bg-orange-600 transition"
            >
              Proceed to Checkout
            </NuxtLink>
            <button
              @click="handleClearCart"
              class="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition text-sm"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'
import { storeToRefs } from 'pinia'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

const cartStore = useCartStore()
const { cartItems, totalItems, subtotal, tax, total } = storeToRefs(cartStore)
const { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartStore

const closeDrawer = () => {
  emit('close')
}

const handleClearCart = () => {
  if (confirm('Are you sure you want to clear all items from your cart?')) {
    clearCart()
  }
}

onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape' && props.isOpen) {
      closeDrawer()
    }
  }
  document.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
/* Fade transition for overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide transition for drawer */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
