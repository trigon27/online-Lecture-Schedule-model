import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleCourse = () => {
  const { courseId } = useParams();
  const [courseName, setCourseName] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
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
            `/Bgetcoursename/${courseId}`
          );
          setCourseName(courseNameResponse.data.courseName);

          const instructorsResponse = await axios.get("/Busers");
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
        const fetchScheduleResponse = await axios.get("/Bgetschedule", {
          params: { courseName },
        });
        setSchedule(fetchScheduleResponse.data.schedules);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      }
    };
    fetchScheduleData();
  }, [courseName]);

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
      const availabilityResponse = await axios.post(
        "/BcheckInstructorAvailability",
        scheduleData
      );
      if (availabilityResponse.status === 200) {
        console.log(availabilityResponse.status);
        // Add the schedule to the backend
        await axios.post("/Baddschedule", scheduleData);

        // Fetch the updated schedule from the backend
        const fetchScheduleResponse = await axios.get("/Bgetschedule", {
          params: { courseName },
        });
        setSchedule(fetchScheduleResponse.data.schedules);

        // Reset the lecture data after successful addition
        setLectureData({
          instructor: "",
          date: "",
          lecture: "",
          location: "",
        });
      } else {
        console.log("busy instructor");
        setErrorMessage("Instructor already book choose another time ");
      }
    } catch (error) {
      console.error("Error adding schedule:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-5 py-8">
        <h1 className="text-3xl font-bold mb-4">{courseName}</h1>
        <div className="grid gap-8 lg:grid-cols-1">
          {/* Left Section - Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
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
            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}
          </div>

          {/* Right Section - Schedules */}

          <div className="space-y-8 space-x-5 lg:grid lg:grid-cols-1 lg:gap-8">
            {schedule.length > 0 ? (
              <div className="space-y-4">
                {schedule.map((item) => (
                  <div
                    key={item._id}
                    className="p-6 bg-white shadow-md rounded-md"
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
    </div>
  );
};

export default SingleCourse;
