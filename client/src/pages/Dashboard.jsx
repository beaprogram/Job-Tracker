import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStats, getJobs } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, Applied: 0, Interview: 0, Offer: 0, Rejected: 0 });
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const { darkMode } = useTheme();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, jobsRes] = await Promise.all([getStats(), getJobs()]);
      setStats(statsRes.data.stats || { total: 0, Applied: 0, Interview: 0, Offer: 0, Rejected: 0 });
      setRecentJobs(jobsRes.data.jobs?.slice(0, 5) || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const getLogoUrl = (company) => {
    const domain = company.toLowerCase().replace(/\s+/g, '') + '.com';
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  };

  const getStatusBadge = (status) => {
    const badges = {
      Applied: darkMode ? 'badge-applied-dark' : 'badge-applied-light',
      Interview: darkMode ? 'badge-interview-dark' : 'badge-interview-light',
      Offer: darkMode ? 'badge-offer-dark' : 'badge-offer-light',
      Rejected: darkMode ? 'badge-rejected-dark' : 'badge-rejected-light'
    };
    return badges[status] || badges.Applied;
  };

  if (loading) {
    return (
      <div className={`min-h-[calc(100vh-4rem)] flex items-center justify-center ${darkMode ? 'bg-mesh-dark' : 'bg-mesh-light'}`}>
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-[calc(100vh-4rem)] transition-colors duration-300 ${darkMode ? 'bg-mesh-dark' : 'bg-mesh-light'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className={`text-3xl sm:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Hello, <span className="gradient-text">{user?.name || 'User'}</span> 
              </h1>
              <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Track your job applications and land your dream job</p>
            </div>
            <Link to="/jobs/add" className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Job
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className={`card-hover rounded-2xl p-5 border shadow-sm ${darkMode ? 'bg-slate-800/80 border-slate-700/50' : 'bg-white/90 border-gray-200/50'}`}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-3 shadow-lg shadow-violet-500/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.total || 0}</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Jobs</div>
            <div className={`mt-3 h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
              <div className="h-full w-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full"></div>
            </div>
          </div>

          <div className={`card-hover rounded-2xl p-5 border shadow-sm ${darkMode ? 'bg-slate-800/80 border-slate-700/50' : 'bg-white/90 border-gray-200/50'}`}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-3 shadow-lg shadow-blue-500/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <div className={`text-3xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{stats.Applied || 0}</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Applied</div>
            <div className={`mt-3 h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: `${stats.total ? (stats.Applied / stats.total) * 100 : 0}%` }}></div>
            </div>
          </div>

          <div className={`card-hover rounded-2xl p-5 border shadow-sm ${darkMode ? 'bg-slate-800/80 border-slate-700/50' : 'bg-white/90 border-gray-200/50'}`}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-3 shadow-lg shadow-amber-500/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className={`text-3xl font-bold ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>{stats.Interview || 0}</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Interviews</div>
            <div className={`mt-3 h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
              <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: `${stats.total ? (stats.Interview / stats.total) * 100 : 0}%` }}></div>
            </div>
          </div>

          <div className={`card-hover rounded-2xl p-5 border shadow-sm ${darkMode ? 'bg-slate-800/80 border-slate-700/50' : 'bg-white/90 border-gray-200/50'}`}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center mb-3 shadow-lg shadow-emerald-500/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div className={`text-3xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{stats.Offer || 0}</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Offers</div>
            <div className={`mt-3 h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
              <div className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full" style={{ width: `${stats.total ? (stats.Offer / stats.total) * 100 : 0}%` }}></div>
            </div>
          </div>

          <div className={`card-hover rounded-2xl p-5 border shadow-sm ${darkMode ? 'bg-slate-800/80 border-slate-700/50' : 'bg-white/90 border-gray-200/50'}`}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center mb-3 shadow-lg shadow-red-500/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <div className={`text-3xl font-bold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{stats.Rejected || 0}</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Rejected</div>
            <div className={`mt-3 h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
              <div className="h-full bg-gradient-to-r from-red-500 to-rose-500 rounded-full" style={{ width: `${stats.total ? (stats.Rejected / stats.total) * 100 : 0}%` }}></div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Applications</h2>
          <Link to="/jobs" className={`text-sm font-medium flex items-center gap-1 transition-colors ${darkMode ? 'text-violet-400 hover:text-violet-300' : 'text-violet-600 hover:text-violet-700'}`}>
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {recentJobs.length === 0 ? (
          <div className={`text-center py-16 rounded-2xl border ${darkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/50 border-gray-200/50'}`}>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>No applications yet</h3>
            <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Start tracking your job applications</p>
            <Link to="/jobs/add" className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Your First Job
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {recentJobs.map((job) => (
              <Link key={job._id} to={`/jobs/edit/${job._id}`} className={`card-hover flex items-center gap-4 p-4 rounded-2xl border transition-all ${darkMode ? 'bg-slate-800/80 border-slate-700/50 hover:bg-slate-800' : 'bg-white/90 border-gray-200/50 hover:bg-white'}`}>
                <div className={`w-12 h-12 rounded-xl border p-2 flex items-center justify-center ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-200'}`}>
                  <img src={getLogoUrl(job.company)} alt={job.company} className="company-logo" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>{job.position}</h3>
                  <p className={`text-sm truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{job.company}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(job.status)}`}>
                  {job.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;