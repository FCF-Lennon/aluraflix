import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NuevoVideo from './pages/NuevoVideo';
// import Placeholder from './pages/Placeholder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nuevo-video" element={<NuevoVideo />} />  {/* Ruta en standby */}
      </Routes>
    </Router>
  );
}

export default App;