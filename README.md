# 🌿 Garden Nest AI ✨

**Garden Nest AI** is a premium, full-stack gardening community platform powered by cutting-edge Generative AI. It connects plant enthusiasts, organic farmers, and urban gardeners to share wisdom, discover tips, and grow together in an intelligent, interactive environment.

![Garden Nest AI Banner](https://images.unsplash.com/photo-1416870230247-3b4a80247961?auto=format&fit=crop&q=80&w=1200&h=400)

## 🚀 Live Demo
- **Live Frontend**: [https://garden-nest-ai.vercel.app](https://garden-nest-ai.vercel.app)

---

## 🔑 Demo Credentials

To fully experience the role-based dashboard and features, use the following demo accounts (or use the one-click demo login buttons on the site):

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@gardennest.com` | `admin123` |

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 16.2 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + ShadCN UI
- **Animations**: Framer Motion
- **Data Visualization**: Recharts
- **Forms & Validation**: React Hook Form + Zod
- **API Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose / Native Driver)
- **Authentication**: Firebase Auth (Google + Email/Password)

### Artificial Intelligence
- **Provider**: Google Gemini
- **Model**: `gemini-flash-latest`
- **SDK**: `@google/generative-ai`

---

## ✨ Key Features

### 🤖 1. AI-Powered Experiences
- **GardenSage Chatbot**: A 24/7 floating, context-aware AI gardening assistant built into the application. It provides instant, expert advice on plant care, pest management, and soil health.
- **AI Instant Draft & Magic Refine**: A generative content suite for sharing tips. Users can input a simple title to instantly generate a full, properly categorized gardening post, or use "Magic Refine" to expand and professionalize their rough notes.

### 👥 2. Role-Based Access Control
- **Visitor**: Can explore the platform, read tips, and use the AI Chatbot.
- **Gardener**: Can share new tips, like posts, comment on discussions, and access personalized dashboard analytics.
- **Admin**: Has full oversight over the platform, users, and overall content statistics.

### 📊 3. Interactive Dashboards
- Personalized overview cards and dynamic, real-time charts (built with Recharts) showing tip distribution, likes received, and difficulty breakdowns.

### 🔍 4. Advanced Exploration
- **Debounced Search**: Lightning-fast, optimized searching.
- **Multi-layered Filtering**: Filter community tips by Category, Difficulty Level, and Sort Order (Newest, Oldest, Most Liked).

### 🎨 5. Premium UI/UX
- Fully responsive "container-fluid" design.
- Glassmorphic elements, subtle glowing borders, and smooth page transitions powered by Framer Motion.
- Full Light and Dark mode support with accessible contrast ratios.

---

## 💻 How to Run Locally

### Prerequisites
- Node.js (v18+)
- MongoDB connection string
- Google Gemini API Key
- Firebase Project setup

### 1. Clone the Repositories
```bash
git clone <frontend-repo-url>
git clone <backend-repo-url>
```

### 2. Backend Setup
1. Navigate to the server directory:
   ```bash
   cd Garden-Nest-Server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the server:
   ```env
   PORT=5000
   MONGODB_USER=your_db_user
   MONGODB_PASSWORD=your_db_password
   ```
4. Start the server:
   ```bash
   npm run start
   ```

### 3. Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd Garden-Nest-Client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root of the client:
   ```env
   NEXT_PUBLIC_SERVER_URL=http://localhost:5000
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_config
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_config
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_config
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 License
This project is licensed under the MIT License.
