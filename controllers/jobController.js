const Job = require('../models/Job');
const mongoose = require('mongoose');

const createJob = async (req, res) => {
    try {
        req.body.user = req.user.id;
        const job = await Job.create(req.body);
        res.status(201).json(job);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getJobs = async (req, res) => {
    try {
        const { status, search, sort } = req.query;
        const queryObject = { user: req.user.id };

        if (status && status != 'all') {
            queryObject.status = status;
        }
        if (search) {
            queryObject.company = { $regex: search, $options: 'i' };
        }

        let result = Job.find(queryObject);

        if (sort == 'newest') {
            result = result.sort('-createdAt');
        }
        else if (sort == 'oldest') {
            result = result.sort('createdAt');
        }
        else {
            result = result.sort('-createdAt');
        }

        const jobs = await result;
        res.status(200).json({ jobs, count: jobs.length });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getJob = async (req, res) => {
    try {
        const job = await Job.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json(job);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateJob = async (req, res) => {
    try {
        const job = await Job.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json(job);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteJob = async (req, res) => {
    try {
        const job = await Job.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job Deleted Successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getStats = async (req, res) => {
    try {
        const stats = await Job.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        const defaultStats = {
            Applied: 0,
            Interview: 0,
            Offer: 0,
            Rejected: 0
        };

        stats.forEach((item) => {
            defaultStats[item._id] = item.count;
        });

        const totalJobs = Object.values(defaultStats).reduce((a, b) => a + b, 0);

        res.status(200).json({
            totalJobs,
            stats: defaultStats
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createJob,
    getJobs,
    getJob,
    updateJob,
    deleteJob,
    getStats
};