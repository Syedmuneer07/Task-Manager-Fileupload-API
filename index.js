const express= require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');

require('dotenv').config();
const app = express();

app.use(express.json());

app.use('/uploads',express.static('uploads'));// serve static files


app.use('/api', taskRoutes);

//mongoose
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));



app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); 