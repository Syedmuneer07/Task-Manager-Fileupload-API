const Task=require('../models/Task')

exports.createTask=async(req,res)=>{
    try{
        const {title, description}=req.body;

        const newTask=new Task({
            title,
            description,
            attachment: req.file? req.file.filename : null, // Use req.file.filename
        });
        await newTask.save();
        res.status(201).json({ message: 'Task created successfully' ,task: newTask});
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' , error: error.message});
    }   
}