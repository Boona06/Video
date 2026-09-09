"use client";

import { useRef, useState } from "react";

const videos = ["/video.mp4", "/video2.mp4", "/video3.mp4"];

export default function HomePage() {
  const [active, setActive] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const selectVideo = (index: number) => {
    setActive(index);

    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.src = videos[index];
    video.load();
    video.muted = false;
    video.defaultMuted = false;
    video.volume = 1;
  };

  return (
    <main className="app-shell">
      <section className="choice-panel">
        <header className="title-bar">
          <span className="brand">Линкбичлэг</span>
        </header>

        <div className="tool-group">
          {videos.map((_, index) => (
            <button
              key={index}
              className={`tool-button ${active === index ? "active" : ""}`}
              onClick={() => selectVideo(index)}
            >
              Сонголт {index + 1}
            </button>
          ))}
        </div>

        <section className="video-wrap">
          <video
            ref={videoRef}
            className="video-frame"
            src={videos[active]}
            controls
            playsInline
            preload="auto"
            muted={false}
          />
        </section>
      </section>
    </main>
  );
}
