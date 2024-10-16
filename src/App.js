import './App.css';
import LandingPage from './Components/webpages/home-page/landing-page';
import Navbar from './Components/navigation-page/navigation';
import Calculator from './Components/webpages/test/calculator';
import PhotoGallery from './Components/webpages/gallery/photo-gallery';
import Login from './Components/webpages/login/login';
import AdminPanel from './Components/webpages/admin/adminpanel';
import PrivateRoute from './Components/Routing/privateroutes';
import { AuthProvider } from './Components/Context/AuthContext';
import MoviePlayer from './Components/webpages/user/MoviePlayer';
import MovieDisplay from './Components/webpages/movies/MovieDisplay';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatbotWrapper from './Components/webpages/ai/ChatbotWrapper';

function App() {
  return (
    <AuthProvider> {/* Wrap the entire app in AuthProvider */}
      <Router>
        <Navbar />

        {/* The ChatbotWrapper will check internally for the AIChat role */}
        <ChatbotWrapper />

        <Routes>
          {/* Public routes */}
          <Route path='*' element={<LandingPage />} />
          <Route path='/' element={<LandingPage />} />
          <Route path='/calculator' element={<Calculator />} />
          <Route path='/gallery' element={<PhotoGallery />} />
          <Route path='/login' element={<Login />} />

          {/* Protected routes */}
          <Route element={<PrivateRoute requiredRole="movie"/>}>
            <Route path='/movies' element={<MoviePlayer />} />
            <Route path='/movies/:movieId' element={<MovieDisplay />} />
          </Route>

          {/* Admin protected route */}
          <Route element={<PrivateRoute requiredRole="admin" />}>
            <Route path='/admin' element={<AdminPanel />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
