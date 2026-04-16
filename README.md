ResumeAI Pro

ResumeAI Pro is an AI-powered SaaS platform that analyzes resumes, predicts ATS scores, and recommends personalized job opportunities using natural language processing and machine learning.

Overview

ResumeAI Pro helps job seekers improve their resumes and find better job opportunities. It provides real-time ATS scoring, identifies missing skills, and gives actionable suggestions to enhance resume quality. The platform also recommends jobs based on the user’s skill set and career profile.

Problem Statement

Many resumes are rejected by Applicant Tracking Systems before reaching recruiters. Job seekers often lack clear guidance on improving their resumes and spend a lot of time searching for relevant jobs.

Solution

This platform solves these problems by:

Providing AI-based resume analysis and scoring
Identifying missing keywords and skills
Recommending jobs based on user profile
Reducing job search time with smart suggestions
Key Features
Resume Analysis
Supports PDF and DOCX files
Extracts and analyzes resume content
Generates ATS score (0–100)
Detects grammar and formatting issues
AI Recommendations
Provides personalized suggestions
Identifies missing keywords
Improves resume quality
Job Recommendation System
Matches jobs based on skills
Uses machine learning for better recommendations
Tracks user application history
User Management
Secure authentication using JWT
Role-based access (user and admin)
Password encryption
Admin Dashboard
View user statistics
Monitor resume analysis data
Manage job postings
Tech Stack
Backend
Node.js
Express.js
MongoDB
JWT Authentication
OpenAI API
Frontend
React
Tailwind CSS
Axios
Recharts
Project Architecture

The application follows a full-stack architecture:

React frontend for user interface
Express backend for API handling
MongoDB database for storing data
AI integration for analysis and recommendations
Getting Started
Prerequisites
Node.js
MongoDB
OpenAI API key
Installation

Clone the repository:
git clone https://github.com/Pradhakshini-p/Smart-Resume-Job-Assistant.git

Backend setup:
cd backend
npm install
npm run dev

Frontend setup:
cd frontend
npm install
npm start

API Overview

Authentication APIs:

Register user
Login user
Get user profile

Resume APIs:

Upload and analyze resume
Get analysis history

Job APIs:

Get job recommendations

Admin APIs:

View platform statistics
Database Design

The system uses three main collections:

Users
Resumes
Jobs

Each collection stores relevant details such as user data, resume analysis results, and job listings.

Advanced Features
Intelligent resume scoring
NLP-based keyword extraction
Grammar and content analysis
Skill-based job matching using similarity algorithms
Performance
Fast resume analysis
High ATS scoring accuracy
Efficient API response time
Future Enhancements
Video resume analysis
LinkedIn integration
Real-time job alerts
Mobile application
AI interview preparation
Author

Pradhakshini P
Email: pradhakshini@example.com

GitHub: https://github.com/Pradhakshini-p
