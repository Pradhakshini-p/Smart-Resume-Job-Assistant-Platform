// backend/seedJobs.js
// Run this script once to populate the database with example job postings.
// Usage: `node seedJobs.js` from the backend directory (ensure .env is configured).

require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('./models/Job');
const connectDB = require('./config/database');

(async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    const sampleJobs = [
      {
        title: 'Frontend React Developer',
        company: 'Acme Corp',
        location: 'Remote',
        description: 'Build beautiful React applications using Tailwind and Redux.',
        skills: ['React', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS'],
        url: 'https://acme.example.com/jobs/frontend'
      },
      {
        title: 'Node.js Backend Engineer',
        company: 'BetaSoft',
        location: 'New York, NY',
        description: 'Develop REST APIs with Express and MongoDB.',
        skills: ['Node.js', 'Express', 'MongoDB', 'JavaScript'],
        url: 'https://betasoft.example.com/careers/backend'
      },
      {
        title: 'Fullstack Developer',
        company: 'Gamma Technologies',
        location: 'San Francisco, CA',
        description: 'Work across the stack with React, Node, and AWS.',
        skills: ['React', 'Node.js', 'AWS', 'GraphQL'],
        url: 'https://gamma.tech/jobs/fullstack'
      }
    ];

    await Job.deleteMany({}); // clear existing
    const inserted = await Job.insertMany(sampleJobs);
    console.log(`Inserted ${inserted.length} jobs`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding error', err);
    process.exit(1);
  }
})();
