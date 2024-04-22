import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Register/Register';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define your routes */}
        <Route path="/register" element={<Register />} />
        {/* Add other routes */}
        {/* Redirect to /register */}
        <Route path="/" element={<Navigate to="/register" />} />
      </Routes>
    </Router>
  );
}

export default App;
