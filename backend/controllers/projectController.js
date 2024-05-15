import express from 'express';
import mongoose from 'mongoose';
import Project from '../models/projectModel.js'; 

export const createProject = async (req, res) => {
  
    const { users, projectName } = req.body;

    try {
      
        const newProject = new Project({ users, projectName });
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    };
    



export const updateProject = async (req, res) => {
   
    const projectId = req.params.projectId;
    console.log(projectId )
    const { users } = req.body;

    try {
        
        const updatedProject = await Project.findByIdAndUpdate({_id: projectId},  { $push: { users: { $each: users } } }, { new: true });
        return res.send(updatedProject)
        
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(updatedProject);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
      
 
export const getProject = async (req, res) => {
    try {
        const project = await Project.find(); // Assuming User is your Mongoose model for users
        res.json(project);
        console.log(project)
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`); 
    }
}


export const deleteProject = async (req, res) => {
    const project = await Project.findById(req.params.id);
  
    if (project) {
      await project.deleteOne({ _id: project._id });
      res.status(200).json({ message: "Project deleted" });
    } else {
      res.status(404);
      throw new Error("Resource not found");
    }
  };







