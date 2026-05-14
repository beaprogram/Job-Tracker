# Job Tracker

A full-stack MERN application for tracking job applications throughout the search process. Built with React, Node.js, Express, and MongoDB, it features a Bento Grid dashboard, JWT authentication, and a complete CRUD workflow over applications with rich filtering, sorting, and statistics.

**Live demo:** https://job-tracker-arup.vercel.app

## Overview

Job Tracker helps job seekers stay organized during an active search. Users can sign up, log application details (company, position, status, type, location, dates, notes), and review aggregate progress through a visual dashboard. The interface is built around a modern Bento Grid layout with gradient stat cards that surface application counts by status at a glance.

## Key Features

- Secure email and password authentication with hashed credentials (bcryptjs) and JWT-based session tokens
- Full CRUD for job applications with per-user data isolation
- Status workflow tracking across Applied, Interview, Offer, and Rejected stages
- Job type classification (Full-Time, Part-Time, Internship, Contract, Remote)
- Bento Grid dashboard with gradient stat cards summarizing applications by status
- Aggregated statistics endpoint that powers the dashboard visualizations
- Application deadline tracking and notes field for follow-ups
- Centralized error handling middleware for consistent API responses
- Responsive UI styled with Tailwind CSS
- Client-side routing with React Router 7

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, React Router 7, Axios, Tailwind CSS 3 |
| Backend | Node.js, Express 4 |
| Database | MongoDB with Mongoose 9 |
| Authentication | JSON Web Tokens (jsonwebtoken), bcryptjs |
| Tooling | react-scripts (CRA), dotenv, CORS |
| Testing | React Testing Library, Jest DOM |
| Deployment | Vercel (frontend), Node host (backend) |

## Project Structure

```
Job-Tracker/
├── client/                 # React frontend (Create React App + Tailwind)
│   ├── public/
│   └── src/                # Components, pages, routes, API client
├── config/
│   └── db.js               # MongoDB connection setup
├── controllers/
│   ├── authController.js   # Register and login handlers
│   └── jobController.js    # CRUD + statistics handlers
├── middleware/
│   ├── auth.js             # JWT verification middleware
│   └── errorHandler.js     # Centralized error responses
├── models/
│   ├── User.js             # User schema
│   └── Job.js              # Job application schema
├── routes/
│   ├── auth.js             # /api/auth/register, /api/auth/login
│   └── jobs.js             # /api/jobs CRUD + /api/jobs/stats
├── server.js               # Express app bootstrap
└── package.json
```

## API Reference

All `/api/jobs` routes require a valid `Authorization: Bearer <token>` header.

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Create a new account and receive a JWT |
| POST | `/api/auth/login` | Authenticate and receive a JWT |

### Jobs

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/jobs` | List all applications for the current user |
| POST | `/api/jobs` | Create a new application |
| GET | `/api/jobs/:id` | Retrieve a single application |
| PATCH | `/api/jobs/:id` | Update an application |
| DELETE | `/api/jobs/:id` | Delete an application |
| GET | `/api/jobs/stats` | Aggregated counts grouped by status |

### Job Schema

| Field | Type | Notes |
| --- | --- | --- |
| company | String | Required |
| position | String | Required |
| status | Enum | Applied, Interview, Offer, Rejected (default: Applied) |
| jobType | Enum | Full-Time, Part-Time, Internship, Contract, Remote |
| location | String | Defaults to "Not Specified" |
| dateApplied | Date | Defaults to now |
| deadline | Date | Optional |
| notes | String | Optional |

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm
- A MongoDB connection string (local `mongod` or MongoDB Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/beaprogram/Job-Tracker.git
cd Job-Tracker
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
```

### 4. Start the backend

```bash
node server.js
```

The API will be available at `http://localhost:3000`.

### 5. Install and start the frontend

```bash
cd client
npm install
npm start
```

The React app runs at `http://localhost:3001` (or the next available port) and proxies requests to the backend.

## Deployment

The frontend is deployed on Vercel at [job-tracker-arup.vercel.app](https://job-tracker-arup.vercel.app). The backend is designed to run on any Node-compatible host (Render, Railway, Fly.io, or a standalone server) with the same `.env` configuration shown above.

## Highlights

This project demonstrates end-to-end full-stack engineering with a clear separation of concerns between client, controllers, routes, and data models, JWT-based authentication, per-user data isolation, aggregation pipelines via MongoDB, and a modern responsive UI.

## Author

Developed by **Arup Halder** — full-stack and mobile developer based in Halifax, Canada.

- GitHub: [@beaprogram](https://github.com/beaprogram)
- LinkedIn: [arup-halder](https://www.linkedin.com/in/arup-halder)
