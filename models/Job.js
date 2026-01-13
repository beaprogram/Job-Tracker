const mongoose=require('mongoose');
const jobSchema=new mongoose.Schema({
    company:{
        type: String,
        required: [true,'Please add a company name']
    },
    position:{
        type:String,
        required:[true,'Please add a position']
    },
    status:{
        type:String,
        enum:['Applied','Interview','Offer','Rejected'],
        default:'Applied'
    },
    jobType:{
        type:String,
        enum:['Full-Time','Part-Time','Internship','Contract','Remote'],
        default:'Full-Time'
    },
    location:{
        type:String,
        default:'Not Specified'
    },
    dateApplied:{
        type:Date,
        default: Date.now
    },
    deadline:{
        type:Date
    },
    notes:{
        type:String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps:true
});

module.exports=mongoose.model('Job',jobSchema);