# Redvion Dashboard - React Application

A modern dashboard application built with React, Tailwind CSS, and Vite.

## Features

- 🔐 Authentication (Login/Signup)
- 📊 Dashboard with analytics
- 📄 Reports with image export
- 📝 Form builder with export to Excel/Google Sheets
- 👥 Team management
- ✅ Checklist management
- 🔔 Notification system for report submissions
- 📱 Fully responsive design

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Sidebar.jsx
│   │   └── DashboardLayout.jsx
│   ├── Charts/
│   │   └── ActivityChart.jsx
│   └── ProtectedRoute.jsx
├── contexts/
│   └── AuthContext.jsx
├── pages/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── Dashboard.jsx
│   ├── Reports.jsx
│   ├── Form.jsx
│   ├── Team.jsx
│   └── Checklist.jsx
├── utils/
│   ├── exportUtils.js
│   └── notificationService.js
├── App.jsx
├── main.jsx
└── index.css
```

## Routes

- `/` - Redirects to dashboard
- `/login` - Login page
- `/signup` - Signup page
- `/dashboard` - Main dashboard
- `/reports` - Reports page with analytics
- `/form` - Form builder with export options
- `/team` - Team management
- `/checklist` - Checklist management

## Technologies

- React 18
- React Router DOM
- Tailwind CSS
- Vite
- XLSX (for Excel export)
- html2canvas (for image export)

## Features Details

### Export Functionality
- Export forms to Excel (.xlsx)
- Export forms to Google Sheets (CSV format)
- Export reports as images (PNG)

### Notifications
- Automatic notifications sent to admin and general manager when reports are submitted
- Notifications stored in localStorage (can be connected to API)

## License

MIT

