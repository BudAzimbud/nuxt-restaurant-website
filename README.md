# Restaurant Website - Nuxt 4

A modern restaurant website built with Nuxt 4, Vue 3, and Tailwind CSS. Features a complete food ordering system with shopping cart and checkout functionality.

## 🌟 Features

- **Homepage (Beranda)**: Hero section, category browsing, and featured dishes
- **Menu Gallery (Galeri)**: Browse all meals with search and category filtering
- **Shopping Cart**: Slide-in drawer with cart management (add, remove, adjust quantities)
- **Checkout**: Complete order form with customer details and payment options
- **Real-time API**: Integration with TheMealDB API for meal data
- **Persistent Cart**: Cart data saved in localStorage using Pinia
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Smooth Animations**: Cart drawer with slide transitions and notifications

## 🛠️ Tech Stack

- **Framework**: Nuxt 4.2.0
- **Frontend**: Vue 3.5.22
- **Styling**: Tailwind CSS v4 with @tailwindcss/vite
- **State Management**: Pinia with persistence plugin
- **API**: TheMealDB (https://www.themealdb.com)
- **Build Tool**: Vite 7.1.12

## 📁 Project Structure

```
app/
├── assets/
│   └── css/
│       └── main.css           # Tailwind CSS imports
├── components/
│   └── CartDrawer.vue          # Shopping cart drawer component
├── composables/
│   └── useApi.ts               # API wrapper for TheMealDB
├── layouts/
│   └── default.vue             # Main layout with navigation
├── pages/
│   ├── index.vue               # Homepage
│   ├── galeri.vue              # Menu gallery
│   ├── keranjang.vue           # Cart page (legacy, now uses drawer)
│   └── checkout.vue            # Checkout page
└── stores/
    └── cart.ts                 # Pinia store for cart management
```

## 🚀 Setup

### Prerequisites
- Node.js 18+ or 20+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd restaurant-website-nuxt
```

2. Install dependencies:
```bash
pnpm install
```

3. Create `.env` file (optional, API URL already configured):
```bash
API_BASE_URL=https://www.themealdb.com/api/json/v1/1
```

## 💻 Development

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

The app will be available at:
- Local: http://localhost:3000
- Network: http://192.168.x.x:3000 (use `--host` flag)

## 🏗️ Production

Build the application for production:

```bash
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
