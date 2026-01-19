import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${darkMode ? 'bg-slate-900/80 border-slate-700/50' : 'bg-white/80 border-gray-200/50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 via-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">JobTracker</h1>
              <p className={`text-[10px] -mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>by Arup</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {user && (
              <>
                <div className={`hidden sm:flex items-center rounded-xl p-1 ${darkMode ? 'bg-slate-800' : 'bg-gray-100'}`}>
                  <Link
                    to="/dashboard"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive('/dashboard') ? (darkMode ? 'bg-slate-700 text-white shadow-sm' : 'bg-white text-gray-900 shadow-sm') : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')}`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/jobs"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive('/jobs') ? (darkMode ? 'bg-slate-700 text-white shadow-sm' : 'bg-white text-gray-900 shadow-sm') : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')}`}
                  >
                    Jobs
                  </Link>
                </div>

                <div className={`flex items-center gap-3 pl-4 border-l ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden sm:block">
                    <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Pro Member</p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-colors ${darkMode ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>

                <button
                  onClick={handleLogout}
                  className={`sm:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${darkMode ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-600'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;