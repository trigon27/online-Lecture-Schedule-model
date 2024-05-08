import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleCourse = () => {
  const { courseId } = useParams();
  const [courseName, setCourseName] = useState("Dummy Course");
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
    const fetchCourseName = async () => {
      try {
        if (courseId) {
          const response = await axios.get(
            `http://localhost:4000/Bgetcoursename/${courseId}`
          );
          setCourseName(response.data.courseName);
        }
      } catch (error) {
        console.error("Error fetching course name:", error);
      }
    };
    fetchCourseName();
  }, [courseId]);

  useEffect(() => {
    // Fetch instructor data from the backend
    fetch("http://localhost:4000/Busers")
      .then((response) => response.json())
      .then((data) => setInstructors(data))
      .catch((error) => console.error("Error fetching instructors:", error));
  }, []);

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
      const response = await axios.post(
        "http://localhost:4000/Baddschedule",
        scheduleData
      );
      console.log("Schedule added successfully:", response.data);
      setSchedule([...schedule, response.data]);
    } catch (error) {
      console.error("Error adding schedule:", error);
    }
    setLectureData({
      instructor: "",
      date: "",
      lecture: "",
      location: "",
    });
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Baddschedule", {
          params: { courseName },
        });
        setSchedule(response.data.schedule);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };
    fetchSchedule();
  }, [courseName]);
  console.log(instructors);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">{courseName}</h1>
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

              {instructors &&
                instructors.map((instructor, index) => (
                  <option key={index} value={instructor.id}>
                    {instructor.userName}
                  </option>
                ))}
            </select>
          </div>
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
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Schedule Lecture
          </button>
        </form>
        <div className="mt-8 space-y-4">
          {schedule.map((item) => (
            <div key={item._id} className="p-4 bg-white shadow-md rounded-md">
              <h2 className="text-lg font-semibold">{item.lecture}</h2>
              <p className="text-sm">Instructor: {item.instructor}</p>
              <p className="text-sm">
                Date: {new Date(item.date).toLocaleDateString()}
              </p>
              <p className="text-sm">Location: {item.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
