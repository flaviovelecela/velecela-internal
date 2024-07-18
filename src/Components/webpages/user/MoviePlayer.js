import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MoviePlayer.css';

function MoviePlayer() {
  const navigate = useNavigate();
  const movies = {
    //NEED TO CHANGE OUTPUT FILE NAMES TO BE THE SAME
    'Dune': '/Movies/Dune/1080p/output.m3u8',
    'Migration': '/Movies/Migration/1080p/output.m3u8',
    'LaLaLand': '/Movies/LaLaLand/1080p/output.m3u8',
    // More movies can be added here
  };

  const handleMovieSelection = (movieKey) => {
    // Navigate to the movies page with the selected movie key
    navigate(`/movies/${movieKey}`);
  };

  return (
    <div className="container">
      <h1>Select a Movie</h1>
      <div className="movie-grid">
        {Object.keys(movies).map(movie => (
          <div key={movie} className="movie-card" onClick={() => handleMovieSelection(movie)}>
            <div className="movie-title">{movie}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviePlayer;
