# Restaurant Website - Nuxt 4

A modern restaurant website built with Nuxt 4, Vue 3, and pure CSS utilities. Features a complete food ordering system with shopping cart and checkout functionality.

## 🌟 Features

- **Homepage (Beranda)**: Hero section, category browsing, and featured dishes
- **Menu Gallery (Galeri)**: Browse all meals with search and category filtering
- **Shopping Cart**: Slide-in drawer with cart management (add, remove, adjust quantities)
- **Checkout**: Complete order form with customer details and payment options
- **Real-time API**: Integration with TheMealDB API for meal data
- **Persistent Cart**: Cart data saved in localStorage using Pinia
- **Responsive Design**: Mobile-first design with custom CSS utilities
- **Smooth Animations**: Cart drawer with slide transitions and notifications

## 🛠️ Tech Stack

- **Framework**: Nuxt 4.2.0
- **Frontend**: Vue 3.5.22
- **Styling**: Pure CSS with custom utility classes (CSS Variables + responsive utilities)
- **State Management**: Pinia with persistence plugin
- **API**: TheMealDB (https://www.themealdb.com)
- **Build Tool**: Vite 7.1.12

## 📁 Project Structure

```
app/
├── assets/
│   └── css/
│       ├── variables.css       # CSS custom properties (colors, spacing, etc.)
│       └── main.css            # Utility classes and component styles
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
```

Preview production build locally:
```bash
pnpm preview
```

## 📦 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Nuxt and deploy

Or use Vercel CLI:
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify

1. Build the project:
```bash
pnpm build
```

2. Deploy the `.output/public` directory to Netlify

Or use Netlify CLI:
```bash
npm i -g netlify-cli
netlify deploy --prod
```

## 🎯 Key Features Explained

### Cart Drawer Component
- Slide-in from right side on any page
- Real-time cart updates with Pinia
- Quantity controls with +/- buttons
- Remove items functionality
- Price calculation with 10% tax
- Smooth animations with Vue transitions

### API Integration
- Custom composable `useApi()` for clean API calls
- Endpoints:
  - `/categories.php` - Get all meal categories
  - `/filter.php?c={category}` - Get meals by category
  - `/search.php?s={query}` - Search meals by name
  - `/lookup.php?i={id}` - Get meal details

### State Management
- Pinia store with TypeScript interfaces
- Persistent cart using `@pinia-plugin-persistedstate`
- Reactive computed values for totals
- Notification system with DOM manipulation

## 🎨 Customization

### CSS Architecture
The project uses a custom CSS utility system similar to Tailwind but pure CSS:

**CSS Variables** (`assets/css/variables.css`):
- Color palette (primary orange, grays)
- Spacing scale (xs, sm, md, lg, xl, 2xl, 3xl)
- Typography scale (xs to 5xl)
- Border radius values
- Shadow definitions
- Transition timings
- Z-index layers

**Utility Classes** (`assets/css/main.css`):
- Layout: container, grid, flexbox
- Spacing: padding (p-*), margin (m-*), gap
- Typography: text sizes, weights, alignment
- Colors: text-*, bg-*, hover states
- Buttons: btn-primary, btn-secondary
- Forms: input, select, textarea with focus states
- Responsive: md:, lg:, xl: breakpoints

### Colors
Main colors defined in `variables.css`:
```css
--color-primary: #f97316;        /* Orange 500 */
--color-primary-dark: #ea580c;   /* Orange 600 */
--color-gray-*: ...              /* Gray scale */
```

Used throughout with utilities:
- `.bg-orange-500`, `.text-orange-600`
- `.hover:bg-orange-600`
- `.bg-primary`, `.text-primary`

### Pricing
Default price: Rp 45.000 per meal
To change, modify in `stores/cart.ts`:
```ts
price: 45000, // Change this value
```

## 📝 API Data Source

This project uses [TheMealDB API](https://www.themealdb.com/api.php):
- Free tier with 1 request per second
- Returns meal data with images, categories, and ingredients
- No authentication required

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as a restaurant website assignment project.

## 🙏 Acknowledgments

- [TheMealDB](https://www.themealdb.com) for the free meal API
- [Nuxt](https://nuxt.com) for the amazing framework
- [Pinia](https://pinia.vuejs.org) for state management


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
