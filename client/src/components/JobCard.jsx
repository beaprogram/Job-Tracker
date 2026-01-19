import { useState } from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job, onDelete }) => {
  const [showNotes, setShowNotes] = useState(false);

  const getStatusStyle = (status) => {
    const styles = {
      Applied: {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-700 dark:text-blue-400',
        dot: 'bg-blue-500'
      },
      Interview: {
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-700 dark:text-purple-400',
        dot: 'bg-purple-500'
      },
      Offer: {
        bg: 'bg-emerald-100 dark:bg-emerald-900/30',
        text: 'text-emerald-700 dark:text-emerald-400',
        dot: 'bg-emerald-500'
      },
      Rejected: {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-700 dark:text-red-400',
        dot: 'bg-red-500'
      }
    };
    return styles[status] || styles.Applied;
  };

  const getJobTypeStyle = (type) => {
    const styles = {
      'Full-time': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
      'Part-time': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
      'Contract': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      'Internship': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
      'Remote': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400'
    };
    return styles[type] || styles['Full-time'];
  };

  const statusStyle = getStatusStyle(job.status);
  const isDeadlineSoon = job.deadline && new Date(job.deadline) <= new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  const isDeadlinePassed = job.deadline && new Date(job.deadline) < new Date();

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden card-hover">
      {/* Status Bar */}
      <div className={`h-1.5 ${statusStyle.dot}`} />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
              {job.company.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {job.position}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium">{job.company}</p>
            </div>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
            {job.status}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-4">
          {job.location && (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {job.location}
            </div>
          )}
          
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Applied {new Date(job.dateApplied).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>

          {job.deadline && (
            <div className={`flex items-center gap-2 text-sm ${isDeadlinePassed ? 'text-red-500' : isDeadlineSoon ? 'text-amber-500' : 'text-gray-500 dark:text-gray-400'}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Deadline: {new Date(job.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              {isDeadlinePassed && <span className="text-xs font-medium">(Passed)</span>}
              {isDeadlineSoon && !isDeadlinePassed && <span className="text-xs font-medium">(Soon!)</span>}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getJobTypeStyle(job.jobType)}`}>
            {job.jobType}
          </span>
        </div>

        {/* Notes Toggle */}
        {job.notes && (
          <div className="mb-4">
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              <svg className={`w-4 h-4 transition-transform ${showNotes ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              {showNotes ? 'Hide Notes' : 'Show Notes'}
            </button>
            {showNotes && (
              <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-sm text-gray-600 dark:text-gray-300 animate-fade-in">
                {job.notes}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Link
            to={`/jobs/edit/${job._id}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </Link>
          <button
            onClick={() => onDelete(job._id)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;