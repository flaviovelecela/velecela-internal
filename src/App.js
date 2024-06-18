import './App.css';

import LandingPage from './Components/landing-page/landing-page';
import Navbar from './Components/navigation-page/navigation';
import TestPage from './Components/webpages/test/test';
import PhotoGallery from './Components/webpages/gallery/photo-gallery';
import Login from './Components/webpages/login/login';
// import Register from './Components/webpages/login/register';
import UserPage from './Components/webpages/user/home';
import PrivateRoute from './Components/Routing/privateroutes'; // Make sure this path is correct

import { AuthProvider } from './Components/Context/AuthContext';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path='*' element={<LandingPage />} />
            <Route path='/' element={<LandingPage />} />
            <Route path='/test' element={<TestPage />} />
            <Route path='/gallery' element={<PhotoGallery />} />
            <Route path='/login' element={<Login />} />
            {/* <Route path='/register' element={<Register />} /> */}
            <Route element={<PrivateRoute />}>
              <Route path='/userPage' element={<UserPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
