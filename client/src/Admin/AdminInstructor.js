import React, { useEffect, useState } from "react";

function AdminInstructor() {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    // Fetch instructor data from the backend
    fetch("http://localhost:4000/Busers")
      .then((response) => response.json())
      .then((data) => setInstructors(data))
      .catch((error) => console.error("Error fetching instructors:", error));
  }, []);
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {instructors.map((instructor, index) => (
        <li key={index} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {instructor.userName}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {instructor.email}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default AdminInstructor;
