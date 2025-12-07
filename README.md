# Threads Meta Clone - Frontend

![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?logo=tailwind-css)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.9-764ABC?logo=redux)

## Mục Lục

- [Tính Năng](#tính-năng)
- [Giao Diện](#giao-diện)
- [Công Nghệ](#công-nghệ)
- [Cài Đặt](#cài-đặt)
- [Chạy Dự Án](#chạy-dự-án)
- [Cấu Trúc Thư Mục](#cấu-trúc-thư-mục)
- [Cấu Hình](#cấu-hình)

---

## Tính Năng

### Xác Thực & Bảo Mật

- **Đăng ký/Đăng nhập** với username/email và password
- **Xác thực email** qua token
- **Quên mật khẩu** & **Reset password** qua email
- **Refresh token** tự động khi access token hết hạn
- **Protected routes** với authentication middleware
- **Debounced validation** cho username/email (real-time check)

### Quản Lý Bài Viết (Posts/Threads)

- **Tạo bài viết** với text, hình ảnh (upload multiple), emoji
- **Reply** (trả lời bài viết)
- **Quote** (trích dẫn bài viết)
- **Repost** (đăng lại bài viết)
- **Like/Unlike** bài viết
- **Save/Unsave** bài viết (lưu để đọc sau)
- **Hide post** (ẩn bài viết khỏi feed)
- **Delete post** (chỉ tác giả mới xóa được)
- **Load more** với infinite scroll (Virtuoso)
- **Real-time interaction** với Redux state management

### Quản Lý Hồ Sơ Người Dùng

- **Edit profile** (avatar, bio, name)
- **User preview card** (hover để xem thông tin nhanh)
- **Verified badge** cho tài khoản đã xác minh
- **Privacy settings**

### Tìm Kiếm & Khám Phá

- **Search users** với debounce
- **User suggestions** (đề xuất follow)

### Responsive UI/UX

- **Mobile-first design** responsive hoàn toàn
- **Dark/Light mode** toggle với next-themes
- **Smooth animations** với Framer Motion
- **Loading states** (skeleton screens, spinners)
- **Error boundaries** & fallback UI
- **Toast notifications** với Sonner
- **Modal system** (centered, drawer, bottom sheet)
- **Virtual scrolling** với react-virtuoso (performance optimization)
- **Drag & drop** với @dnd-kit (sắp xếp, reorder)

### Đa Ngôn Ngữ (i18n)

- **Hỗ trợ 2 ngôn ngữ**: Tiếng Việt, English
- **Auto-detect** ngôn ngữ trình duyệt
- **Switch language** real-time không reload page

### UI Components

- **shadcn/ui** components với Radix UI primitives
- **Custom components**: AvatarGroup, ModalPopup, MenuPopup, etc.
- **Form components** với React Hook Form + Zod validation
- **Icon library** với Lucide React
- **Emoji picker** (emoji-picker-react)
- **QR code generator** (qrcode.react, qr-code-styling)
- **Image viewer/slider** với Swiper

### Developer Experience

- **TypeScript** với strict mode
- **ESLint** + **Prettier** config
- **Feature-based architecture** (dễ scale & maintain)
- **Custom hooks** tái sử dụng
- **Redux DevTools** integration
- **Axios interceptors** cho error handling
- **Environment variables** với Vite

---

## Giao Diện

### Responsive Design

- **Mobile (< 768px)**: Bottom navigation, fullscreen modals, swipe gestures
- **Tablet (768px - 1024px)**: Sidebar navigation, 2-column layout
- **Desktop (> 1024px)**: 3-column layout, hover effects, preview cards

### Theme System

- **Light Mode**: Sáng, tươi sáng, phù hợp ban ngày
- **Dark Mode**: Tối, dễ nhìn, phù hợp ban đêm
- **System Mode**: Tự động theo theme hệ thống

### Layout

```
┌─────────────────────────────────────────────────┐
│  Header (Logo, Search, Profile)                │
├──────────┬──────────────────────┬───────────────┤
│          │                      │               │
│ Sidebar  │   Main Feed          │  Suggestions  │
│  Nav     │   (Posts, Replies)   │  (Users)      │
│          │                      │               │
│          │                      │               │
└──────────┴──────────────────────┴───────────────┘
```

---

## Công Nghệ

### Frontend Core

- **React 19.2.0** - UI library với React Compiler
- **TypeScript 5.x** - Type safety
- **Vite 6.x** - Build tool & dev server

### State Management

- **Redux Toolkit 2.9** - Global state management
- **React Hook Form 7.x** - Form state management
- **Zod** - Schema validation

### Styling

- **Tailwind CSS 4.x** - Utility-first CSS
- **class-variance-authority** - Component variants
- **clsx** - Conditional classnames
- **tailwindcss-animate** - Animation utilities

### UI Components

- **Radix UI** - Headless UI primitives
  - Avatar, Checkbox, Dialog, Dropdown, Label, Popover, Separator, Switch, Tabs, Toggle, Tooltip
- **shadcn/ui** - Pre-built components
- **Lucide React** - Icon library
- **Framer Motion** - Animation library

### Networking & Data

- **Axios 1.13** - HTTP client với interceptors
- **i18next** - Internationalization
- **react-i18next** - React integration cho i18n

### Performance & UX

- **react-virtuoso** - Virtual scrolling
- **Sonner** - Toast notifications
- **next-themes** - Theme switching

### Dev Tools

- **ESLint 9.x** - Code linting
- **TypeScript ESLint** - TypeScript linting rules
- **Vite Plugin React** - Fast refresh

---

## Cài Đặt

### Yêu Cầu Hệ Thống

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 hoặc **yarn** >= 1.22.0
- **Git** (để clone repository)

### Bước 1: Clone Repository

```bash
git clone https://github.com/Delunsss2345/threads-meta-frontend.git
cd threads-meta-frontend
```

### Bước 2: Cài Đặt Dependencies

```bash
# Sử dụng npm
npm install

# Hoặc sử dụng yarn
yarn install

# Hoặc sử dụng pnpm
pnpm install
```

### Bước 3: Cấu Hình Environment Variables

Tạo file `.env` ở root directory:

```bash
# API Configuration
VITE_BASE_API='Của bạn'
VITE_BASE_URL='Của bạn'
```

**Lưu ý:** File `.env.example` đã có sẵn template, bạn có thể copy:

```bash
cp .env.example .env
```

---

## Chạy Dự Án

### Development Mode

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: **http://localhost:5173**

### Build Production

```bash
npm run build
```

Output sẽ được generate trong folder `dist/`

### Preview Production Build

```bash
npm run preview
```

Preview build tại: **http://localhost:4173**

### Linting & Code Quality

```bash
# Check linting errors
npm run lint

# Auto-fix linting errors
npm run lint:fix
```

---

## Cấu Trúc Thư Mục

```
ThreadsUI/
├── public/                      # Static assets
│   ├── locales/                # i18n translation files
│   │   ├── en/
│   │   │   └── translation.json
│   │   └── vi/
│   │       └── translation.json
│   └── images/                 # Public images
│
├── src/
│   ├── assets/                 # Private assets (images, fonts)
│   │
│   ├── components/             # Shared components
│   │   ├── common/            # Common UI components
│   │   │   ├── Icon/         # Icon components
│   │   │   ├── Loading/      # Loading states
│   │   │   ├── Skeleton/     # Skeleton screens
│   │   │   ├── ModalPopup/   # Modal system
│   │   │   ├── MenuPopup/    # Dropdown menus
│   │   │   └── ...
│   │   ├── layout/           # Layout components
│   │   │   ├── AuthProvider/ # Authentication context
│   │   │   ├── ThemeProvider/# Theme context
│   │   │   ├── ModalProvider/# Modal management
│   │   │   └── AppRoutes/    # Route configuration
│   │   └── ui/               # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── form.tsx
│   │       └── ...
│   │
│   ├── features/              # Feature-based modules
│   │   ├── auth/             # Authentication
│   │   │   ├── components/  # LoginForm, RegisterForm, etc.
│   │   │   ├── api.ts       # Auth API calls
│   │   │   ├── hooks.ts     # useAuth, useLogin, etc.
│   │   │   ├── slice.ts     # Redux slice
│   │   │   ├── selectors.ts # Redux selectors
│   │   │   └── index.ts     # Public exports
│   │   │
│   │   ├── post/             # Posts/Threads
│   │   │   ├── components/  # Post, PostForm, ReplyModal, etc.
│   │   │   ├── api.ts
│   │   │   ├── hooks.ts
│   │   │   ├── slice.ts
│   │   │   ├── selectors.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── user/             # User management
│   │   │   ├── components/  # UserPreviewCard, FollowButton, etc.
│   │   │   ├── api.ts
│   │   │   ├── hooks.ts
│   │   │   ├── slice.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── search/           # Search functionality
│   │   ├── activity/         # Activity feed
│   │   ├── upload/           # File upload
│   │   └── modal/            # Modal state management
│   │
│   ├── pages/                 # Page components
│   │   ├── Home/             # Homepage feed
│   │   ├── Auth/             # Login, Register, ForgotPassword, etc.
│   │   ├── Profile/          # User profile pages
│   │   ├── PostDetail/       # Post detail view
│   │   ├── Search/           # Search page
│   │   ├── ActivityPage/     # Activity/notifications
│   │   ├── Settings/         # Settings page
│   │   ├── Following/        # Following feed
│   │   ├── Liked/            # Liked posts
│   │   ├── Saved/            # Saved posts
│   │   └── NotFound/         # 404 page
│   │
│   ├── layouts/              # Page layouts
│   │   ├── DefaultLayout/   # Main app layout
│   │   ├── AuthLayout/      # Auth pages layout
│   │   └── SettingLayout/   # Settings layout
│   │
│   ├── hooks/                # Custom hooks
│   │   ├── use-auth.ts
│   │   ├── use-modal.ts
│   │   ├── use-debounce.ts
│   │   ├── use-mobile.ts
│   │   └── ...
│   │
│   ├── lib/                  # Utility libraries
│   │   ├── utils.ts         # Helper functions
│   │   └── i18n.ts          # i18n utilities (useT hook)
│   │
│   ├── schema/               # Zod schemas
│   │   ├── auth.schema.ts   # Auth validation schemas
│   │   └── post.schema.ts   # Post validation schemas
│   │
│   ├── store/                # Redux store
│   │   └── index.ts         # Store configuration
│   │
│   ├── types/                # TypeScript types
│   │   ├── auth.ts
│   │   ├── post.ts
│   │   ├── user.ts
│   │   ├── api.ts
│   │   └── redux.ts
│   │
│   ├── utils/                # Utility functions
│   │   ├── http.ts          # Axios instance & interceptors
│   │   ├── format-time.ts   # Time formatting
│   │   └── isPublicApi.ts   # API route helpers
│   │
│   ├── config/               # Configuration files
│   │   └── config.tsx       # App configuration
│   │
│   ├── constant/             # Constants
│   │   ├── pagination.ts
│   │   ├── pageTitles.ts
│   │   └── componentsMap.tsx
│   │
│   ├── i18n.ts               # i18next configuration
│   ├── App.tsx               # Root component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
│
├── .env                       # Environment variables
├── .env.example              # Environment template
├── .gitignore                # Git ignore rules
├── components.json           # shadcn/ui config
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML template
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── tsconfig.app.json         # App TypeScript config
├── tsconfig.node.json        # Node TypeScript config
├── vite.config.ts            # Vite configuration
├── vercel.json               # Vercel deployment config
└── README.md                 # This file
```

---
