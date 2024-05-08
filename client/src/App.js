import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Admin from "./Admin/Admin";
import Instructor from "./components/Instructor";
import Protected from "./components/Protected";
import SingleCourse from "./Admin/SingleCourse";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Protected Component={Instructor} />} />
        <Route exact path="/Login" element={<Login></Login>} />
        <Route exact path="/Register" element={<Registration></Registration>} />
        <Route
          exact
          path="/SingleCourse/:courseId"
          element={<SingleCourse></SingleCourse>}
        />
        <Route exact path="/Admin" element={<Protected Component={Admin} />} />
      </Routes>
    </div>
  );
}

export default App;
