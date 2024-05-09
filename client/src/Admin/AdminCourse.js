import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminCourse = ({ user }) => {
  const [courseData, setCourseData] = useState({
    name: "",
    level: "",
    description: "",
    image: "",
  });
  const [courses, setCourses] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/Baddcourse", {
        ...courseData,
      });
      setCourseData({
        name: "",
        level: "",
        description: "",
        image: "",
      });
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get("/Bgetcourse");
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [courseData, user]);

  return (
    <div className="flex flex-col items-center justify-between overflow-y-auto max-h-550px">
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-93% bg-gray-100 text-black border border-transparent rounded-lg m-4 text-center p-8"
      >
        <h1 className="text-2xl font-bold mb-6">Add a Course</h1>
        <input
          type="text"
          name="name"
          placeholder="Course Name"
          value={courseData.name}
          onChange={handleChange}
          required
          className="block w-full rounded-md border-gray-300 p-2 mb-4 text-black"
        />
        <select
          name="level"
          value={courseData.level}
          onChange={handleChange}
          required
          className="block w-full rounded-md border-gray-300 p-2 mb-4 text-black"
        >
          <option disabled value="">
            Select Level
          </option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={courseData.description}
          onChange={handleChange}
          required
          className="block w-full rounded-md border-gray-300 p-2 mb-4 text-black"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={courseData.image}
          onChange={handleChange}
          className="block w-full rounded-md border-gray-300 p-2 mb-4 text-black"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition duration-300"
        >
          Add Course
        </button>
      </form>

      <div className="w-full mt-8  flex flex-wrap justify-around">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white border border-gray-300 rounded-lg mb-8 w-full md:w-1/2 lg:w-1/3 p-4 transform transition duration-200 hover:scale-105"
          >
            <Link
              to={{
                pathname: `/SingleCourse/${course._id}`, // Update this path
              }}
              className="block text-black text-lg font-semibold hover:underline"
            >
              <div
                className="overflow-hidden rounded-t-lg"
                style={{ height: "200px" }}
              >
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-full object-cover"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
                <p className="text-base font-normal mb-2">
                  Level: {course.level}
                </p>
                <p className="text-base font-normal">{course.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCourse;
