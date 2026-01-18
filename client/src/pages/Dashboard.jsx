import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStats, getJobs } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    stats: {
      Applied: 0,
      Interview: 0,
      Offer: 0,
      Rejected: 0
    }
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, jobsRes] = await Promise.all([
        getStats(),
        getJobs()
      ]);
      setStats(statsRes.data);
      setRecentJobs(jobsRes.data.jobs.slice(0, 5));
    } catch (err) {
      console.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Jobs', value: stats.totalJobs, color: 'bg-blue-500' },
    { label: 'Applied', value: stats.stats.Applied, color: 'bg-yellow-500' },
    { label: 'Interview', value: stats.stats.Interview, color: 'bg-purple-500' },
    { label: 'Offer', value: stats.stats.Offer, color: 'bg-green-500' },
    { label: 'Rejected', value: stats.stats.Rejected, color: 'bg-red-500' }
  ];

  if (loading) {
    return <div className="text-center mt-10 dark:text-white">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">
        Welcome back, {user?.name || 'User'}! 👋
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} text-white rounded-lg p-6 shadow-lg`}
          >
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-sm opacity-90">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Jobs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">Recent Applications</h2>
          <Link to="/jobs" className="text-blue-600 dark:text-blue-400 hover:underline">
            View All
          </Link>
        </div>

        {recentJobs.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <p>No job applications yet.</p>
            <Link
              to="/jobs/add"
              className="text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
            >
              Add your first job!
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-300">Company</th>
                  <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-300">Position</th>
                  <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-300">Status</th>
                  <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-300">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentJobs.map((job) => (
                  <tr key={job._id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-3 font-medium dark:text-white">{job.company}</td>
                    <td className="px-4 py-3 dark:text-gray-300">{job.position}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          job.status === 'Applied' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          job.status === 'Interview' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          job.status === 'Offer' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                      {new Date(job.dateApplied).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex gap-4">
        <Link
          to="/jobs/add"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
        >
          + Add New Job
        </Link>
        <Link
          to="/jobs"
          className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-medium"
        >
          View All Jobs
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;