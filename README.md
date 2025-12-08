<div align="center">

# Threads Meta Clone

### Nền tảng mạng xã hội hiện đại lấy cảm hứng từ Threads của Meta

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://threads-meta-frontend.vercel.app/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/Redux-2.9-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)

[Live Demo](https://threads-meta-frontend.vercel.app/) • [Documentation](#documentation) • [Report Bug](https://github.com/Delunsss2345/threads-meta-frontend/issues) • [Request Feature](https://github.com/Delunsss2345/threads-meta-frontend/issues)

</div>

---

## Giới Thiệu Dự Án

Threads Meta Clone là một ứng dụng mạng xã hội đầy đủ tính năng được xây dựng với các công nghệ tiên tiến nhất. Dự án này tái tạo các chức năng cốt lõi của nền tảng Threads của Meta, với giao diện hiện đại, responsive, hỗ trợ dark/light theme, tương tác real-time và trải nghiệm người dùng mượt mà.

### Điểm Nổi Bật

- **Giao diện pixel-perfect** - Tái tạo trung thực thiết kế Threads
- **Hỗ trợ theme** - Dark/Light mode với chuyển đổi mượt mà
- **Responsive hoàn toàn** - Tối ưu cho mobile, tablet và desktop
- **Hiệu năng cao** - Xây dựng với Vite và tối ưu với React 19 Compiler
- **Bảo mật** - Xác thực JWT với refresh token flow
- **Đa ngôn ngữ** - Hỗ trợ Tiếng Việt và English
- **Accessibility** - Tuân thủ các chuẩn về khả năng tiếp cận

---

## Mục Lục

- [Tính Năng](#tính-năng)
- [Công Nghệ](#công-nghệ)
- [Bắt Đầu](#bắt-đầu)
  - [Yêu Cầu](#yêu-cầu)
  - [Cài Đặt](#cài-đặt)
  - [Biến Môi Trường](#biến-môi-trường)
- [Sử Dụng](#sử-dụng)
- [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
- [Đóng Góp](#đóng-góp)
- [License](#license)
- [Liên Hệ](#liên-hệ)

---

---

## Tính Năng

### Xác Thực & Bảo Mật

- Đăng ký/Đăng nhập với username/email
- Xác thực email qua token
- Quên mật khẩu & đặt lại mật khẩu
- Tự động refresh token khi hết hạn
- Protected routes với authentication middleware
- Validation username/email real-time

### Quản Lý Bài Viết

- Tạo bài viết với text, hình ảnh, và emoji
- Trả lời bài viết
- Trích dẫn bài viết (quote posts)
- Repost bài viết
- Like/Unlike bài viết
- Lưu bài viết
- Ẩn bài viết
- Xóa bài viết của mình
- Infinite scroll với virtual scrolling (react-virtuoso)
- Quản lý state real-time với Redux

### Quản Lý Hồ Sơ

- Chỉnh sửa profile (avatar, bio, tên hiển thị)
- Xem thông tin user nhanh khi hover
- Verified badge cho tài khoản đã xác minh
- Cài đặt quyền riêng tư
- Follow/Unfollow người dùng
- Xem danh sách followers và following

### Tìm Kiếm & Khám Phá

- Tìm kiếm người dùng với debounced input
- Gợi ý người dùng nên follow

### Giao Diện & UX

- **Thiết kế mobile-first** responsive hoàn toàn
- **Dark/Light/System theme** chuyển đổi mượt mà
- **Animations mượt mà** sử dụng Framer Motion
- **Loading states** với skeleton screens
- **Error boundaries** với fallback UI
- **Toast notifications** sử dụng Sonner
- **Modal system** (centered, drawer, bottom sheet)
- **Virtual scrolling** tối ưu hiệu năng
- **Drag & drop** hỗ trợ

### Đa Ngôn Ngữ

- Hỗ trợ 2 ngôn ngữ: Tiếng Việt (vi) và English (en)
- Tự động phát hiện ngôn ngữ trình duyệt
- Đổi ngôn ngữ real-time không cần reload trang

### Trải Nghiệm Phát Triển

- TypeScript với strict mode
- Cấu hình ESLint + Prettier
- Kiến trúc feature-based dễ mở rộng
- Custom hooks tái sử dụng
- Tích hợp Redux DevTools
- Axios interceptors xử lý lỗi tập trung

---

## Công Nghệ

<details>
<summary><b>Frontend Core</b></summary>

- **React 19.2.0** - Thư viện UI với React Compiler
- **TypeScript 5.x** - Kiểm tra kiểu tĩnh
- **Vite 6.x** - Build tool thế hệ mới

</details>

<details>
<summary><b>Quản Lý State</b></summary>

- **Redux Toolkit 2.9** - Quản lý state toàn cục
- **React Hook Form 7.x** - Quản lý state form
- **Zod** - Validation schema

</details>

<details>
<summary><b>Styling & UI</b></summary>

- **Tailwind CSS 4.x** - CSS framework utility-first
- **Radix UI** - Headless UI primitives
- **shadcn/ui** - Thư viện component tái sử dụng
- **Framer Motion** - Thư viện animation
- **Lucide React** - Thư viện icon
- **class-variance-authority** - Component variants
- **tailwindcss-animate** - Animation utilities

</details>

<details>
<summary><b>Data Fetching & API</b></summary>

- **Axios 1.13** - HTTP client với interceptors
- **i18next** - Framework đa ngôn ngữ
- **react-i18next** - Tích hợp React cho i18n

</details>

<details>
<summary><b>Performance & UX</b></summary>

- **react-virtuoso** - Virtual scrolling cho danh sách lớn
- **Sonner** - Hệ thống toast notification

</details>

<details>
<summary><b>Development Tools</b></summary>

- **ESLint 9.x** - Code linting
- **TypeScript ESLint** - Linting rules cho TypeScript
- **Vite Plugin React** - Fast refresh và HMR

</details>

---

## Bắt Đầu

### Yêu Cầu

Trước khi bắt đầu, đảm bảo bạn đã cài đặt:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 hoặc **yarn** >= 1.22.0
- **Git**

### Cài Đặt

1. **Clone repository**

```bash
git clone https://github.com/Delunsss2345/threads-meta-frontend.git
cd threads-meta-frontend
```

2. **Cài đặt dependencies**

```bash
# Sử dụng npm
npm install

# Hoặc sử dụng yarn
yarn install

# Hoặc sử dụng pnpm
pnpm install
```

3. **Thiết lập biến môi trường**

Tạo file `.env` trong thư mục root:

```env
# API Configuration
VITE_BASE_API=your_api_url
VITE_BASE_URL=http://localhost:5173
```

> **Lưu ý:** Bạn có thể copy `.env.example` làm template:
>
> ```bash
> cp .env.example .env
> ```

4. **Khởi động development server**

```bash
npm run dev
```

Ứng dụng sẽ chạy tại **http://localhost:5173**

---

## Sử Dụng

### Chế Độ Development

```bash
npm run dev
```

Chạy ứng dụng ở chế độ development với hot module replacement (HMR).

### Build Production

```bash
npm run build
```

Build ứng dụng cho production vào thư mục `dist/`.

### Xem Trước Build

```bash
npm run preview
```

Xem trước production build tại **http://localhost:4173**

### Kiểm Tra Code

```bash
# Kiểm tra lỗi linting
npm run lint

# Tự động sửa lỗi linting
npm run lint:fix
```

---

---

## Cấu Trúc Dự Án

```
threads-meta-frontend/
├── public/                      # Static assets
│   ├── locales/                # i18n translation files
│   │   ├── en/translation.json
│   │   └── vi/translation.json
│   └── images/                 # Public images
│
├── src/
│   ├── components/             # Reusable components
│   │   ├── common/            # Shared UI components
│   │   ├── layout/            # Layout components
│   │   └── ui/                # shadcn/ui components
│   │
│   ├── features/              # Feature modules (Redux slices)
│   │   ├── auth/             # Authentication
│   │   ├── post/             # Posts/Threads
│   │   ├── user/             # User management
│   │   ├── search/           # Search functionality
│   │   ├── activity/         # Activity feed
│   │   ├── upload/           # File upload
│   │   └── modal/            # Modal state
│   │
│   ├── pages/                 # Page components
│   ├── layouts/               # Page layouts
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility libraries
│   ├── schema/                # Zod validation schemas
│   ├── store/                 # Redux store configuration
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions
│   ├── config/                # App configuration
│   └── constant/              # Constants
│
├── .env                        # Environment variables
├── .env.example               # Environment template
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── vercel.json                # Vercel deployment config
```

<details>
<summary><b>Xem cấu trúc chi tiết</b></summary>

### Kiến Trúc Feature-Based

Mỗi feature module tuân theo cấu trúc:

```
features/
└── [feature-name]/
    ├── components/         # Components của feature
    ├── api.ts             # API calls cho feature này
    ├── hooks.ts           # Custom hooks cho feature này
    ├── slice.ts           # Redux slice
    ├── selectors.ts       # Redux selectors
    └── index.ts           # Public exports
```

Kiến trúc này cung cấp:

- **Scalability** - Dễ dàng thêm features mới
- **Maintainability** - Tách biệt rõ ràng các concerns
- **Reusability** - Components và hooks chia sẻ
- **Testability** - Các feature modules độc lập

</details>

---

## Đóng Góp

Mọi đóng góp đều rất được trân trọng. Bất kỳ đóng góp nào của bạn đều **rất có ý nghĩa**.

### Cách Đóng Góp

1. Fork dự án
2. Tạo Feature Branch (`git checkout -b feature/TinhNangMoi`)
3. Commit thay đổi (`git commit -m 'Add: Mô tả ngắn gọn'`)
4. Push lên Branch (`git push origin feature/TinhNangMoi`)
5. Mở Pull Request

### Chuẩn Code

- **TypeScript** - Sử dụng strict mode, tránh `any`
- **Components** - Sử dụng functional components với hooks
- **Quy ước đặt tên**:
  - Files: `kebab-case.tsx`
  - Components: `PascalCase`
  - Functions/variables: `camelCase`
  - Constants: `UPPER_SNAKE_CASE`
- **Imports** - Sử dụng absolute imports với `@/` prefix
- **Comments** - Viết comments cho logic phức tạp

### Quy Ước Commit

Tuân theo chuẩn [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: thêm tính năng mới
fix: sửa lỗi
docs: cập nhật tài liệu
style: format code (không thay đổi logic)
refactor: refactor code
test: thêm hoặc cập nhật tests
chore: cập nhật dependencies hoặc config
```

---

## License

Dự án này được phân phối dưới giấy phép **MIT License** - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

---

## Tác Giả

**Delunsss2345**

- GitHub: [@Delunsss2345](https://github.com/Delunsss2345)
- Repository: [threads-meta-frontend](https://github.com/Delunsss2345/threads-meta-frontend)

---

## Lời Cảm Ơn

Cảm ơn đặc biệt đến:

- [Meta Threads](https://threads.net) - Cảm hứng UI/UX
- [shadcn/ui](https://ui.shadcn.com) - Thư viện component tuyệt vời
- [Radix UI](https://radix-ui.com) - Accessible primitives
- [Tailwind CSS](https://tailwindcss.com) - CSS framework utility-first
- [React](https://react.dev) - Thư viện cho web và native interfaces

---

## Hỗ Trợ

Nếu bạn gặp vấn đề hoặc có câu hỏi:

1. **Kiểm tra Issues** - Xem [GitHub Issues](https://github.com/Delunsss2345/threads-meta-frontend/issues)
2. **Tạo Issue mới** - Mở issue mới với labels phù hợp
3. **Discussions** - Tham gia [GitHub Discussions](https://github.com/Delunsss2345/threads-meta-frontend/discussions)

---

## Trạng Thái Dự Án

![GitHub last commit](https://img.shields.io/github/last-commit/Delunsss2345/threads-meta-frontend)
![GitHub issues](https://img.shields.io/github/issues/Delunsss2345/threads-meta-frontend)
![GitHub stars](https://img.shields.io/github/stars/Delunsss2345/threads-meta-frontend)
![GitHub forks](https://img.shields.io/github/forks/Delunsss2345/threads-meta-frontend)

---

<div align="center">

### Nếu bạn thấy dự án hữu ích, hãy cho một star!

**[Về đầu trang](#threads-meta-clone)**

Made with love by [Delunsss2345](https://github.com/Delunsss2345)

</div>
