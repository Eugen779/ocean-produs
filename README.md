# Ocean Produs 🌊

Magazin online minimalist pentru vânzarea de produse.

## Caracterstici

- ✅ Catalog de produse
- ✅ Coș de cumpărături
- ✅ Sistem de comenzi
- ✅ Panou admin
- ✅ Autentificare utilizatori
- ✅ Plăți cash la livrare
- ✅ Design minimalist și comod

## Tech Stack

- **Frontend**: Next.js + React + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: JWT

## Setup

### 1. Instalare dependențe

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configurare .env

Backend (.env):
```
DATABASE_URL="postgresql://user:password@localhost:5432/ocean_produs"
JWT_SECRET="your-secret-key"
PORT=5000
```

Frontend (.env.local):
```
NEXT_PUBLIC_API_URL="http://localhost:5000"
```

### 3. Setup bază de date

```bash
cd backend
npx prisma migrate dev --name init
```

### 4. Pornire

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Frontend: http://localhost:3000
Backend: http://localhost:5000

## Structura Proiectului

```
ocean-produs/
├── backend/           # API Node.js + Express
├── frontend/          # Next.js app
└── README.md
```

## Admin Panel

- Email: admin@oceanprodus.ro
- Password: admin123

Accesibil la: http://localhost:3000/admin
