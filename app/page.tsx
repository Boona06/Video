"use client";

import { useRef, useState } from "react";

const groups = [
  {
    title: "Хэрхэн Багц сетийг зөв хэрэглэх вэ ? ",
    items: [
      {
        title: "Эхний 7 хоног хэрэглэх заавар",
        src: "/video1.mp4",
      },
      {
        title: "8 дахь хоногоос хэрэглэх заавар",
        src: "/video2.mp4",
      },
    ],
  },
  {
    title: "Тосыг хэрхэн зөв хэрэглэх вэ ?",
    items: [
      {
        title: "Алтан тос түрхэх заавар",
        src: "/video3.mp4",
      },
      {
        title: "Улаан тос түрхэх заавар",
        src: "/video4.mp4",
      },
    ],
  },
];

type VideoItem = {
  title: string;
  src: string;
};

export default function HomePage() {
  const [openGroup, setOpenGroup] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const selectVideo = (item: VideoItem) => {
    setActiveVideo(item);
    setOpenGroup(null);

    setTimeout(() => {
      const video = videoRef.current;

      if (!video) return;

      video.muted = false;
      video.defaultMuted = false;
      video.volume = 1;
    }, 0);
  };

  return (
    <main className="app-shell">
      <section className="choice-panel">
        <header className="page-header">
          <span className="eyebrow">ХЭРЭГЛЭХ ЗААВАР</span>

          <h1>Шодой томруулах багц</h1>

          <p>Доорх хэсгээс хэрэгтэй заавраа сонгоно уу</p>
        </header>

        <div className="instruction-groups">
          {groups.map((group, groupIndex) => {
            const isOpen = openGroup === groupIndex;

            return (
              <div
                key={group.title}
                className={`instruction-group ${isOpen ? "open" : ""}`}
              >
                <button
                  type="button"
                  className="group-button"
                  onClick={() => setOpenGroup(isOpen ? null : groupIndex)}
                >
                  <div className="group-left">
                    <span className="group-index">{groupIndex + 1}</span>

                    <div>
                      <strong>{group.title}</strong>
                    </div>
                  </div>

                  <span className={`chevron ${isOpen ? "rotate" : ""}`}>⌄</span>
                </button>

                {isOpen && (
                  <div className="group-menu">
                    {group.items.map((item, index) => (
                      <button
                        type="button"
                        key={item.src}
                        className={`instruction-item ${
                          activeVideo?.src === item.src ? "active" : ""
                        }`}
                        onClick={() => selectVideo(item)}
                      >
                        <span className="item-number">{index + 1}</span>

                        <span className="item-title">{item.title}</span>

                        <span className="play-icon">▶</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!activeVideo && (
          <div className="empty-state">
            <div className="empty-icon">▶</div>

            <strong>Бичлэг сонгоогүй байна</strong>

            <span>Дээрх зааврын хэсгээс бичлэгээ сонгоно уу</span>
          </div>
        )}

        {activeVideo && (
          <section className="video-section">
            <div className="video-heading">
              <span>Сонгосон заавар</span>
              <h2>{activeVideo.title}</h2>
            </div>

            <div className="video-wrap">
              <video
                ref={videoRef}
                key={activeVideo.src}
                className="video-frame"
                src={activeVideo.src}
                controls
                playsInline
                preload="metadata"
              />
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
