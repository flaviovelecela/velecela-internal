import './App.css';

import LandingPage from './Components/webpages/home-page/landing-page';
import Navbar from './Components/navigation-page/navigation';
import Calculator from './Components/webpages/test/calculator';
import PhotoGallery from './Components/webpages/gallery/photo-gallery';
import Login from './Components/webpages/login/login';
// import Register from './Components/webpages/login/register';


//Authentication
import PrivateRoute from './Components/Routing/privateroutes';
import { AuthProvider } from './Components/Context/AuthContext';

//Movie Display
import MoviePlayer from './Components/webpages/user/MoviePlayer';
import MovieDisplay from './Components/webpages/movies/MovieDisplay';

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
            <Route path='/calculator' element={<Calculator />} />
            <Route path='/gallery' element={<PhotoGallery />} />
            <Route path='/login' element={<Login />} />
            {/* <Route path='/register' element={<Register />} /> */}
            <Route element={<PrivateRoute />}>
              <Route path='/movies' element={<MoviePlayer />} />
              <Route path='/movies/:movieId' element={<MovieDisplay/>} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
