import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout";
import axios from "axios";

const Instructor = () => {
  const navigate = useNavigate();
  const [currUser, setCurrUser] = useState("");
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const userKey = localStorage.getItem("secret-key");

    if (!userKey) {
      navigate("/Login");
    } else {
      const { username } = JSON.parse(userKey);
      setCurrUser(username);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUserSchedules = async () => {
      try {
        const response = await axios.get(
          `/Bgetuserschedule?currUser=${currUser}`
        );
        setSchedules(response.data.schedules);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    if (currUser) {
      fetchUserSchedules();
    }
  }, [currUser]);

  return (
    <div>
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="text-white text-lg font-semibold">
          Welcome {currUser}
        </div>
        <Logout />
      </nav>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Your Lectures</h1>
        {schedules.map((schedule, index) => (
          <div key={index} className="border rounded-md p-4 mb-4 schedule">
            <p className="text-lg font-semibold">Course: {schedule.course}</p>
            <p className="text-lg font-semibold">Lecture: {schedule.lecture}</p>
            <p className="text-gray-600">{schedule.date}</p>
            <p className="text-gray-600">Location: {schedule.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructor;
