import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import SubmitReport from './Components/SubmitReport';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/EMP-dashboard" element={<Dashboard />} />
        <Route path="/submit" element={<SubmitReport />} />
      </Routes>
    </Router>
  );
}

export default App;
