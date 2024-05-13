import './App.css'

import LandingPage from './Components/landing-page/landing-page';
import Navbar from './Components/navigation-page/navigation';
import TestPage from './Components/webpages/test/test';

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
          <Route path='/test' element={<TestPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;