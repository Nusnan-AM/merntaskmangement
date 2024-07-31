const e = require("express");
const Taskmodel = require("../Model/Taskmodel");

const mongoose =require("mongoose")
const createTask = async (req,res)=>{

const {title,description} = req.body

    try {
        const Task = await Taskmodel.create({title,description});
        res.status(200).json(Task);
    } catch (e) {
        res.status(400).json({error: e.message})
    }
};
//  to get all task
const getTask = async(req,res) =>{
    try {
        const tasks = await Taskmodel.find({});
        res.status(200).json(tasks)
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}
//get single task 
const getSingleTask = async(req,res) =>{
    const{id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:'Task not Found'})
    }
    try {
        const SingleTask = await Taskmodel.findById(id)
        res.status(200).json(SingleTask)
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}
//update -patch
const updateTask = async(req,res) =>{
    const {id} =req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:'Task not Found'})  
    }
    try {
        const upTask = await Taskmodel.findByIdAndUpdate(
            {
                _id : id
            },{
               ... req.body
            }
        )
        res.status(200).json(upTask);

        
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

//delete

const deleteTask = async(req,res) =>{
    const{id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:'Task not Found'})
    }
    try {
        const task = await Taskmodel.findByIdAndDelete(id)
        res.status(200).json(task);
    } catch (e) {
         res.status(400).json({error: e.message})
    }
}

module.exports = {createTask,getTask,getSingleTask,updateTask, deleteTask};