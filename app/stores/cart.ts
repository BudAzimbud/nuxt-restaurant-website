import { defineStore } from "pinia";

interface CartItem {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  price: number;
  quantity: number;
}

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      items: [] as CartItem[],
    };
  },
  getters: {
    cartItems: (state) => state.items,
    totalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
    subtotal: (state) => {
      return state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    tax: (state) => {
      return (
        state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ) * 0.1
      );
    },
    total: (state) => {
      const subtotal = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const tax =
        state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ) * 0.1;
      return subtotal + tax;
    },
  },
  actions: {
    async addToCart(meal: CartItem) {
      const existingItem = this.items.find(
        (item) => item.idMeal === meal.idMeal
      );

      if (existingItem) {
        existingItem.quantity += 1;
        this.showNotification(meal.strMeal, true);
      } else {
        this.items.push({
          idMeal: meal.idMeal,
          strMeal: meal.strMeal,
          strMealThumb: meal.strMealThumb,
          strCategory: meal.strCategory,
          strArea: meal.strArea,
          price: 45000, // there no price from api
          quantity: 1,
        });
        this.showNotification(meal.strMeal, false);
      }
    },
    showNotification(mealName: string, isUpdate: boolean) {
      const notification = document.createElement('div');
      notification.className = 'fixed top-20 right-4 bg-green-500 text-white p-4 rounded-lg shadow-xl z-50 max-w-sm';
      notification.innerHTML = `
        <div class="space-y-3">
          <div class="flex items-center space-x-3">
            <div class="text-2xl">✅</div>
            <div>
              <h3 class="font-bold text-base">${isUpdate ? 'Quantity Updated!' : 'Added to Cart!'}</h3>
              <p class="text-sm">${mealName}</p>
            </div>
          </div>
          <div class="flex gap-2 pt-2 border-t border-green-400">
            <button onclick="window.dispatchEvent(new Event('open-cart-drawer'))" class="flex-1 bg-white text-green-600 px-3 py-2 rounded text-sm font-semibold text-center hover:bg-green-50 transition">
              View Cart
            </button>
            <button onclick="this.closest('.fixed').remove()" class="px-3 py-2 text-sm hover:bg-green-600 rounded transition">
              Continue
            </button>
          </div>
        </div>
      `;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        if (notification.parentNode) {
          notification.style.opacity = '0';
          notification.style.transition = 'opacity 0.3s';
          setTimeout(() => {
            if (notification.parentNode) {
              notification.parentNode.removeChild(notification);
            }
          }, 300);
        }
      }, 5000);
    },
    async removeFromCart(mealId: string) {
      const index = this.items.findIndex((item) => item.idMeal === mealId);
      if (index > -1) {
        this.items.splice(index, 1);
      }
    },
    increaseQuantity(mealId: string) {
      const item = this.items.find((item) => item.idMeal === mealId);
      if (item) {
        item.quantity += 1;
      }
    },
    
    decreaseQuantity(mealId: string) {
      const item = this.items.find((item) => item.idMeal === mealId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        this.removeFromCart(mealId);
      }
    },
    updateQuantity(mealId: string, quantity: number){
    const item = this.items.find(item => item.idMeal === mealId)
    if (item) {
      item.quantity = quantity
      if (item.quantity <= 0) {
        this.removeFromCart(mealId)
      }
    }
  },
    clearCart() {
      this.items = [];
    }
  },
  persist: true,
});

