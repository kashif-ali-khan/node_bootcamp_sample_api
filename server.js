const express = require("express");
const dotenv = require("dotenv");
const logger = require('./middleware/logger');
const connectDB = require('./config/db');
const morgan = require('morgan');


dotenv.config({ path: "./config/config.env" });
// Route files

const bootcamps = require('./routes/bootcamps');
const app = express();

// Body Parser
app.use(express.json())

//Connect to DB
connectDB();


if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));

}



app.use('/api/v1/bootcamps', bootcamps);





const port = process.env.PORT || 5000;

const server = app.listen(
  port,
  console.log(`Server running on ${process.env.NODE_ENV} at port ${port}`)
);

// Handle un-handled exception

process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`)
    server.close(()=>process.exit(1));
})