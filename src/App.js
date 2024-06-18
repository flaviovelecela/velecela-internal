import './App.css';

import LandingPage from './Components/landing-page/landing-page';
import Navbar from './Components/navigation-page/navigation';
import TestPage from './Components/webpages/test/test';
import PhotoGallery from './Components/webpages/gallery/photo-gallery';
import Login from './Components/webpages/login/login';
import Register from './Components/webpages/login/register';
import userPage from './Components/webpages/user/home';

import { AuthProvider } from './Context/AuthContext'; // Ensure the path is correct

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider> {/* Wrap the components inside Router with AuthProvider */}
          <Navbar />
          <Routes>
            <Route path='*' element={<LandingPage />} />
            <Route path='/' element={<LandingPage />} /> {/* Removed exact as it's unnecessary in React Router v6 */}
            <Route path='/test' element={<TestPage />} />
            <Route path='/gallery' element={<PhotoGallery />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='userPage' element={<userPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
