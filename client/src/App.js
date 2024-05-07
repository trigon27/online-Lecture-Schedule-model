import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Admin from "./components/Admin";
import Instructor from "./components/Instructor";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/Login" element={<Login></Login>} />
        <Route exact path="/Register" element={<Registration></Registration>} />
        <Route exact path="/Admin" element={<Admin></Admin>} />
        <Route exact path="/Instructor" element={<Instructor></Instructor>} />
      </Routes>
    </div>
  );
}

export default App;
