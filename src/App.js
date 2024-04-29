import './App.css'

import HomePage from './Components/landing-page/landing-page';
import Navbar from './Components/navigation-page/navigation-page';

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
          <Route path='*' element={<HomePage />} />
          <Route path='/' exact={true} element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;