const express = require("express");
const dotenv = require("dotenv");

// Route files

const bootcamps = require('./routes/bootcamps');
const app = express();
app.use('/api/v1/bootcamps', bootcamps);



dotenv.config({ path: "./config/config.env" });

const port = process.env.PORT || 5000;

app.listen(
  port,
  console.log(`Server running on ${process.env.NODE_ENV} at port ${port}`)
);
