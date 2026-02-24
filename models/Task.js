const mongoose=require('mongoose')

const taskSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    attachment: {
        type: String,
        trim: true
    }
}, {
    timestamps: true//created_at,updated_at 
})

const Task=mongoose.model('Task', taskSchema)

module.exports = Task
