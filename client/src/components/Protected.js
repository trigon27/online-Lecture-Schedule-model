import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props) {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let login = localStorage.getItem("login");
    console.log("Login status:", login);
    if (!login) {
      navigate("/Login");
    } else {
      // Check if the user is an admin or not
      const isAdmin = login === "admin";

      if (isAdmin) {
        navigate("/Admin");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  return <Component />;
}

export default Protected;
