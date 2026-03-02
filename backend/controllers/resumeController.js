const ResumeAnalysis = require('../models/Resume');
const User = require('../models/User');
const pdfParser = require('../utils/pdfParser');
const openaiUtils = require('../utils/openaiUtils');

exports.analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { jobDescription } = req.body;
    let resumeText;

    // Parse file (PDF or DOCX)
    if (req.file.mimetype === 'application/pdf') {
      resumeText = await pdfParser.extractTextFromPDF(req.file.path);
    } else if (req.file.mimetype.includes('word')) {
      resumeText = await pdfParser.extractTextFromDOCX(req.file.path);
    } else {
      return res.status(400).json({ error: 'Unsupported file format' });
    }

    if (!resumeText) {
      return res.status(400).json({ error: 'Could not extract text from file' });
    }

    // Generate AI analysis
    const analysis = await openaiUtils.analyzeResumeAndJD(resumeText, jobDescription);

    // Save to database
    const resumeAnalysis = new ResumeAnalysis({
      userId: req.userId,
      fileName: req.file.originalname,
      resumeText,
      jobDescription,
      atsScore: analysis.atsScore,
      skillMatch: analysis.skillMatch,
      missingKeywords: analysis.missingKeywords,
      matchedKeywords: analysis.matchedKeywords,
      suggestionsFromAI: analysis.suggestions,
      grammarIssues: analysis.grammarIssues,
      experienceRelevanceScore: analysis.experienceScore,
      improvementTips: analysis.improvementTips
    });

    await resumeAnalysis.save();

    // Update user analysis count
    await User.findByIdAndUpdate(req.userId, { $inc: { resumeAnalysisCount: 1 } });

    // Add matched keywords to user's skills list
    if (analysis.matchedKeywords && analysis.matchedKeywords.length) {
      await User.findByIdAndUpdate(req.userId, {
        $addToSet: { skills: { $each: analysis.matchedKeywords } }
      });
    }

    res.json({
      success: true,
      analysis: resumeAnalysis
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const analyses = await ResumeAnalysis.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(analyses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAnalysis = async (req, res) => {
  try {
    const analysis = await ResumeAnalysis.findById(req.params.id);
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    if (analysis.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await ResumeAnalysis.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Analysis deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAnalysisById = async (req, res) => {
  try {
    const analysis = await ResumeAnalysis.findById(req.params.id);
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    if (analysis.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
