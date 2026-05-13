# 🌿 Garden Nest

🔗 **Live Site URL**: [https://ph-assignment-10-garden-nest.netlify.app/](https://ph-assignment-10-garden-nest.netlify.app/)

## 📌 Project Description:

**Garden Nest** is a social platform for garden enthusiasts made with `React JS`, to connect all gardeners. This is a resource for plant lovers, hobbyist gardeners, and experts too. Here, gardeners can share garden tips and tricks and discover local garden events. This project is fully responsive, so users across all platforms can use it seamlessly.

## ✨ Features:

* 📅 **Dynamic Home Banner**: Event-themed slider using `swiperJS` to view events.
* 🧑‍🌾 **Active Gardeners Spotlight**: Homepage highlights top 6 “Active” gardener profiles fetched dynamically from MongoDB.
* 👥 **Explore Gardeners**: Browse gardener profiles with detailed info like experience, status, and number of shared tips.
* 🪴 **Browse Tips**: Users can view all gardening advice and tips shared publicly with filtering based on difficulty level (Easy, Medium, Hard).
* ✍️ **Share a Garden Tip**: Users can post their own tips and tricks (publicly/privately); all public tips will be visible in the browse route.
* 🔄 **Update Tip**: Users can update their own tips.
* 🗑️ **Delete Tip**: Users can delete their own tips with a confirm alert.
* 🛠️ **Full Backend CRUD Functionality**: Users can create, read, update, and delete their own tips.
* ❤️ **Like & Trending System**: Users can like gardening tips.
* 🌗 **Dark/Light Mode**: Toggle between light and dark themes from the navbar.
* 🔐 **Authentication System**: Users can sign in/sign up using Email/Password or Google. Includes password validation, show/hide password, and secure private routes.
* 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop screens.

## 🛠️ Tech Stack:

* **Frontend**: React, Tailwind CSS, DaisyUI
* **Backend**: Node.js, Express.js
* **Database**: MongoDB
* **Authentication**: Firebase (Email/Password + Google Sign-In)
* **Routing**: React Router

## 📦 npm Packages:

* `swiperJS` – for the homepage slider.
* `sweet-alert2` – for success/error messages.
* `lottie-react` – for error page animations.
* `react-tooltip` – to show username on hover in the navbar.
* `react-icons` – for all icons used in the project.
* `react-helmet` – for dynamic page titles based on routes.
* `dotenv` – to secure sensitive Firebase config & MongoDB credentials.


### 🚀 Run the Project Locally:

1. **Clone the Repository**

```bash
https://github.com/noboKumar/Garden-Nest-Client.git
cd Garden-Nest-Client
```

2. **Install Dependencies**

```bash
npm install
```

3. **Set Environment Variables**

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_SERVER_URL=http://localhost:5000
```

4. **Start the Development Server**

```bash
npm run dev
```

> App will run at **[http://localhost:5173](http://localhost:5173)**

---

### 🔧 Backend Setup (Node.js + Express)

1. **Navigate to Backend Folder** (if it's a separate folder like `/server`):

```bash
cd server
```

2. **Install Backend Dependencies**

```bash
npm install
```

3. **Create a `.env` file**

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

4. **Start the Backend Server**

```bash
npm run dev
```

> Server will run at **[http://localhost:5000](http://localhost:5000)**

---
