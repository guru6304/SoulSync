# Soul Sync — Frontend React Application 🎨

The frontend of Soul Sync is built with **React 18**, **Redux Toolkit**, and modern CSS glassmorphism styling to deliver a romantic, intimate experience for couples.

---

## 📁 Architecture Overview

```
frontend/
├── public/                 # Static assets & SPA client-side routing (_redirects)
├── src/
│   ├── components/         # Common UI components & navigation
│   │   ├── common/         # Buttons, inputs, loaders, bottom floating nav (SSBottomNav)
│   │   ├── letters/        # LetterEditor & LetterCard components
│   │   ├── memories/       # MemoryForm & MemoryCard components
│   │   ├── moods/          # UnifiedMoodHome atmospheric mood viewer
│   │   └── saySomething/   # MessageCard component
│   ├── features/           # Feature modules
│   │   └── questions/      # SoulCard question hero & QuestionAnswer interaction area
│   ├── hooks/              # Custom React hooks (useQuestions, useMemories, useLetters, etc.)
│   ├── pages/              # Route views
│   │   ├── auth/           # Login & Registration pages
│   │   ├── letters/        # Write & View Love Letters pages
│   │   ├── memories/       # Create & View Memories pages
│   │   ├── moods/          # Mood selection, My Answers, Partner Answers pages
│   │   ├── questions/      # Atmospheric SoulCard Daily Question page
│   │   ├── saySomething/   # Connect & Say Something pages
│   │   └── timeline/       # Couple relationship timeline page
│   ├── routes/             # AppRoutes, ProtectedRoute, & PublicRoute
│   ├── services/           # Axios apiClient with JWT refresh interceptors
│   ├── store/              # Redux Toolkit slices (auth, questions, memories, letters, moods)
│   └── theme/              # Mood themes (romantic, happy, sad, angry, funny, missing_you, sleepy, celebration, need_hug)
├── package.json
└── README.md
```

---

## 🎨 Mood & Atmospheric Theme Engine

The frontend dynamically adjusts background gradients, button accents, and floating particle decorations across 9 supported moods:

1. **Romantic ❤️** Pink / Rose (`#EC4899`)
2. **Happy 😊** Gold / Yellow (`#F59E0B`)
3. **Sad 😢** Soft Blue / Indigo (`#3B82F6`)
4. **Angry 😡** Warm Red / Orange (`#EF4444`)
5. **Funny 😂** Violet / Purple (`#8B5CF6`)
6. **Missing You 💜** Deep Purple (`#8B5CF6`)
7. **Sleepy 🌙** Midnight Indigo (`#6366F1`)
8. **Celebration 🎉** Pink / Gold (`#EC4899` / `#F59E0B`)
9. **Need a Hug 🫂** Warm Peach / Pink (`#F48FB1`)

---

## ⚙️ Environment Variables

Create a `.env` file in `frontend/`:

```env
REACT_APP_API_BASE_URL=http://localhost:5000/api/v1
```

For production deployment (e.g. Render), set `REACT_APP_API_BASE_URL` to your backend URL (e.g., `https://soulsync-api.onrender.com/api/v1`).

---

## 🚀 Commands & Development

```bash
# Install dependencies
npm install

# Start local dev server (http://localhost:3000)
npm start

# Build production bundle
npm run build
```

---

## ☁️ Deployment on Render

1. Create a **Static Site** on Render.
2. Set **Root Directory** to `frontend`.
3. Set **Build Command** to `npm install && npm run build`.
4. Set **Publish Directory** to `build`.
5. Set `REACT_APP_API_BASE_URL` in **Environment Variables**.
6. SPA routing is automatically handled via `public/_redirects`.
