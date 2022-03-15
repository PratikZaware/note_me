import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './Components/Navbar';
import { Home } from './Components/Home';
import About from './Components/About';
import NoteState from "./Context/notes/NoteState";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          {/* <Alert/> */}
          <div className="container mt-5">
            <Routes>
              <Route path='/' element={<Home />} />

              <Route path='/about' element={<About />} />

              <Route path='/login' element={<Login/>} />

              <Route path='/signup' element={<Signup/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>

  );
}

export default App;
