import { useState } from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job, onDelete }) => {
  const [showNotes, setShowNotes] = useState(false);

  const statusColors = {
    Applied: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Interview: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Offer: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">{job.position}</h3>
          <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[job.status]}`}>
          {job.status}
        </span>
      </div>

      <div className="text-gray-500 dark:text-gray-400 text-sm mb-4">
        <p>📍 {job.location || 'Not specified'}</p>
        <p>💼 {job.jobType}</p>
        <p>📅 Applied: {new Date(job.dateApplied).toLocaleDateString()}</p>
        {job.deadline && (
          <p>⏰ Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
        )}
      </div>

      {/* Notes Section */}
      {job.notes && (
        <div className="mb-4">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="text-blue-600 dark:text-blue-400 text-sm hover:underline flex items-center"
          >
            📝 {showNotes ? 'Hide Notes' : 'Show Notes'}
          </button>
          {showNotes && (
            <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded text-sm text-gray-700 dark:text-gray-300">
              {job.notes}
            </div>
          )}
        </div>
      )}

      <div className="flex space-x-2">
        <Link
          to={`/jobs/edit/${job._id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(job._id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;