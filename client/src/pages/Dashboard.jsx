import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStats, getJobs } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, Applied: 0, Interview: 0, Offer: 0, Rejected: 0 });
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
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
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLogoUrl = (company) => {
    const domain = company.toLowerCase().replace(/\s+/g, '') + '.com';
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2.5 py-1 text-xs rounded-full font-medium text-white";
    const badges = {
      Applied: `${baseClasses} bg-gradient-to-r from-blue-500 to-cyan-500`,
      Interview: `${baseClasses} bg-gradient-to-r from-amber-500 to-orange-500`,
      Offer: `${baseClasses} bg-gradient-to-r from-emerald-500 to-green-500`,
      Rejected: `${baseClasses} bg-gradient-to-r from-red-500 to-rose-500`
    };
    return badges[status] || badges.Applied;
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-mesh-dark' : 'bg-mesh-light'}`}>
        <div className="text-center">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
            <svg className="w-7 h-7 text-white animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-mesh-dark' : 'bg-mesh-light'}`}>
      {/* Floating Background Elements */}
      {darkMode && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600 rounded-full filter blur-[120px] opacity-20 animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full filter blur-[120px] opacity-15 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-500 rounded-full filter blur-[100px] opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-5">
          
          {/* Welcome Card - Large */}
          <div className="col-span-12 md:col-span-5 row-span-2 animate-fade-in">
            <div className="h-full rounded-3xl p-6 md:p-8 relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 animate-gradient card-hover">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-20 -left-10 w-60 h-60 bg-white/5 rounded-full"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-between min-h-[320px]">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium mb-4">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                    Active
                  </div>
                  <p className="text-violet-200 text-sm">Welcome back</p>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mt-1">{user?.name || 'User'}</h2>
                  <p className="text-violet-200 mt-2">Let's land your dream job today!</p>
                </div>
                
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-violet-200 text-sm">Application Progress</p>
                    <p className="text-white font-semibold">{stats.total > 0 ? Math.round((stats.Offer / stats.total) * 100) : 0}%</p>
                  </div>
                  <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="relative h-full bg-white rounded-full transition-all duration-500"
                      style={{ width: `${stats.total > 0 ? Math.max((stats.Offer / stats.total) * 100, 5) : 5}%` }}
                    >
                      <div className="absolute inset-0 progress-shimmer"></div>
                    </div>
                  </div>
                  <p className="text-violet-200 text-xs mt-2">{stats.Offer} offers from {stats.total} applications</p>
                </div>
                
                <Link 
                  to="/jobs/add" 
                  className="mt-6 w-full py-3 bg-white text-violet-600 rounded-xl font-semibold hover:bg-white/90 transition flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Application
                </Link>
              </div>
            </div>
          </div>

          {/* Total Jobs */}
          <div className="col-span-6 md:col-span-2 animate-fade-in delay-100">
            <div className="h-full rounded-2xl p-5 flex flex-col justify-between min-h-[160px] stat-card-total relative overflow-hidden card-hover shadow-lg shadow-violet-500/20">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full"></div>
              <div className="absolute -left-4 -top-4 w-16 h-16 bg-white/5 rounded-full"></div>
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="relative z-10">
                <p className="text-4xl font-bold text-white">{stats.total || 0}</p>
                <p className="text-white/80 text-sm">Total Jobs</p>
              </div>
            </div>
          </div>

          {/* Applied */}
          <div className="col-span-6 md:col-span-2 animate-fade-in delay-200">
            <div className="h-full rounded-2xl p-5 flex flex-col justify-between min-h-[160px] stat-card-applied relative overflow-hidden card-hover shadow-lg shadow-blue-500/20">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full"></div>
              <div className="absolute -left-4 -top-4 w-16 h-16 bg-white/5 rounded-full"></div>
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <div className="relative z-10">
                <p className="text-4xl font-bold text-white">{stats.Applied || 0}</p>
                <p className="text-white/80 text-sm">Applied</p>
              </div>
            </div>
          </div>

          {/* Interviews - Larger */}
          <div className="col-span-6 md:col-span-3 animate-fade-in delay-300">
            <div className="h-full rounded-2xl p-5 flex flex-col justify-between min-h-[160px] stat-card-interview relative overflow-hidden card-hover shadow-lg shadow-amber-500/20">
              <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full"></div>
              <div className="absolute left-1/2 top-1/2 w-40 h-40 bg-white/5 rounded-full"></div>
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="relative z-10">
                <p className="text-5xl font-bold text-white">{stats.Interview || 0}</p>
                <p className="text-white/80 text-sm">Interviews Scheduled</p>
                {stats.Interview > 0 && (
                  <div className="flex items-center gap-1 mt-2">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    <span className="text-white/80 text-xs">Keep going!</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Offers */}
          <div className="col-span-6 md:col-span-2 animate-fade-in delay-200">
            <div className="h-full rounded-2xl p-5 flex flex-col justify-between min-h-[160px] stat-card-offer relative overflow-hidden card-hover shadow-lg shadow-emerald-500/20">
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full"></div>
              <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full"></div>
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div className="relative z-10">
                <p className="text-4xl font-bold text-white">{stats.Offer || 0}</p>
                <p className="text-white/80 text-sm">Offers 🎉</p>
              </div>
            </div>
          </div>

          {/* Rejected */}
          <div className="col-span-6 md:col-span-2 animate-fade-in delay-300">
            <div className="h-full rounded-2xl p-5 flex flex-col justify-between min-h-[160px] stat-card-rejected relative overflow-hidden card-hover shadow-lg shadow-red-500/20">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full"></div>
              <div className="absolute -left-4 -top-4 w-16 h-16 bg-white/5 rounded-full"></div>
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <div className="relative z-10">
                <p className="text-4xl font-bold text-white">{stats.Rejected || 0}</p>
                <p className="text-white/80 text-sm">Rejected</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="col-span-12 md:col-span-7 animate-fade-in delay-400">
            <div className={`h-full rounded-2xl p-5 ${darkMode ? 'glass' : 'glass-light shadow-lg'}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Activity</h3>
                <Link to="/jobs" className={`text-sm flex items-center gap-1 transition ${darkMode ? 'text-violet-400 hover:text-violet-300' : 'text-violet-600 hover:text-violet-700'}`}>
                  View all
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              
              {recentJobs.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className={`font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>No applications yet</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Start tracking your job search!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentJobs.map((job) => (
                    <Link 
                      key={job._id} 
                      to={`/jobs/edit/${job._id}`}
                      className={`flex items-center gap-3 p-3 rounded-xl transition cursor-pointer group ${darkMode ? 'bg-white/5 hover:bg-white/10' : 'hover:bg-gray-50'}`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center p-1.5 overflow-hidden ${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-gray-100 border border-gray-200'}`}>
                        <img src={getLogoUrl(job.company)} alt={job.company} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate transition ${darkMode ? 'text-white group-hover:text-violet-300' : 'text-gray-900 group-hover:text-violet-600'}`}>{job.position}</p>
                        <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{job.company} • {new Date(job.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className={getStatusBadge(job.status)}>{job.status}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="col-span-12 md:col-span-5 animate-fade-in delay-500">
            <div className={`h-full rounded-2xl p-5 ${darkMode ? 'glass' : 'glass-light shadow-lg'}`}>
              <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  to="/jobs/add"
                  className={`flex items-center gap-3 p-3 rounded-xl transition ${darkMode ? 'bg-violet-500/10 border border-violet-500/20 hover:bg-violet-500/20' : 'bg-violet-50 border border-violet-200 hover:bg-violet-100'}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add New Job</p>
                    <p className={`text-xs ${darkMode ? 'text-violet-300' : 'text-violet-600'}`}>Track a new application</p>
                  </div>
                </Link>
                
                <Link 
                  to="/jobs"
                  className={`flex items-center gap-3 p-3 rounded-xl transition ${darkMode ? 'bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20' : 'bg-blue-50 border border-blue-200 hover:bg-blue-100'}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>View All Jobs</p>
                    <p className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Manage your applications</p>
                  </div>
                </Link>
                
                <div className={`flex items-center gap-3 p-3 rounded-xl ${darkMode ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-200'}`}>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Success Rate</p>
                    <p className={`text-xs ${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>
                      {stats.total > 0 ? Math.round((stats.Interview / stats.total) * 100) : 0}% interview rate
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;