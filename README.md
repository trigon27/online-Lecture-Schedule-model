
# Online-Lecture-Schedule-model

The Online-Lecture-Schedule-model is a web application developed to streamline the process of managing courses, scheduling lectures, and checking instructor availability. This system is designed to be user-friendly and efficient for both administrators and instructors.

## Features

- **Add Courses**: Administrators can add new courses to the system with details such as course name, level, description, and image.
- **View Courses**: Users can browse and view a list of available courses along with their details.
- **Schedule Lectures**: Instructors can schedule lectures for specific courses, providing information such as date, time, and location.
- **Check Instructor Availability**: Before scheduling a lecture, the system checks the availability of the instructor on the selected date.

## Technologies Used

- **Frontend**:
  - React.js
  - React Router
  - Axios
  - Tailwind CSS

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (using Mongoose)

## Installation

Follow these steps to set up and run the Course Management System locally:

1. **Clone the repository**:

   \`\`\`bash
   git clone <repository-url>
   cd course-management-system
   \`\`\`

2. **Install dependencies**:

 
   # Install frontend dependencies
   -cd frontend
   -npm install

   # Install backend dependencies
  - cd ../backend
  - npm install
   

3. **Set up environment variables**:

   Create a \`.env\` file in the \`backend\` directory and add the following variables:

  
   -PORT=4000
   -MONGODB_URI=<your-mongodb-uri>
   

4. **Start the backend server**:

   
   -cd backend
   -npm start
  

5. **Start the frontend development server**:

   
   -cd frontend
   -npm start
 

6. **Access the application**:

   Visit \`http://localhost:3000\` in your web browser to access the Course Management System.

