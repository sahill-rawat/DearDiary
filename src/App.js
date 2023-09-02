import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Header from "./components/Header";
import Diary from "./components/Diary";
import EditDiaryEntry from "./components/EditDiaryEntry";
import Read from "./components/Read";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div>
        <Toaster position="top-right" />
      </div>
      <Router>
        <Header />
        <Routes>
          <Route path='/diary' element={<Diary/>}/>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/read" element={<Read/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/edit' element={<EditDiaryEntry/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
