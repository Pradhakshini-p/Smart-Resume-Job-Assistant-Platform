# ResumeAI Pro - Frontend

Modern React frontend for AI-powered resume analyzer with Tailwind CSS and Material UI.

## 🚀 Features

- ✅ Modern responsive UI with Tailwind CSS
- ✅ JWT authentication (signup/login)
- ✅ Resume upload & analysis
- ✅ Real-time ATS scoring
- ✅ Analytics dashboard with charts
- ✅ Analysis history management
- ✅ Admin panel for statistics
- ✅ Job recommendations list
- ✅ Dark mode support (optional)
- ✅ Mobile-first design

## 📋 Prerequisites

- Node.js v16+
- npm or yarn
- Backend server running (see backend README)

## 🔧 Installation

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Environment Configuration

```bash
cp .env.example .env
```

Update `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start Development Server

```bash
npm start
```

Frontend runs at `http://localhost:3000`

## 🎯 Key Pages

- **Home** (`/`) - Landing page
- **Signup** (`/signup`) - User registration
- **Login** (`/login`) - User authentication
- **Analyzer** (`/analyzer`) - Resume upload & analysis
- **Dashboard** (`/dashboard`) - Analytics & insights
- **Jobs** (`/jobs`) - Recommended positions (you can paste resume text and toggle AI for generated suggestions)
- **History** (`/history`) - Past analyses
- **Admin** (`/admin`) - Admin statistics

## 🗂️ Project Structure

```
frontend/src/
├── components/
│   ├── Auth/          (Login, Signup)
│   ├── Resume/        (Analyzer, History)
│   ├── Dashboard/     (Dashboard, Charts)
│   ├── Admin/         (AdminPanel)
│   └── Common/        (Navbar, Footer)
├── context/           (Auth, Theme)
├── pages/            (HomePage)
├── App.jsx           (Main router)
└── index.js
```

## 📦 Scripts

```bash
npm start              # Development server
npm run build         # Production build
npm test              # Run tests
npm run eject         # Eject from CRA (⚠️ irreversible)
```

## 🎨 UI Components Used

- **Tailwind CSS** - Utility-first styling
- **Material UI** - Chart components
- **Recharts** - Data visualization
- **Lucide Icons** - Modern icons
- **React Toastify** - Toast notifications

## 🔐 Authentication Flow

1. User signs up → Token stored in localStorage
2. Token sent in Authorization header for protected routes
3. AuthContext manages user state globally
4. Protected routes check token before access

## 🚀 Building for Production

```bash
npm run build
```

Creates optimized build in `build/` folder ready for deployment.

Deploy to Vercel, Netlify, or AWS S3:

```bash
# Vercel
vercel deploy

# Netlify
netlify deploy --prod --dir=build
```

## 🧪 Testing

```bash
npm test -- --coverage
```

## 📞 Troubleshooting

**API Connection Error:**
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in `.env`

**Token Expired:**
- Clear localStorage and login again
- Token expires after 7 days

**Build Errors:**
- Delete `node_modules` and reinstall
- Clear npm cache: `npm cache clean --force`

## 📖 Learn More

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com/)

## 📄 License

MIT
