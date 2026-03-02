const User = require('../models/User');
const ResumeAnalysis = require('../models/Resume');

exports.getStats = async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const totalUsers = await User.countDocuments();
    const totalAnalyses = await ResumeAnalysis.countDocuments();
    const averageATS = await ResumeAnalysis.aggregate([
      { $group: { _id: null, avgATS: { $avg: '$atsScore' } } }
    ]);

    res.json({
      totalUsers,
      totalAnalyses,
      averageATS: averageATS[0]?.avgATS || 0,
      premiumUsers: await User.countDocuments({ isPremium: true })
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const users = await User.find().select('-password').limit(50);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
