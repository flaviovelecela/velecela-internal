import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Hls from 'hls.js';

function MovieDisplay() {
  const { movieId } = useParams();
  const videoRef = useRef(null);
  const movieUrl = `/Movies/${movieId}/1080p/output.m3u8`; // Construct the video URL based on movieId

  useEffect(() => {
    if (videoRef.current && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(movieUrl);
      hls.attachMedia(videoRef.current);
      return () => hls.destroy();
    }
  }, [movieUrl]);

  return (
    <div>
      <h1>Now Playing: {movieId}</h1>
      <video ref={videoRef} controls style={{ width: '100%' }} />
    </div>
  );
}

export default MovieDisplay;
