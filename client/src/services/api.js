import axios from 'axios';

const API=axios.create({
    baseURL: 'http://localhost:3000/api'
});

API.interceptors.request.use((config)=>{
    const token=localStorage.getItem('token');
    if(token)
    {
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
});

export const registerUser=(userData)=> API.post('/auth/register',userData);
export const loginUser=(userData)=>API.post('/auth/login',userData);

export const getJobs=()=>API.get('/jobs');
export const getJob=(id)=>API.get(`/jobs/${id}`);
export const createJob=(jobData)=>API.post('/jobs',jobData);
export const updateJob=(id,jobData)=>API.patch(`/jobs/${id}`,jobData);
export const deleteJob=(id)=>API.delete(`/jobs/${id}`);
export const getStats=()=>API.get('/jobs/stats');

export default API;