import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

function UserPage() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource('/Videos/DUNE/1080p/output.m3u8');
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = '/Videos/DUNE/1080p/output.m3u8';
      }
    }

    return () => {
      // Clean up Hls.js if used
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', margin: '50px' }}>
      <h1>User Page</h1>
      <div style={{ margin: 'auto', maxWidth: '800px' }}>
        <video ref={videoRef} controls />
      </div>
    </div>
  );
}

export default UserPage;
