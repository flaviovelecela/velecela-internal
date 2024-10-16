import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

function DynamicBitratePlayer({ videoSource, subtitleSource }) {
  const videoRef = useRef(null);  // Video element ref
  const playerRef = useRef(null); // Video.js player ref

  useEffect(() => {
    const initializePlayer = () => {
      if (videoRef.current && !playerRef.current) {
        // Initialize Video.js player
        playerRef.current = videojs(videoRef.current, {
          autoplay: false,
          controls: true,
          sources: [{
            src: videoSource,  // HLS video playlist
            type: 'application/x-mpegURL',
          }],
          responsive: true,
          fluid: true, // Make player responsive
        });

        // Force add subtitle track directly
        playerRef.current.ready(() => {
          playerRef.current.addRemoteTextTrack({
            kind: 'subtitles',
            src: subtitleSource,  // Path to the .vtt subtitle file
            srclang: 'en',
            label: 'English Subtitles',
            default: false,
          }, false);

          console.log("Subtitles added to the player.");
        });
      }
    };

    // Initialize the player after DOM has been rendered
    requestAnimationFrame(() => {
      initializePlayer();
    });

    // Clean up the player on unmount
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [videoSource, subtitleSource]);

  return (
    <div>
      <video
        ref={videoRef}
        className="video-js vjs-default-skin vjs-big-play-centered"
        controls
        style={{ width: '100%' }}
      />
    </div>
  );
}

export default DynamicBitratePlayer;
