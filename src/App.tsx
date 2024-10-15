import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Photos from './pages/Photos';
import DetailPhoto from './components/DetailPhoto';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/photos" />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/photos/:id" element={<DetailPhoto />} />
      </Routes>
    </Router>
  );
}

export default App
