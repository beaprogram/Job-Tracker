import { Link } from 'react-router-dom';

const JobCard = ({ job, onDelete }) => {
  const statusColors = {
    Applied: 'bg-blue-100 text-blue-800',
    Interview: 'bg-yellow-100 text-yellow-800',
    Offer: 'bg-green-100 text-green-800',
    Rejected: 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{job.position}</h3>
          <p className="text-gray-600">{job.company}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[job.status]}`}>
          {job.status}
        </span>
      </div>

      <div className="text-gray-500 text-sm mb-4">
        <p>📍 {job.location || 'Not specified'}</p>
        <p>💼 {job.jobType}</p>
        <p>📅 Applied: {new Date(job.dateApplied).toLocaleDateString()}</p>
      </div>

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