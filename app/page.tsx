"use client";

import { useRef, useState } from "react";

const videos = [
  {
    title: "Тавилт удаашруулах цацлага",
    src: "/video1.mp4",
  },
  {
    title: "Түрүү булчирхайн эмчилгээний аппарат",
    src: "/video2.mp4",
  },
  {
    title: "Яагаад хурдан дур тавилт үүсдэг вэ?",
    src: "/video3.mp4",
  },
];

export default function HomePage() {
  const [active, setActive] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const selectVideo = (index: number) => {
    setActive(index);

    setTimeout(() => {
      const video = videoRef.current;

      if (!video) return;

      video.muted = false;
      video.defaultMuted = false;
      video.volume = 1;
      video.currentTime = 0;

      video.play().catch((error) => {
        console.log("Video autoplay error:", error);
      });
    }, 50);
  };

  return (
    <main className="app-shell">
      <section className="choice-panel">
        <header className="page-header">
          <span className="eyebrow">ВИДЕО ЗААВАР</span>

          <h1>Хэрэгтэй мэдээллээ сонгоно уу</h1>

          <p>Доорх сонголтоос нэгийг дарж бичлэгийг үзнэ үү</p>
        </header>

        <div className="video-options">
          {videos.map((video, index) => (
            <button
              key={video.src}
              type="button"
              className={`video-option ${active === index ? "active" : ""}`}
              onClick={() => selectVideo(index)}
            >
              <span className="option-number">{index + 1}</span>

              <span className="option-title">{video.title}</span>

              <span className="option-play">▶</span>
            </button>
          ))}
        </div>

        {active !== null && (
          <section className="video-section">
            <div className="video-title">
              <span>Одоо үзэж байна</span>
              <h2>{videos[active].title}</h2>
            </div>

            <div className="video-wrap">
              <video
                ref={videoRef}
                key={videos[active].src}
                className="video-frame"
                src={videos[active].src}
                controls
                playsInline
                preload="auto"
              />
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
