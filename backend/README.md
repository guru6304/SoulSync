# Soul Sync Backend Setup

Production-ready Express backend foundation for Soul Sync. Database integration is intentionally deferred.

## Setup

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

The API starts on `http://localhost:5000` by default. Check `GET /health` to confirm it is running.

## Notes

- Sequelize is configured only as a factory and does not connect or authenticate during startup.
- Database models, migrations, seeders, and business logic are intentionally not included yet.
