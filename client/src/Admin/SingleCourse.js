import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleCourse = () => {
  const { courseId } = useParams();
  const [courseName, setCourseName] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [lectureData, setLectureData] = useState({
    instructor: "",
    date: "",
    lecture: "",
    location: "",
  });

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        if (courseId) {
          const courseNameResponse = await axios.get(
            `http://localhost:4000/Bgetcoursename/${courseId}`
          );
          setCourseName(courseNameResponse.data.courseName);

          const instructorsResponse = await axios.get(
            "http://localhost:4000/Busers"
          );
          setInstructors(instructorsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [courseId]);
  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const fetchScheduleResponse = await axios.get(
          "http://localhost:4000/Bgetschedule",
          { params: { courseName } }
        );
        console.log("Fetched schedules:", fetchScheduleResponse.data.schedules);
        setSchedule(fetchScheduleResponse.data.schedules);
      } catch (e) {
        console.log(e);
      }
    };
    fetchScheduleData();
  });

  const handleInstructorSelection = (e) => {
    setSelectedInstructor(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLectureData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const scheduleData = {
      course: courseName,
      lecture: lectureData.lecture,
      date: lectureData.date,
      instructor: selectedInstructor,
      location: lectureData.location,
    };

    try {
      // Add the schedule to the backend
      const addScheduleResponse = await axios.post(
        "http://localhost:4000/Baddschedule",
        scheduleData
      );
      console.log("Schedule added successfully:", addScheduleResponse.data);

      // Fetch the updated schedule from the backend
      const fetchScheduleResponse = await axios.get(
        "http://localhost:4000/Bgetschedule",
        { params: { courseName } }
      );
      console.log("Fetched schedules:", fetchScheduleResponse.data.schedules);
      setSchedule(fetchScheduleResponse.data.schedules);

      // Reset the lecture data after successful addition
      setLectureData({
        instructor: "",
        date: "",
        lecture: "",
        location: "",
      });
    } catch (error) {
      console.error("Error adding schedule:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">{courseName}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Select Instructor */}
          <div>
            <label htmlFor="instructor" className="block font-semibold">
              Select Instructor:
            </label>
            <select
              name="instructor"
              id="instructor"
              value={selectedInstructor}
              onChange={handleInstructorSelection}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            >
              <option value="" disabled>
                Choose an instructor
              </option>
              {instructors.map((instructor) => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.userName}
                </option>
              ))}
            </select>
          </div>
          {/* Date Input */}
          <div>
            <label htmlFor="date" className="block font-semibold">
              Select Date:
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={lectureData.date}
              onChange={handleChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          {/* Lecture Name Input */}
          <div>
            <label htmlFor="lecture" className="block font-semibold">
              Lecture Name:
            </label>
            <input
              type="text"
              name="lecture"
              id="lecture"
              value={lectureData.lecture}
              onChange={handleChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          {/* Location Input */}
          <div>
            <label htmlFor="location" className="block font-semibold">
              Location:
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={lectureData.location}
              onChange={handleChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Schedule Lecture
          </button>
        </form>
        {/* Display Schedules */}
        <div className="mt-8 space-y-4">
          {schedule.length > 0 ? (
            <div className="mt-8 space-y-4">
              {schedule.map((item) => (
                <div
                  key={item._id}
                  className="p-4 bg-white shadow-md rounded-md"
                >
                  <h2 className="text-lg font-semibold">{item.lecture}</h2>
                  <p className="text-sm">Instructor: {item.instructor}</p>
                  <p className="text-sm">
                    Date: {new Date(item.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm">Location: {item.location}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No schedules found for this course.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
