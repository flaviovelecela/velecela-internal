import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import './SkydivingSection.css';

function SkydivingSection() {
    const videoRefs = useRef([]);

    const videoSources = [
        "/Videos/Skydiving_July_9_2024/flavio_jr/master_playlist.m3u8",
        "/Videos/Skydiving_July_9_2024/flavio_sr/master_playlist.m3u8",
        "/Videos/Skydiving_July_9_2024/rafael/master_playlist.m3u8"
    ];

    useEffect(() => {
        const hlsInstances = videoRefs.current.map((video, index) => {
            if (video && Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(videoSources[index]);
                hls.attachMedia(video);

                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    // Log level details
                    console.log(`Initial level loaded for video ${index}:`, hls.levels[hls.firstLevel]);
                    // Try forcing the level to 1080p on manifest parsed
                    const levelIndex1080p = hls.levels.findIndex(level => level.height === 1080);
                    if (levelIndex1080p !== -1) {
                        hls.currentLevel = levelIndex1080p;
                        console.log(`Forced level to 1080p for video ${index}:`, hls.levels[levelIndex1080p]);
                    }
                    // Confirm current level after setting
                    console.log(`Current level after setting for video ${index}:`, hls.currentLevel, hls.levels[hls.currentLevel]);
                });

                return hls;
            }
            return null;
        });

        return () => {
            hlsInstances.forEach(hls => {
                if (hls) {
                    hls.destroy();
                }
            });
        };
    }, []); // No dependencies, run once on mount

    return (
        <div className="skydiving-container">
            <h2 className="skydiving-title">Skydiving Time!</h2>
            <div className="video-container">
                {videoSources.map((source, index) => (
                    <video key={index} ref={el => videoRefs.current[index] = el} controls style={{ width: '32%', margin: '1%' }} />
                ))}
            </div>
        </div>
    );
}

export default SkydivingSection;
