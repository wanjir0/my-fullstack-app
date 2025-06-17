import PatientForm from "./PatientForm.jsx";
import Home from "./Home.jsx";
import "./App.css";
import { ToastContainer } from "react-toastify";
import {BrowserRouter as Router , Routes, Route} from "react-router-dom";

function App() {
  
return (  
    <Router>
      <Routes>
     <Route path="/"element={<Home/>} />
     <Route path="/register"element={<PatientForm/>}/>
    </Routes>
     <ToastContainer />
      <ToastContainer position="top-right" autoClose={3000}/>
    </Router>
  )
}

export default App;
