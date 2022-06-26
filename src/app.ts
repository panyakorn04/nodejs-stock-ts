import express from 'express';
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
// const dotenv = require('dotenv') 
require('dotenv').config();
import { readdirSync } from 'fs';
const connectDB = require('./config/db')
const app = express();

//Connect to MongoDB
connectDB();

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({limit: process.env.APP_MAX_UPLOAD_LIMIT}));

// Route
// http://localhost:3000/api
app.use('/api', require('./routers/api'));


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port} at http://localhost:${port}`);
});