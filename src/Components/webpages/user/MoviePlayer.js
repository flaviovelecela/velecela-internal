import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MoviePlayer.css';

function MoviePlayer() {
  const navigate = useNavigate();
  const movies = {
    'Dune (2021)': '/Movies/Dune (2021)/master.m3u8',
    'Dune 2 (2024)':'/Movies/Dune 2 (2024)/master.m3u8',
    'Migration': '/Movies/Migration/master.m3u8',
    'LaLaLand': '/Movies/LaLaLand/master.m3u8',
    'The Greatest Showman': '/Movies/The Greatest Showman/master.m3u8',
    'Wonka': '/Movies/Wonka/master.m3u8',
    'Oppenheimer': '/Movies/Oppenheimer/master.m3u8',
    'Howl\'s Moving Castle': '/Movies/Howl\'s Moving Castle/master.m3u8',
    // More movies can be added here
  }; 

  const handleMovieSelection = (movieKey) => {
    // Navigate to the movie display page with the selected movie key
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
