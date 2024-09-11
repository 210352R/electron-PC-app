import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TodoForm from './pages/forms/AddTask';
import ImageUploader from './pages/image_upload/ImageUploader';
import LoginForm from './pages/auth/LoginForm';
function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/addTask">Add Task</Link>
            </li>
            <li>
              <Link to="/imageUpload">Add Image</Link>
            </li>
          </ul>
        </nav> */}

        {/* Define routes here */}
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/addTask" element={<TodoForm />} />
          <Route path="/imageUpload" element={<ImageUploader />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
