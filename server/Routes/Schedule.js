const {
  addSchedule,
  getSchedule,
  getUserSchedule,
  checkAvailable,
} = require("../controller/Schedule");
const Course = require("express").Router();

Course.post("/Baddschedule", addSchedule);
Course.get("/Bgetschedule", getSchedule);
Course.get("/Bgetuserschedule", getUserSchedule);
Course.post("/BcheckInstructorAvailability", checkAvailable);
module.exports = Course;
