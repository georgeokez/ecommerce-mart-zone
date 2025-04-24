# E-Commerce Platform with Admin Dashboard

A modern, full-stack e-commerce application built with Next.js 15 and PostgreSQL. This platform includes both a customer-facing storefront and a comprehensive admin dashboard for managing products, orders, and customers.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-0.1.0-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

## Features

### Customer-Facing Storefront

- User authentication and account management
- Product browsing with advanced filtering and search
- Product detail pages with variants and inventory tracking
- Shopping cart with persistence and checkout flow
- Order tracking and history
- Product reviews and ratings
- Responsive design for all devices

### Admin Dashboard

- Comprehensive analytics and sales reporting
- Product management (add, edit, delete)
- Inventory tracking and alerts
- Order management and fulfillment
- Customer management
- User role management (admin, customer)
- Content management for storefront

## Tech Stack

### Frontend

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Shadcn UI** for component library
- **Lucide** for icons
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Recharts** for data visualization

### Backend

- **Next.js API Routes** for server-side API
- **PostgreSQL** for database (via Neon)
- **Prisma** for ORM and database management
- **Next Auth** for authentication
- **Zod** for validation
- **Stripe** for payment processing

### DevOps & Utilities

- **GitHub Actions** for CI/CD
- **Uploadthing** for file uploads
- **Resend** for transactional emails
- **ESLint** and **Prettier** for code quality

## Getting Started

### Prerequisites

- Node.js 20.x or later
- PostgreSQL database (we use Neon)
- Stripe account for payments
- Resend account for emails

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/ecommerce-app.git
cd ecommerce-app
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env.local
# Fill in your environment variables in .env.local
```

4. Set up the database

```bash
npm run db:migrate
npm run db:seed
```

5. Start the development server

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) to view the storefront
7. Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the admin dashboard

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed the database with test data
- `npm run db:reset` - Reset the database (caution: deletes all data)

## Project Structure

```
├── prisma/              # Database schema and migrations
├── public/              # Static files
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── admin/       # Admin dashboard pages
│   │   ├── api/         # API routes
│   │   └── (store)/     # Customer-facing pages
│   ├── components/      # Reusable components
│   ├── lib/             # Utility functions and shared code
│   ├── hooks/           # Custom React hooks
│   ├── store/           # Zustand store configurations
│   └── types/           # TypeScript type definitions
├── .github/             # GitHub Actions workflows
└── scripts/             # Utility scripts
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Shadcn UI](https://ui.shadcn.com/) for the beautiful components
- All the open source libraries that make this project possible
