const Job = require('../models/Job');
const { generateJobRecommendationPrompt } = require('./openaiUtils');

exports.recommendJobs = async (userSkills = []) => {
  try {
    if (!userSkills || userSkills.length === 0) {
      // Return random jobs if no skills
      return await Job.find().limit(10);
    }

    // Find jobs that match user skills
    const jobs = await Job.find({
      requiredSkills: { $in: userSkills }
    }).limit(20);

    return jobs;
  } catch (error) {
    console.error('Job recommendation error:', error);
    return [];
  }
};

exports.aiRecommendJobs = async (resumeText) => {
  try {
    const careerSuggestions = await generateJobRecommendationPrompt(resumeText);
    
    // Extract skills from suggestions
    const skills = careerSuggestions.requiredSkills || [];
    
    // Find matching jobs
    const jobs = await Job.find({
      requiredSkills: { $in: skills }
    }).limit(20);

    return jobs.length > 0 ? jobs : await Job.find().limit(10);
  } catch (error) {
    console.error('AI job recommendation error:', error);
    return await Job.find().limit(10);
  }
};

exports.extractSkillsFromResume = (resumeText) => {
  // Simple skill extraction - can be enhanced with AI
  const commonSkills = [
    'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'Express',
    'MongoDB', 'SQL', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
    'HTML', 'CSS', 'Vue', 'Angular', 'TypeScript', 'Git', 'Linux'
  ];

  const foundSkills = commonSkills.filter(skill =>
    resumeText.toLowerCase().includes(skill.toLowerCase())
  );

  return [...new Set(foundSkills)];
};
