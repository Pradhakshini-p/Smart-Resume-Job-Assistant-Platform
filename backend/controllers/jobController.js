// backend/controllers/jobController.js
const { recommendJobs, aiRecommendJobs } = require('../utils/jobUtils');

exports.getRecommendations = async (req, res) => {
  try {
    const useAI = req.query.useAI === 'true';
    let jobs = [];

    if (useAI && req.body.resumeText) {
      jobs = await aiRecommendJobs(req.body.resumeText);
    } else {
      // attempt to pull skills from user profile or last analysis
      const skills = req.user && req.user.skills ? req.user.skills : [];
      jobs = await recommendJobs(skills);
    }

    res.json({ jobs });
  } catch (error) {
    console.error('jobController.getRecommendations error', error);
    res.status(500).json({ error: error.message });
  }
};