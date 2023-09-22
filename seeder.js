const fs = require("fs");
const mongoose = require("mongoose");
const Bootcamp = require("./models/Bootcamp");
const Course = require("./models/Course");
const dotenv = require("dotenv");
const colors = require("colors");

dotenv.config({ path: "./config/config.env" });

const connectDb = require("./config/db");
const User = require("./models/User");
connectDb();
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

const courses = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
  );

  const users = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
  );


const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    await User.create(users);
    console.log("Imported".green.inverse);
    process.exit(1);
  } catch (error) {
    console.log("Error".red.inverse);
  }
};

const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();
    console.log("Deleted".red.inverse);
    process.exit(1);
  } catch (error) {
    console.log("Error".red.inverse);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
