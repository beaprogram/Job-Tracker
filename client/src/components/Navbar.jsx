import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();

  if (!user) return null;

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold gradient-text">JobTracker</h1>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>by Arup</p>
            </div>
          </Link>

          {/* Center Nav */}
          <div className="flex items-center gap-1">
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive('/dashboard')
                  ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25'
                  : darkMode 
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/jobs"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive('/jobs') || location.pathname.startsWith('/jobs/')
                  ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25'
                  : darkMode 
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Jobs
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-xl transition-all ${darkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
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

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-3 border-l border-slate-700/50">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-violet-500/25">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="hidden md:block">
                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user?.name}</p>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Pro Member</p>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className={`p-2.5 rounded-xl transition-all ${darkMode ? 'text-slate-400 hover:text-red-400 hover:bg-red-500/10' : 'text-gray-500 hover:text-red-500 hover:bg-red-50'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;