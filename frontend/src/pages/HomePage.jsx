import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, BarChart3, Lock, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            AI-Powered Resume Analyzer
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Get instant feedback on your resume with AI-powered ATS scoring and optimization
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg transition">
              Get Started
            </Link>
            <Link to="/login" className="bg-white hover:bg-gray-50 text-indigo-600 font-semibold px-8 py-3 rounded-lg border-2 border-indigo-600 transition">
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Why Choose ResumeAI Pro?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <Zap size={32} className="text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant ATS Scoring</h3>
              <p className="text-gray-600">Get real-time ATS scores to optimize your resume for applicant tracking systems</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <BarChart3 size={32} className="text-purple-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Analytics</h3>
              <p className="text-gray-600">View detailed analytics and track your resume improvement over time</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <Lock size={32} className="text-green-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your data is encrypted and kept private – we never share your information</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
              <Users size={32} className="text-orange-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Suggestions</h3>
              <p className="text-gray-600">Get personalized recommendations to improve your resume effectiveness</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Optimize Your Resume?</h2>
          <p className="text-lg mb-8 opacity-90">Join thousands of professionals using ResumeAI Pro</p>
          <Link to="/signup" className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition inline-block">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
}
