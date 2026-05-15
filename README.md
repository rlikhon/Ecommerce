# 🛒 MegaShop E-Commerce Admin & Customer Ecosystem

A high-performance, responsive E-Commerce suite featuring a **React (Vite) frontend** and a **Laravel API backend**. This platform features advanced state management, layout-driven route security, real-time analytics dashboards, and an optimized modular architecture.

---

## 🚀 Core Features

### Frontend (React + Vite + Bootstrap 5 SASS)
*   **Layout-Driven Route Protection:** Centrally managed route guarding using React Router's `<Outlet />` framework.
*   **High-Density Dashboard:** Real-time visual metrics and trend tracking powered by `recharts`.
*   **Intuitive UI Context:** Sidebar navigation equipped with string prefix `.startsWith()` path detection to maintain active link selection across all CRUD sub-routes.
*   **Optimistic UI Image Vault:** Instant thumbnail generation via `URL.createObjectURL` for immediate background gallery uploads.
*   **Live Promo Ticker:** Asynchronous countdown clock loop embedded within the header matrix to drive conversion urgency.
*   **Zero Tailwind CSS:** Formed completely using custom modular `SASS` built on top of robust Bootstrap 5 utilities.

### Backend (Laravel API Hub)
*   **Strict Relational Integrity:** Normalization across products, categories, brands, sizes, and product images using high-efficiency Eloquent Many-to-Many configurations.
*   **Image Processing Pipeline:** Automated dual-tier compression (Large scaling and small square cover cropping) leveraging Intervention Image.

---

## 🛡️ Security Architecture & Data Protection

Security is baked into the core of the application through multiple defensive layers:

### 1. Hardened Authentication Layer
*   **JWT Bearer Protocol**: Uses JSON Web Tokens for stateless authentication. Tokens are transmitted via the `Authorization` header on every request through a centralized Axios client.
*   **Stateful Session Persistence**: User state is synchronized between `AdminAuthContext` and `localStorage`, ensuring UI consistency across tabs while maintaining a single source of truth for the session.
*   **Atomic Session Revocation**: The `axios.interceptors.response` logic identifies `401 Unauthorized` responses instantly, triggering a global state purge (localStorage wipe + Redirect) to prevent "Ghost Sessions."

### 2. Layout-Driven Route Guards
*   **Structural Encapsulation**: Instead of per-page guards, the application uses a `Parent-Guard` strategy (`<AdminRequireAuth />`). This prevents unprotected components from even mounting, effectively stopping data leakage at the routing level.
*   **Internal Redirect Loop**: Attempting to access any `/admin/*` route without a valid context triggers a hard `replace` navigate to `/admin/login`.

### 3. Network Boundary Security
*   **Automated Boundary Generation**: Image uploads use `multipart/form-data` with browser-generated boundaries to prevent payload tampering and ensure structural integrity for complex file streams.
*   **Service-Level Decoupling**: API interactions are abstracted into dedicated Service Layers (e.g., `ProductServices.ts`), isolating the UI from raw endpoint logic and centralizing input sanitization.

---

## 🚀 Key Implementations & Architectural Features

### 💎 Optimistic UI & Interactive Gallery
*   **Zero-Latency Uploads**: Implemented an "Optimistic UI" pattern for product images. When a user selects a file, a local blob URL (`URL.createObjectURL`) is instantly rendered. The server sync happens in the background, replacing the preview with the permanent AWS/Local URL upon success.
*   **State Rollback Logic**: If a network failure occurs during upload, the UI automatically reverts by filtering the failed blob from the state, providing clear user feedback without breaking the layout.

### 🎨 Custom SASS Architecture (Zero Tailwind)
*   **Modular Stylesheets**: Built on a pure SCSS foundation using Bootstrap 5 variables. This allows for deep brand customization that utility classes cannot achieve.
*   **Render-Tree Flex Stack**: Solved "Footer Jump" issues using a continuous flex stack from `html` down to the `main` container, ensuring the footer stays anchored even on sparsely populated pages.
*   **Dynamic Viewport Scaling**: Custom `@media` queries handled within `style.scss` provide granular control over complex UI elements like the Swiper banners and high-density data tables.

### 📊 Real-Time Analytics Hub
*   **High-Density Visualization**: Integrated `recharts` for live metric tracking. The dashboard utilizes Area and Bar charts to provide at-a-glance insights into Revenue Trends and Order Frequency.
*   **Urgent Notification Matrix**: A priority-based alert system catches "Low Stock" and "Pending Approvals" before they become critical issues.

### 🧭 Intelligent Navigation Logic
*   **Partial Prefix Matching**: The sidebar uses `location.pathname.startsWith(item.path)` instead of exact matches. This keeps parent menu items (like "Products") highlighted even when the user is deep in sub-routes like `/admin/products/edit/102`.

---

## 🛠️ Tech Stack Metadata
*   **Frontend**: React 19 (Vite), React-Bootstrap, React-Router 7, Lucide Icons.
*   **State**: Context API for Auth, Native React states for component-level data.
*   **Form Logic**: `react-hook-form` for performant, validation-heavy CRUD entries.
*   **Asset Pipeline**: Intervention Image (Laravel) + `multipart/form-data` streams.

---

## 📁 System Architecture

```text
src/
├── assets/
│   └── css/
│       └── style.scss          # Global style sheets (SASS variables, animations, custom rules)
├── components/
│   ├── admin/
│   │   ├── brand/              # Brand CRUD operations
│   │   ├── category/           # Category CRUD operations
│   │   ├── product/            # Product CRUD operations
│   │   ├── AdminRequireAuth.tsx# Protective parent gate
│   │   ├── Dashboard.jsx       # Chart metric visualization hub
│   │   └── Login.jsx           # Gateway for admin token generation
│   ├── common/
│   │   ├── Footer.jsx          # Social inline-SVG support + trust widgets
│   │   ├── Header.jsx          # React-Bootstrap navbar + interval countdown
│   │   ├── Layout.jsx          # Shell maintaining viewport structural spacing
│   │   └── Sidebar.jsx         # Partial match (.startsWith) route navigation
│   └── context/
│       └── AdminAuth.tsx       # LocalStorage sync state manager
├── hooks/                      # Custom hooks for dynamic data fetching
├── services/                   # Axios wrapper tracking Laravel APIs
└── App.tsx                     # Nested layout routing configuration
```

---

## 🛠️ Local Machine Installation & Setup

### 1. Prerequisites
*   Node.js (v18+)
*   PHP (v8.2+)
*   Composer
*   MySQL / MariaDB

### 2. Backend Setup (Laravel)
1. Navigate to backend directory.
2. `composer install`
3. `cp .env.example .env`
4. `php artisan key:generate`
5. Configure `DB_*` in `.env`.
6. `php artisan migrate --seed`
7. `php artisan serve`

### 3. Frontend Setup (React + Vite)
1. Navigate to frontend directory.
2. `npm install`
3. `npm run dev`

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
