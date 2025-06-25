# ✍️ Wordraft — A Modern Blogging Platform Built with Next.js

**Wordraft** is a full-stack, modern, and responsive blogging platform where users can read, write, edit, and delete blogs. Built using the powerful **Next.js App Router**, **MongoDB**, **Tailwind CSS**, and **NextAuth**, it provides a clean, dark-themed experience with full authentication, SEO-friendly slugs, and a smooth UI.

>
---

## 🔧 Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Framer Motion
- **Authentication**: NextAuth.js
- **Database**: MongoDB Atlas + Mongoose
- **Deployment**: Vercel

---

## 🌟 Features

- ✅ Login / Signup using NextAuth
- ✅ Create, Edit & Delete blogs (CRUD)
- ✅ Auth-based access (only author can edit/delete)
- ✅ Slug-based dynamic routes for SEO
- ✅ Profile page with user blogs
- ✅ Responsive and dark-themed UI
- ✅ Smooth page transitions with Framer Motion
- ✅ Protected API routes using server session
- ✅ Custom 404 and error handling
- ✅ Alerts, loaders, and confirmation prompts
- ✅ Markdown / Rich text support (coming soon)

---

##  Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/nakul-3205/wordraft-nextjs-blog-app
cd wordraft

# 2. Install dependencies
npm install

# 3. Create your .env file
cp .env.example .env.local
# Add your MongoDB URI, Google credentials, etc.

# 4. Run the dev server
npm run dev
