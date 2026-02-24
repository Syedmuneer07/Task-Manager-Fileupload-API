const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const upload = require('../middleware/Uploads');

router.post('/tasks', upload.single('attachment') ,taskController.createTask);
// router.get('/tasks', taskController.getAllTasks);
// router.get('/tasks/:id', taskController.getTaskById);
// router.put('/tasks/:id', taskController.updateTask);
// router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;