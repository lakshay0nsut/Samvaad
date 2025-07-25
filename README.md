# 🗨️ Samvaad - Full-Stack Real-Time Chat Application

Samvaad is a secure, full-stack real-time chat application that supports private messaging, user authentication, profile management, and responsive UI design. Built using Node.js, Express, React, and MongoDB, and deployed on Render.

## 🌐 Live Demo

🔗 [View Deployed App](https://cryptalk-ymbk.onrender.com)

---

## 🚀 Features

- 🔐 User authentication using JWT (register, login, logout)  
- 🧑‍🤝‍🧑 Private one-on-one messaging with user search  
- 📝 User profile management (view/edit)  
- 🌈 Responsive UI with Tailwind CSS and DaisyUI  
- 🌍 Hosted on Render with separate frontend and backend deployments  
- 🌐 CORS and `.env.production` handling with Vite  

---

## 🛠️ Tech Stack

**Frontend:**  
- React 19  
- Vite  
- Tailwind CSS  
- DaisyUI  
- Axios  
- Lucide React  

**Backend:**  
- Node.js  
- Express  
- MongoDB Atlas  
- Mongoose  
- JSON Web Token (JWT)  
- bcryptjs  
- dotenv  
- CORS  

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/lakshay0nsut/Samvaad.git
cd Samvaad
```

### 2. Setup backend (server/)
```bash
cd server
npm install
Create a .env file in server/ and add:
```

env
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start backend:
```bash
npm start
```
### 3. Setup frontend (client/)
```bash
cd ../client
npm install
```

Create a .env.production file in client/ and add:
```bash
VITE_BASE_URL=https://your-backend-api-url.com
```
To run locally:
```bash
npm run dev
```
To build for production:
```bash
npm run build
```
