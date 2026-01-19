import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getJobs, deleteJob } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import JobCard from '../components/JobCard';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const { darkMode } = useTheme();

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterAndSortJobs();
  }, [jobs, search, statusFilter, sortBy]);

  const fetchJobs = async () => {
    try {
      const response = await getJobs();
      setJobs(response.data.jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortJobs = () => {
    let result = [...jobs];

    if (search) {
      result = result.filter(job =>
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.position.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      result = result.filter(job => job.status === statusFilter);
    }

    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'company':
        result.sort((a, b) => a.company.localeCompare(b.company));
        break;
      default:
        break;
    }

    setFilteredJobs(result);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await deleteJob(id);
        setJobs(jobs.filter(job => job._id !== id));
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  const exportToCSV = () => {
    const headers = ['Company', 'Position', 'Status', 'Job Type', 'Location', 'Date Applied', 'Deadline', 'Notes'];
    const csvData = filteredJobs.map(job => [
      job.company,
      job.position,
      job.status,
      job.jobType,
      job.location || '',
      new Date(job.dateApplied).toLocaleDateString(),
      job.deadline ? new Date(job.deadline).toLocaleDateString() : '',
      job.notes || ''
    ]);

    const csvContent = [headers, ...csvData].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'job_applications.csv';
    a.click();
  };

  if (loading) {
    return (
      <div className={`min-h-[calc(100vh-4rem)] flex items-center justify-center ${darkMode ? 'bg-mesh-dark' : 'bg-mesh-light'}`}>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-emerald-500 flex items-center justify-center animate-pulse">
          <svg className="w-6 h-6 text-white animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-[calc(100vh-4rem)] transition-colors duration-300 ${darkMode ? 'bg-mesh-dark' : 'bg-mesh-light'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fade-in-up">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>My Jobs</h1>
            <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{filteredJobs.length} applications found</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={exportToCSV}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${darkMode ? 'bg-slate-800 text-gray-300 hover:bg-slate-700 border border-slate-700' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export CSV
            </button>
            <Link
              to="/jobs/add"
              className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Job
            </Link>
          </div>
        </div>

        <div className={`flex flex-col sm:flex-row gap-4 mb-6 p-4 rounded-2xl border animate-fade-in-up delay-100 ${darkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/50 border-gray-200/50'}`}>
          <div className="flex-1 relative">
            <svg className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by company or position..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl transition-colors ${darkMode ? 'input-dark text-white placeholder-gray-500' : 'input-light text-gray-900 placeholder-gray-400'}`}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-4 py-2.5 rounded-xl cursor-pointer ${darkMode ? 'input-dark text-white' : 'input-light text-gray-900'}`}
          >
            <option value="All">All Status</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-4 py-2.5 rounded-xl cursor-pointer ${darkMode ? 'input-dark text-white' : 'input-light text-gray-900'}`}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="company">Company A-Z</option>
          </select>
        </div>

        {filteredJobs.length === 0 ? (
          <div className={`text-center py-16 rounded-2xl border animate-fade-in-up delay-200 ${darkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/50 border-gray-200/50'}`}>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>No jobs found</h3>
            <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {jobs.length === 0 ? 'Start by adding your first job application' : 'Try adjusting your search or filters'}
            </p>
            {jobs.length === 0 && (
              <Link to="/jobs/add" className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Your First Job
              </Link>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredJobs.map((job, index) => (
              <div key={job._id} className="animate-fade-in-up" style={{ animationDelay: `${(index % 6) * 0.1}s` }}>
                <JobCard job={job} onDelete={handleDelete} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;