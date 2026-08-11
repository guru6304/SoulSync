# Soul Sync — Romantic Couple Web Application 💕

Soul Sync is an intimate, feature-rich web application designed for couples to deepen their emotional bond through daily mood sharing, romantic daily questions, love letter writing, nostalgic memory preservation, relationship timelines, and direct partner messaging.

---

## 🌟 Key Features

- **Atmospheric Mood Engine (9 Moods)**: Romantic ❤️, Happy 😊, Sad 😢, Angry 😡, Funny 😂, Missing You 💜, Sleepy 🌙, Celebration 🎉, Need a Hug 🫂. Dynamic UI backgrounds and floating particles tailored to each mood.
- **Daily Soul Card & Questions**: Daily interactive questions with single-card hero presentation and support for multiple response types (`yes_no`, `text`, `letter`, `image`, `audio`, `video`, `music`, `mixed`).
- **Partner Answers Privacy**: View your partner's responses once both of you complete today's question.
- **Write Love Letter**: Dedicated letter writing studio with live preview, word/reading-time statistics, and mood pills.
- **Create Memory**: Memory preservation album supporting title, story description, location, date, tags, and media attachments.
- **Say Something / Connect**: Direct partner message composer and connection status interface.
- **Couple Invitation & Authentication**: Secure couple matching with secret invitation codes and JWT authentication.

---

## 🏗️ Repository Architecture

```
SoulSync/
├── backend/                  # Express.js REST API & Database Models
│   ├── src/
│   │   ├── config/           # Database & environment configuration
│   │   ├── controllers/      # Route request controllers
│   │   ├── middlewares/      # Auth & error handling middlewares
│   │   ├── models/           # Sequelize ORM data models
│   │   ├── repositories/     # Data access abstraction layer
│   │   ├── routes/           # Express API endpoints (/api/v1/*)
│   │   └── services/         # Business & domain logic
│   └── README.md             # Backend documentation
├── frontend/                 # React 18 SPA Frontend
│   ├── public/               # Static assets & client routing redirects
│   ├── src/
│   │   ├── components/       # Reusable UI components & mood themes
│   │   ├── features/         # Specialized feature components (SoulCard, etc.)
│   │   ├── hooks/            # Custom React hooks (useQuestions, useMemories, etc.)
│   │   ├── pages/            # Route view components
│   │   ├── routes/           # React Router protected & public routing
│   │   ├── store/            # Redux Toolkit state slices
│   │   └── theme/            # Theme tokens & CSS variables
│   └── README.md             # Frontend documentation
├── .gitignore                # Root gitignore rules
└── README.md                 # Project root documentation
```

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 (Create React App)
- **State Management**: Redux Toolkit & React-Redux
- **Routing**: React Router v6
- **Icons**: Lucide React & Phosphor Icons
- **Styling**: Modern Vanilla CSS, Glassmorphism, CSS Variables, Responsive Layouts

### Backend
- **Runtime**: Node.js (>=18.18.0) & Express.js 5
- **Database**: MySQL / PostgreSQL with Sequelize ORM 6
- **Authentication**: JWT (JSON Web Tokens) with refresh token rotation & bcrypt password hashing
- **Media Uploads**: Multer & Cloudinary
- **Security & Logging**: Helmet, CORS, Morgan, Express Rate Limit

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18.18.0 or higher)
- **npm** (v9 or higher)
- **MySQL** or **PostgreSQL** database server

### 1. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_REFRESH_EXPIRES_IN=30d
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=soulsync_db
DB_DIALECT=mysql
CORS_ORIGIN=http://localhost:3000
```

Run database migrations & start backend server:
```bash
npm run migrate
npm run dev
```
Backend will start on `http://localhost:5000`.

### 2. Setup Frontend
```bash
cd ../frontend
npm install
```

Create a `.env` file inside `frontend/`:
```env
REACT_APP_API_BASE_URL=http://localhost:5000/api/v1
```

Start the frontend development server:
```bash
npm start
```
Frontend will run on `http://localhost:3000`.

---

## ☁️ Cloud Deployment (Render)

This repository is optimized for deployment on **Render**:
- **Backend Service**: Deployed as a **Render Web Service** (Root directory: `backend`, Build: `npm install`, Start: `npm start`).
- **Frontend App**: Deployed as a **Render Static Site** (Root directory: `frontend`, Build: `npm install && npm run build`, Publish: `build`).

For step-by-step instructions, see [Backend README](backend/README.md) and [Frontend README](frontend/README.md).

---

## 📄 License
Private & Proprietary — Soul Sync Application.
