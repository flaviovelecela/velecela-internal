import './App.css'

import LandingPage from './Components/landing-page/landing-page';
import Navbar from './Components/navigation-page/navigation-page';
import TestPage from './Components/test/test';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='*' element={<LandingPage />} />
          <Route path='/' exact={true} element={<LandingPage />} />
          <Route path='test' exact={true} element={<TestPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;