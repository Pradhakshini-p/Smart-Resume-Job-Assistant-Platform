import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Eye } from 'lucide-react';
import { toast } from 'react-toastify';

export default function History() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/resume/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnalyses(response.data);
    } catch (error) {
      toast.error('Failed to fetch history');
    } finally {
      setLoading(false);
    }
  };

  const deleteAnalysis = async (id) => {
    if (!window.confirm('Delete this analysis?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/resume/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnalyses(analyses.filter(a => a._id !== id));
      toast.success('Analysis deleted');
    } catch (error) {
      toast.error('Failed to delete analysis');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Analysis History</h1>

      {loading && <p className="text-center text-gray-600">Loading...</p>}

      {!loading && analyses.length === 0 && (
        <p className="text-center text-gray-600">No analyses yet. Start by uploading a resume!</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {analyses.map((analysis) => (
          <div key={analysis._id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{analysis.fileName}</h3>
                <p className="text-sm text-gray-500">{new Date(analysis.createdAt).toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => deleteAnalysis(analysis._id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">ATS Score</p>
                  <div className="text-2xl font-bold text-indigo-600">{analysis.atsScore}</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Skill Match</p>
                  <div className="text-2xl font-bold text-green-600">{analysis.skillMatch}%</div>
                </div>
              </div>

              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2">
                <Eye size={18} />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
