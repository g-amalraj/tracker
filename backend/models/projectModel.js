
import mongoose from 'mongoose';
import User from './userModel.js';

const ProjectSchema = new mongoose.Schema({
    users: [{
       
        type: String,
        required: true
    }],
    projectName: {
        type: String,
        required: true
    },
    
});

const Project = mongoose.model('Project', ProjectSchema);

export default Project;

