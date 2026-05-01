# Event Registration App

Event registration system where admins can create events and users can register for them.

## Prerequisites

- Docker

## Quick Start (Docker)

```bash
docker compose up --build
```

The app runs at `http://localhost:5173`

## Local Development

### Prerequisites

- .NET 10 SDK
- Node.js 18+
- Docker (for PostgreSQL)

### 1. Start the database

```bash
docker compose up postgres -d
```

### 2. Run the backend

```bash
cd Backend/Api
dotnet run
```

The API runs at `http://localhost:5171`

### 3. Run the frontend

```bash
cd Frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`

## Admin credentials

- Email: `admin@admin.com`
- Password: `admin123`

These can be changed in `Backend/Api/appsettings.json` under the `Admin` section.

## Features

- Admin login with email and password
- Admin can create events (name, date/time, max participants)
- Users can view all events
- Users can register for events with first name, last name, and personal code
- Registration is blocked when an event is full