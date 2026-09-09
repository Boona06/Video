"use client";

import { useRef, useState } from "react";

const videos = [
  {
    title: "Багц сет хэрэглэх заавар",
    description: "Багцын бүтээгдэхүүнүүдийг хэрхэн зөв дарааллаар хэрэглэх",
    src: "/video.mp4",
  },
  {
    title: "Тос түрхэх заавар",
    description: "Тосыг хэрхэн зөв түрхэж хэрэглэх",
    src: "/video2.mp4",
  },
  {
    title: "Нэмэлт заавар",
    description: "Нэмэлт мэдээлэл болон хэрэглэх зөвлөмж",
    src: "/video3.mp4",
  },
];

export default function HomePage() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const selectVideo = (index: number) => {
    setActive(index);
    setOpen(false);

    const video = videoRef.current;

    if (!video) return;

    video.pause();
    video.src = videos[index].src;
    video.load();

    video.muted = false;
    video.defaultMuted = false;
    video.volume = 1;
  };

  return (
    <main className="app-shell">
      <section className="choice-panel">
        <header className="page-header">
          <div className="header-badge">ХЭРЭГЛЭХ ЗААВАР</div>

          <h1>Шодой томруулах багц</h1>

          <p>Доорх заавраас сонгоод бичлэгийг үзнэ үү</p>
        </header>

        <div className="select-label">Заавар сонгох</div>

        <div className="dropdown">
          <button
            type="button"
            className={`dropdown-button ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
          >
            <div className="selected-content">
              <span className="selected-number">{active + 1}</span>

              <div>
                <span className="selected-title">{videos[active].title}</span>

                <span className="selected-description">
                  {videos[active].description}
                </span>
              </div>
            </div>

            <span className={`dropdown-arrow ${open ? "rotate" : ""}`}>▼</span>
          </button>

          {open && (
            <div className="dropdown-menu">
              {videos.map((video, index) => (
                <button
                  key={index}
                  type="button"
                  className={`dropdown-item ${
                    active === index ? "active" : ""
                  }`}
                  onClick={() => selectVideo(index)}
                >
                  <span className="item-number">{index + 1}</span>

                  <div className="item-info">
                    <span className="item-title">{video.title}</span>

                    <span className="item-description">
                      {video.description}
                    </span>
                  </div>

                  {active === index && <span className="check">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="now-watching">
          <span>Одоо үзэж буй заавар</span>

          <strong>{videos[active].title}</strong>
        </div>

        <section className="video-wrap">
          <video
            ref={videoRef}
            key={videos[active].src}
            className="video-frame"
            src={videos[active].src}
            controls
            playsInline
            preload="metadata"
            muted={false}
          />
        </section>

        <p className="video-help">▶ Бичлэг дээр дарж тоглуулна уу</p>
      </section>
    </main>
  );
}
