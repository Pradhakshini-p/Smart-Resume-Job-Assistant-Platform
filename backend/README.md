# ResumeAI Pro - Backend

Production-grade AI-powered resume analyzer backend built with Node.js, Express, and MongoDB.

## 🚀 Features

- ✅ JWT-based authentication (signup/login)
- ✅ Resume upload & text extraction (PDF/DOCX)
- ✅ AI-powered analysis (OpenAI GPT-3.5)
- ✅ ATS score calculation
- ✅ Skill matching & gap analysis
- ✅ Grammar & improvement suggestions
- ✅ Resume history & management
- ✅ Admin analytics dashboard
- ✅ Secure route protection

## 📋 Prerequisites

- Node.js v16+
- MongoDB (local or Atlas)
- OpenAI API key
- npm or yarn

## 🔧 Installation

### 1. Clone & Setup

```bash
cd backend
npm install
```

### 2. Environment Configuration

```bash
cp .env.example .env
```

Update `.env` with your values:

```
MONGODB_URI=mongodb://localhost:27017/resumeai-pro
JWT_SECRET=your_super_secret_key_change_this
OPENAI_API_KEY=sk-xxxxxx
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### 3. MongoDB Setup

**Local MongoDB:**
```bash
mongod
```

**Or use MongoDB Atlas:**
- Create cluster at https://www.mongodb.com/cloud/atlas
- Get connection string
- Update `MONGODB_URI` in `.env`

### 4. Start Server

```bash
npm run dev
```

Server runs at `http://localhost:5000`

## 📚 API Documentation

### Authentication

**POST /api/auth/signup**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123"
}
```

**POST /api/auth/login**
```json
{
  "email": "john@example.com",
  "password": "secure123"
}
```

### Resume Analysis

**POST /api/resume/analyze** (Protected)
- Form-data: `resume` (file), `jobDescription` (text)
- Returns: ATS score, skill match, suggestions

### Job Recommendations

**POST /api/jobs/recommend** (Protected)
- Body (JSON): optional `resumeText` if using AI-based suggestions
- Query params: `useAI=true` to force AI generation
- Returns: list of job objects `{ title, company, description, url? }`

#### Seeding Example Jobs
The feature will only return results if there are job documents in the database. A simple seeder is provided (`seedJobs.js`) to populate three sample positions:

```bash
cd backend
node seedJobs.js
```

After running this script you should see "Inserted 3 jobs" and the `/api/jobs/recommend` endpoint will return data for users whose skills match (or when you send `resumeText`).


**GET /api/resume/history** (Protected)
- Returns: User's analysis history

**GET /api/resume/:id** (Protected)
- Returns: Specific analysis details

**DELETE /api/resume/:id** (Protected)
- Deletes analysis

### Admin

**GET /api/admin/stats** (Admin only)
- Returns: Platform statistics

**GET /api/admin/users** (Admin only)
- Returns: List of users

## 🗂️ Project Structure

```
backend/
├── config/          # Database & config files
├── controllers/     # Business logic
├── models/         # MongoDB schemas
├── routes/         # API routes
├── middleware/     # Auth & error handlers
├── utils/          # Helper functions
├── uploads/        # Uploaded files
├── server.js       # Entry point
└── package.json
```

## 🧪 Testing

```bash
npm test
```

##  📦 Production Build

```bash
npm start
```

## 🔐 Security

- Passwords hashed with bcryptjs
- JWT tokens for authentication
- CORS enabled for frontend
- Helmet for HTTP headers
- Input validation with express-validator

## 📞 Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check `MONGODB_URI` is correct

**OpenAI API Error:**
- Verify `OPENAI_API_KEY` is valid
- Check account has credits

**File Upload Error:**
- Ensure `uploads/` folder exists
- Check file size (max 10MB)

## 📄 License

MIT
