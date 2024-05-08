const { addCourse, getCourse, getCourseName } = require("../controller/Course");
const Course = require("express").Router();

Course.post("/Baddcourse", addCourse);
Course.get("/Bgetcourse", getCourse);
Course.get("/Bgetcoursename/:courseId", getCourseName);
module.exports = Course;
