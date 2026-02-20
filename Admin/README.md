# manas360 Session Analytics

## 📖 Story 3.6: Session Analytics

**As an** Admin  
**I want** session analytics  
**So that** we can measure therapy effectiveness

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- npm or yarn

### 1. Setup Database

```bash
# Create database
createdb manas360

# Run migrations
cd backend
psql -d manas360 -f migrations/001_create_analytics_tables.sql
```

### 2. Start Backend

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start server
npm run dev
```

Server runs at: `http://localhost:3001`

### 3. Start Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Dashboard runs at: `http://localhost:3000`

---

## 🐳 Docker Setup

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics/overview` | Dashboard summary metrics |
| GET | `/api/analytics/sessions` | Sessions by type/mode |
| GET | `/api/analytics/outcomes` | Patient outcome analytics |
| GET | `/api/analytics/therapists` | Therapist performance |
| GET | `/api/analytics/trends` | Time-based trends |
| GET | `/api/analytics/dropoff` | Patient drop-off analysis |
| GET | `/api/analytics/export/excel` | Export to Excel |
| GET | `/api/analytics/export/pdf` | Export to PDF |

### Query Parameters

All endpoints support:
- `startDate`: YYYY-MM-DD (default: 30 days ago)
- `endDate`: YYYY-MM-DD (default: today)

### Authentication

All endpoints require admin authentication:
```
Authorization: Bearer <JWT_TOKEN>
```

Get test token (dev only):
```bash
curl http://localhost:3001/api/test-token
```

---

## 📁 Project Structure

```
manas360-session-analytics/
├── STORY_3.6_TRACEABILITY.md    # Story traceability
├── docker-compose.yml           # Docker setup
├── backend/
│   ├── package.json
│   ├── .env.example
│   ├── src/
│   │   ├── app.js               # Express server
│   │   ├── config/
│   │   │   └── database.js      # PostgreSQL config
│   │   ├── models/
│   │   │   └── index.js         # Sequelize models
│   │   ├── controllers/
│   │   │   └── analyticsController.js
│   │   ├── services/
│   │   │   └── analyticsService.js
│   │   ├── routes/
│   │   │   └── analyticsRoutes.js
│   │   └── middleware/
│   │       └── adminAuth.js
│   └── migrations/
│       └── 001_create_analytics_tables.sql
├── frontend/
│   ├── package.json
│   └── src/
│       ├── App.tsx
│       ├── index.css
│       ├── pages/
│       │   └── AnalyticsDashboard.tsx
│       ├── components/
│       │   ├── MetricCard.tsx
│       │   ├── SessionTrendsChart.tsx
│       │   ├── OutcomeChart.tsx
│       │   ├── TherapistPerformance.tsx
│       │   └── ExportButtons.tsx
│       ├── services/
│       │   └── analyticsApi.ts
│       └── hooks/
│           └── useAnalytics.ts
└── README.md
```

---

## 📈 Features

### Dashboard Metrics
- Total sessions & completion rates
- PHQ-9 and GAD-7 score improvements
- Therapist performance rankings
- Session trends over time
- Drop-off analysis

### Visualizations
- Line charts for trends
- Bar charts for comparisons
- Pie charts for distributions
- Performance tables

### Export Options
- Excel (.xlsx) with multiple sheets
- PDF summary report

### Filters
- Date range picker
- Quick presets (7, 30, 90 days)

---

## 🧪 Test Cases

| ID | Test | Expected | Status |
|----|------|----------|--------|
| TC3.6.1 | Load dashboard | All metrics display | ✅ |
| TC3.6.2 | Session completion rate | % calculated correctly | ✅ |
| TC3.6.3 | Outcome improvement | PHQ-9 change shown | ✅ |
| TC3.6.4 | Therapist ranking | Sorted by performance | ✅ |
| TC3.6.5 | Date filter | Data filtered correctly | ✅ |
| TC3.6.6 | Export Excel | .xlsx downloaded | ✅ |
| TC3.6.7 | Export PDF | .pdf downloaded | ✅ |
| TC3.6.8 | Trend analysis | Charts render | ✅ |
| TC3.6.9 | Non-admin access | 403 Forbidden | ✅ |
| TC3.6.10 | Large dataset | <500ms response | ✅ |

---

## 📚 Tech Stack

### Backend
- Node.js + Express
- PostgreSQL + Sequelize
- JWT Authentication
- ExcelJS + PDFKit

### Frontend
- React + TypeScript
- Recharts for visualizations
- Tailwind CSS
- Axios

---

## 📄 License

manas360 Proprietary - All Rights Reserved

---

## 👥 Team

- **Story ID**: 3.6
- **Sprint**: 3
- **Points**: 8
- **Priority**: HIGH
