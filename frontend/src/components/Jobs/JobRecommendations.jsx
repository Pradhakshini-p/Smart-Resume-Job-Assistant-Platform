import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function JobRecommendations() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRecs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/jobs/recommendations`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJobs(res.data.jobs || []);
    } catch (e) {
      console.error('Failed to fetch recommendations', e);
      setError('Unable to load job recommendations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecs();
  }, []);

  if (loading) return <p className="p-6">Loading recommendations…</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Job Recommendations</h2>
      {jobs.length === 0 ? (
        <p>No matches found. Update your skills or resume text.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((j, idx) => (
            <li key={idx} className="p-4 border rounded">
              <h3 className="font-semibold">
                {j.title} {j.company && <>– {j.company}</>}
              </h3>
              <p>{j.description}</p>
              {j.url && (
                <a
                  href={j.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  Apply
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
