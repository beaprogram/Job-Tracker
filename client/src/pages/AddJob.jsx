import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createJob } from '../services/api';
import { useTheme } from '../context/ThemeContext';

const AddJob = () => {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'Applied',
    jobType: 'Full-Time',
    location: '',
    deadline: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createJob(formData);
      navigate('/jobs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-[calc(100vh-4rem)] py-8 transition-colors duration-300 ${darkMode ? 'bg-mesh-dark' : 'bg-mesh-light'}`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/jobs" className={`inline-flex items-center gap-2 font-medium mb-8 transition-colors ${darkMode ? 'text-gray-400 hover:text-violet-400' : 'text-gray-600 hover:text-violet-600'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Jobs
        </Link>

        <div className={`rounded-2xl overflow-hidden border ${darkMode ? 'bg-slate-800/90 border-slate-700/50' : 'bg-white/90 border-gray-200/50'}`}>
          <div className="h-2 gradient-bar"></div>
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add New Job</h1>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Track a new job application</p>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Google"
                    className={`w-full px-4 py-3 rounded-xl ${darkMode ? 'input-dark text-white placeholder-gray-500' : 'input-light text-gray-900 placeholder-gray-400'}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Position <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Frontend Developer"
                    className={`w-full px-4 py-3 rounded-xl ${darkMode ? 'input-dark text-white placeholder-gray-500' : 'input-light text-gray-900 placeholder-gray-400'}`}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl ${darkMode ? 'input-dark text-white' : 'input-light text-gray-900'}`}
                  >
                    <option value="Applied">🚀 Applied</option>
                    <option value="Interview">🎯 Interview</option>
                    <option value="Offer">🎉 Offer</option>
                    <option value="Rejected">📝 Rejected</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Job Type</label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl ${darkMode ? 'input-dark text-white' : 'input-light text-gray-900'}`}
                  >
                    <option value="Full-Time">💼 Full-Time</option>
                    <option value="Part-Time">⏰ Part-Time</option>
                    <option value="Contract">📄 Contract</option>
                    <option value="Internship">🎓 Internship</option>
                    <option value="Remote">🏠 Remote</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. San Francisco, CA"
                    className={`w-full px-4 py-3 rounded-xl ${darkMode ? 'input-dark text-white placeholder-gray-500' : 'input-light text-gray-900 placeholder-gray-400'}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Deadline</label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl ${darkMode ? 'input-dark text-white' : 'input-light text-gray-900'}`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Add any notes about this application..."
                  className={`w-full px-4 py-3 rounded-xl resize-none ${darkMode ? 'input-dark text-white placeholder-gray-500' : 'input-light text-gray-900 placeholder-gray-400'}`}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Link
                  to="/jobs"
                  className={`flex-1 py-3 rounded-xl font-semibold text-center transition-colors ${darkMode ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 btn-primary py-3 rounded-xl text-white font-semibold disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Saving...
                    </span>
                  ) : 'Save Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJob;