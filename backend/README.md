# Soul Sync — Backend API Services ⚙️

The backend service for Soul Sync provides secure RESTful APIs, JWT authentication, user & couple state management, question & answer repositories, love letters, memories, and Cloudinary media upload integration.

---

## 📁 Architecture Overview

```
backend/
├── src/
│   ├── config/             # Database connection (Sequelize) & environment settings
│   ├── controllers/        # Request & response controllers
│   │   ├── answer.controller.js
│   │   ├── auth.controller.js
│   │   ├── coupleInvitation.controller.js
│   │   ├── memory.controller.js
│   │   ├── question.controller.js
│   │   ├── saySomething.controller.js
│   │   └── upload.controller.js
│   ├── middlewares/        # Authentication & error handling
│   ├── models/             # Sequelize ORM schema definitions (User, Couple, Answer, Question, Memory, Letter)
│   ├── repositories/       # Database queries & data abstraction layer
│   ├── routes/             # Express API route endpoints (/api/v1/*)
│   ├── services/           # Core business & authorization logic
│   ├── utils/              # Helper utilities & custom loggers
│   ├── app.js              # Express app setup, CORS, Rate Limiting & Helmet
│   └── server.js           # Server initialization & HTTP port binding
├── package.json
└── README.md
```

---

## 🛠️ API Endpoint Summary

All routes are prefixed with `/api/v1`.

### 🔑 Authentication (`/api/v1/auth`)
- `POST /register`: Register a new user account.
- `POST /login`: Authenticate user with credentials or secret code.
- `POST /refresh`: Refresh access token using valid refresh token.
- `GET /me`: Get current logged-in user profile & active couple state.

### 💌 Couple Invitations (`/api/v1/couple-invitations`)
- `POST /`: Send couple invitation via partner email or secret code.
- `GET /pending`: Retrieve pending invitations for logged-in user.
- `POST /:id/accept`: Accept invitation & establish couple connection.
- `POST /:id/reject`: Reject pending invitation.

### ❓ Questions & Answers (`/api/v1/questions` & `/api/v1/answers`)
- `GET /questions/daily`: Retrieve today's daily soul question for selected mood.
- `POST /answers`: Submit answer for current user.
- `GET /answers/my`: Get current user's past answers.
- `GET /answers/partner`: Get partner's answers (scoped to authorized couple).

### 📸 Memories & Letters (`/api/v1/memories` & `/api/v1/letters`)
- `GET /memories`: Fetch couple's preserved memories.
- `POST /memories`: Create new memory record with title, story, tags, & media.
- `POST /letters`: Save a love letter with mood & stats.

### 💬 Say Something (`/api/v1/say-somethings`)
- `GET /:coupleId`: Fetch message timeline for connected couple.
- `POST /`: Send message to partner.

---

## 🔧 Environment Variables

Create a `.env` file in `backend/`:

```env
NODE_ENV=development
PORT=5000

# Auth Secrets
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_super_secret_refresh_key
JWT_REFRESH_EXPIRES_IN=30d

# Database Configuration (MySQL / Postgres)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=soulsync_db
DB_DIALECT=mysql
DB_SSL=false

# Alternatively, single connection URL:
# DATABASE_URL=mysql://user:pass@host:3306/soulsync_db

# CORS Origin Configuration
CORS_ORIGIN=http://localhost:3000

# Cloudinary Setup (Optional for Media Uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Run database migrations
npm run migrate

# Start in development mode (with nodemon)
npm run dev

# Start in production mode
npm start
```

---

## ☁️ Deployment on Render

1. Create a **Web Service** on Render.
2. Set **Root Directory** to `backend`.
3. Set **Build Command** to `npm install`.
4. Set **Start Command** to `npm start`.
5. Add required environment variables (`JWT_SECRET`, `DATABASE_URL` or `DB_*`, `CORS_ORIGIN`).
