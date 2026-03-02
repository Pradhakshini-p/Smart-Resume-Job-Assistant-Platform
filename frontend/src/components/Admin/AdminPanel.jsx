import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AdminPanel() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('token');
      const statsResponse = await axios.get('/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const usersResponse = await axios.get('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(statsResponse.data);
      setUsers(usersResponse.data);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  const chartData = [
    { name: 'Total Users', value: stats?.totalUsers || 0 },
    { name: 'Premium Users', value: stats?.premiumUsers || 0 },
    { name: 'Total Analyses', value: stats?.totalAnalyses || 0 }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Panel</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 rounded-lg p-6">
          <p className="text-sm text-gray-600">Total Users</p>
          <p className="text-3xl font-bold text-blue-600">{stats?.totalUsers || 0}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6">
          <p className="text-sm text-gray-600">Total Analyses</p>
          <p className="text-3xl font-bold text-green-600">{stats?.totalAnalyses || 0}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-6">
          <p className="text-sm text-gray-600">Premium Users</p>
          <p className="text-3xl font-bold text-purple-600">{stats?.premiumUsers || 0}</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-6">
          <p className="text-sm text-gray-600">Avg ATS Score</p>
          <p className="text-3xl font-bold text-orange-600">{Math.round(stats?.averageATS || 0)}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Statistics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Role</th>
                <th className="text-left py-3 px-4">Premium</th>
                <th className="text-left py-3 px-4">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={user.isPremium ? 'text-green-600 font-semibold' : 'text-gray-500'}>
                      {user.isPremium ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="py-3 px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
