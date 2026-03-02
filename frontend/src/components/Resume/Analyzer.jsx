import React, { useState } from 'react';
import axios from 'axios';
import { Upload, FileText, Zap } from 'lucide-react';
import { toast } from 'react-toastify';

export default function Analyzer() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && (selectedFile.type === 'application/pdf' || selectedFile.type.includes('word'))) {
      setFile(selectedFile);
    } else {
      toast.error('Please upload a PDF or DOCX file');
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!file || !jobDesc) {
      toast.error('Please upload resume and enter job description');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDesc);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/resume/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      setResult(response.data.analysis);
      toast.success('Resume analyzed successfully!');
    } catch (error) {
      toast.error('Analysis failed: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Resume Analyzer</h1>
        <p className="text-gray-600">Upload your resume and job description to get instant AI-powered analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleAnalyze} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Resume</label>
              <label className="border-2 border-dashed border-indigo-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 transition">
                <Upload size={32} className="mx-auto mb-2 text-indigo-500" />
                <p className="font-semibold text-gray-700">{file ? file.name : 'Click to upload'}</p>
                <p className="text-sm text-gray-500">PDF or DOCX files</p>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.docx"
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Job Description</label>
              <textarea
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Paste the job description here..."
                rows="6"
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              <Zap size={20} />
              {loading ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          </form>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* ATS Score */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
              <h2 className="text-lg font-semibold mb-2">ATS Score</h2>
              <div className="text-5xl font-bold mb-2">{result.atsScore}/100</div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all"
                  style={{ width: `${result.atsScore}%` }}
                ></div>
              </div>
            </div>

            {/* Skill Match */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Skill Match</h2>
              <div className="text-3xl font-bold text-green-600 mb-2">{result.skillMatch}%</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-700">Matched:</span>
                  <div className="flex flex-wrap gap-1">
                    {result.matchedKeywords?.slice(0, 5).map((keyword, i) => (
                      <span key={i} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Missing Keywords */}
            {result.missingKeywords?.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Missing Keywords</h2>
                <div className="flex flex-wrap gap-2">
                  {result.missingKeywords.slice(0, 8).map((keyword, i) => (
                    <span key={i} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {result.suggestionsFromAI?.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">AI Suggestions</h2>
                <ul className="space-y-2">
                  {result.suggestionsFromAI.map((suggestion, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold mt-1">•</span>
                      <span className="text-gray-700">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
