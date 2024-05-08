import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the authentication state
    localStorage.removeItem("login");
    // Redirect to the login page
    navigate("/Login");
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
