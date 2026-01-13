const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth');
const{
    createJob,
    getJobs,
    getJob,
    updateJob,
    deleteJob
}=require('../controllers/jobController');

router.use(auth);

router.route('/')
.post(createJob)
.get(getJobs);

router.route('/:id')
.get(getJob)
.patch(updateJob)
.delete(deleteJob);

module.exports=router;