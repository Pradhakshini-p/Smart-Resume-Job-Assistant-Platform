const express = require('express');
const multer = require('multer');
const path = require('path');
const { analyzeResume, getHistory, deleteAnalysis, getAnalysisById } = require('../controllers/resumeController');
const auth = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${req.userId}-${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and DOCX allowed.'));
    }
  }
});

router.post('/analyze', auth, upload.single('resume'), analyzeResume);
router.get('/history', auth, getHistory);
router.delete('/:id', auth, deleteAnalysis);
router.get('/:id', auth, getAnalysisById);

module.exports = router;
