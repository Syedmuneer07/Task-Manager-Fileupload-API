const express= require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const helmet=require('helmet');
const cors=require('cors');
const rateLimit=require('express-rate-limit');
const mongooseSanitize=require('express-mongo-sanitize');
const xssClean=require('xss-clean');
const csrf=require('csurf');
const cookieParser=require('cookie-parser');
require('dotenv').config();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    // standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    // legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests from this IP, please try again after 15 minutes',
});// apply rate limiting

const app = express();// create express app



app.use(express.json());// parse JSON request bodies
app.disable("x-powered-by")// disable X-Powered-By header
app.use(cors(
    {
        origin:'http://localhost:3000',// Allow requests from this origin
        Methods: ['GET', 'POST', 'PUT', 'DELETE'],// Allow these HTTP methods
    }
));// enable CORS 
app.use(limiter);// apply rate limiting
app.use(helmet());// set security headers
app.use(xssClean());// sanitize user input
app.use(mongooseSanitize());// sanitize user input
app.use(cookieParser());// parse cookies
app.use(csrf({cookie: true}));// enable CSRF protection
app.use('/uploads',express.static('uploads'));// serve static files


app.use('/api', taskRoutes);

//mongoose
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));



app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); 