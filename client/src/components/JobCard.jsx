import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const JobCard = ({ job, onDelete }) => {
  const [showNotes, setShowNotes] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { darkMode } = useTheme();

  const getLogoUrl = (company) => {
    const domain = company.toLowerCase().replace(/\s+/g, '') + '.com';
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  };

  const getStatusConfig = (status) => {
    const configs = {
      Applied: { badge: darkMode ? 'badge-applied-dark' : 'badge-applied-light', icon: '🚀' },
      Interview: { badge: darkMode ? 'badge-interview-dark' : 'badge-interview-light', icon: '🎯' },
      Offer: { badge: darkMode ? 'badge-offer-dark' : 'badge-offer-light', icon: '🎉' },
      Rejected: { badge: darkMode ? 'badge-rejected-dark' : 'badge-rejected-light', icon: '📝' }
    };
    return configs[status] || configs.Applied;
  };

  const getJobTypeBadge = (type) => {
    if (darkMode) {
      return 'bg-slate-700 text-gray-300';
    }
    return 'bg-gray-100 text-gray-600';
  };

  const statusConfig = getStatusConfig(job.status);
  const isDeadlineSoon = job.deadline && new Date(job.deadline) <= new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  const isDeadlinePassed = job.deadline && new Date(job.deadline) < new Date();

  return (
    <div className={`card-hover rounded-2xl overflow-hidden border ${darkMode ? 'bg-slate-800/90 border-slate-700/50' : 'bg-white/90 border-gray-200/50'}`}>
      <div className="h-1.5 gradient-bar"></div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl border p-2 flex items-center justify-center ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-200'}`}>
              {!imgError ? (
                <img
                  src={getLogoUrl(job.company)}
                  alt={job.company}
                  className="company-logo"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full rounded-lg bg-gradient-to-br from-violet-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                  {job.company.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className={`font-semibold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>{job.position}</h3>
              <p className={`text-sm truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{job.company}</p>
            </div>
          </div>
          <span className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.badge}`}>
            {statusConfig.icon} {job.status}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          {job.location && (
            <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{job.location}</span>
            </div>
          )}
          <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Applied {new Date(job.dateApplied).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          {job.deadline && (
            <div className={`flex items-center gap-2 text-sm ${isDeadlinePassed ? 'text-red-500' : isDeadlineSoon ? 'text-amber-500' : (darkMode ? 'text-gray-400' : 'text-gray-500')}`}>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                Deadline: {new Date(job.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                {isDeadlinePassed && ' (Passed)'}
                {isDeadlineSoon && !isDeadlinePassed && ' (Soon!)'}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getJobTypeBadge(job.jobType)}`}>
            {job.jobType}
          </span>
        </div>

        {job.notes && (
          <div className="mb-4">
            <button
              onClick={() => setShowNotes(!showNotes)}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${darkMode ? 'text-violet-400 hover:text-violet-300' : 'text-violet-600 hover:text-violet-700'}`}
            >
              <svg className={`w-4 h-4 transition-transform ${showNotes ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              {showNotes ? 'Hide Notes' : 'Show Notes'}
            </button>
            {showNotes && (
              <div className={`mt-3 p-3 rounded-xl text-sm ${darkMode ? 'bg-slate-700/50 text-gray-300' : 'bg-gray-50 text-gray-600'}`}>
                {job.notes}
              </div>
            )}
          </div>
        )}

        <div className={`flex gap-2 pt-4 border-t ${darkMode ? 'border-slate-700' : 'border-gray-100'}`}>
          <Link
            to={`/jobs/edit/${job._id}`}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium text-center transition-colors ${darkMode ? 'bg-slate-700 text-gray-300 hover:bg-violet-500/20 hover:text-violet-300' : 'bg-gray-100 text-gray-700 hover:bg-violet-100 hover:text-violet-700'}`}
          >
            ✏️ Edit
          </Link>
          <button
            onClick={() => onDelete(job._id)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${darkMode ? 'bg-slate-700 text-gray-300 hover:bg-red-500/20 hover:text-red-300' : 'bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-700'}`}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;