import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { signOut } from 'firebase/auth'; // Ensure this import works after fixing Firebase setup
import { auth } from '../Firebase/firebase-config';

function Navigation() {
  const { currentUser } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("You have successfully signed out.");
    } catch (error) {
      console.error("Sign Out Error:", error);
      alert("Failed to sign out.");
    }
  };

  const handleDisabledClick = (event) => {
    if (!currentUser) {
      event.preventDefault();
      alert("You need to be logged in to access this.");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">VELECELA</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              {currentUser ? (
                <button className="nav-link btn btn-link" onClick={handleSignOut}>Sign Out</button>
              ) : (
                <Link className="nav-link" to="/login">Login</Link>
              )}
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="#">Action</Link></li>
                <li><Link className="dropdown-item" to="/calculator">Calculator</Link></li>
                <li><hr className="dropdown-divider"></hr></li>
                <li><Link className="dropdown-item" to="/gallery">Photo Gallery</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${!currentUser ? 'disabled' : ''}`} onClick={handleDisabledClick} to="/movies">
                {currentUser ? 'Movies' : 'Disabled'}
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
