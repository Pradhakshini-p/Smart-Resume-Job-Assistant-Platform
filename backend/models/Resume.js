const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fileName: String,
    fileUrl: String,
    resumeText: { type: String, required: true },
    jobDescription: String,
    atsScore: { type: Number, min: 0, max: 100 },
    skillMatch: { type: Number, min: 0, max: 100 },
    missingKeywords: [String],
    matchedKeywords: [String],
    suggestionsFromAI: [String],
    grammarIssues: [String],
    experienceRelevanceScore: { type: Number, min: 0, max: 100 },
    improvementTips: [String],
    analyzedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ResumeAnalysis', resumeSchema);
