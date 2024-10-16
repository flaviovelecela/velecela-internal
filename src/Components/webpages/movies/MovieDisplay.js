import React from 'react';
import { useParams } from 'react-router-dom';
import DynamicBitratePlayer from '../../DynamicBitratePlayer/DynamicBitratePlayer';

function MovieDisplay() {
  const { movieId } = useParams();  // Get movie ID from route (e.g., Howl's Moving Castle)
  
  // Path to the HLS master playlist for the movie (change this as necessary for different resolutions)
  const movieUrl = `/Movies/${encodeURIComponent(movieId)}/1080p/output.m3u8`;

  // Path to the subtitles file for the movie (WebVTT format)
  const subtitleUrl = `/Movies/${encodeURIComponent(movieId)}/Howl's Moving Castle Subtitles.vtt`;  // Subtitle file location

  return (
    <div>
      <h1>Now Playing: {movieId}</h1>
      <DynamicBitratePlayer
        videoSource={movieUrl}         // HLS master playlist
        subtitleSource={subtitleUrl}   // Subtitles file
      />
    </div>
  );
}

export default MovieDisplay;
