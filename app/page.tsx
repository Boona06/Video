"use client";

import { useRef, useState } from "react";

type VideoItem = {
  title: string;
  src: string;
};

type Section = {
  title: string;
  items?: VideoItem[];
  video?: VideoItem;
};

const VIDEO_BASE = "https://erchuudiindelguur.mn/videos";

const sections: Section[] = [
  {
    title: "Тавилт удаашруулагч цацлага",
    items: [
      {
        title: "HOT Brand",
        src: `${VIDEO_BASE}/spray-hot.mp4`,
      },
      {
        title: "Эрчүүдийн дэлгүүр",
        src: `${VIDEO_BASE}/spray-erchuud.mp4`,
      },
    ],
  },
  {
    title: "Тавилт удаашруулагч тос",
    items: [
      {
        title: "HOT Brand",
        src: `${VIDEO_BASE}/gel-hot.mp4`,
      },
      {
        title: "Эрчүүдийн дэлгүүр",
        src: `${VIDEO_BASE}/gel-erchuud.mp4`,
      },
    ],
  },
  {
    title: "Эмчилгээний тавилт удаашруулагч",
    items: [
      {
        title: "Аппарат",
        src: `${VIDEO_BASE}/prostate-apparat.mov`,
      },
      {
        title: "Памп",
        src: `${VIDEO_BASE}/prostate-pump.mp4`,
      },
    ],
  },
  {
    title: "Яагаад хурдан дур тавилт үүсдэг вэ?",
    video: {
      title: "Яагаад хурдан дур тавилт үүсдэг вэ?",
      src: `${VIDEO_BASE}/why-fast-finish.mp4`,
    },
  },
];

export default function HomePage() {
  const [openSection, setOpenSection] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSectionRef = useRef<HTMLElement>(null);

  const playVideo = (video: VideoItem) => {
    setActiveVideo(video);
    setOpenSection(null);

    setTimeout(() => {
      const player = videoRef.current;

      if (player) {
        player.muted = false;
        player.volume = 1;
        player.currentTime = 0;

        player.play().catch(() => {});
      }

      videoSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 120);
  };

  const handleSection = (section: Section, index: number) => {
    if (section.video) {
      playVideo(section.video);
      return;
    }

    setOpenSection(openSection === index ? null : index);
  };

  return (
    <main className="app-shell">
      <div className="page-container">
        <header className="page-header">
          <div className="eyebrow">ВИДЕО ЗААВАР</div>

          <h1>Тавилт удаашруулагч цацлага болон эмчилгээний бүтээгдэхүүнүүд</h1>

          <p>Доорх хэсгээс сонирхож буй заавраа сонгон бичлэгийг үзээрэй.</p>
        </header>

        <section className="guide-card">
          <div className="guide-heading">
            <span>Зааврын төрөл</span>
            <small>Сонголтоо дарж дэлгэрэнгүйг харна уу</small>
          </div>

          <div className="section-list">
            {sections.map((section, index) => {
              const isOpen = openSection === index;
              const hasDropdown = !!section.items;

              return (
                <div
                  key={section.title}
                  className={`guide-section ${isOpen ? "open" : ""}`}
                >
                  <button
                    type="button"
                    className="section-button"
                    onClick={() => handleSection(section, index)}
                    aria-expanded={hasDropdown ? isOpen : undefined}
                  >
                    <span className="section-number">{index + 1}</span>

                    <span className="section-text">
                      <strong>{section.title}</strong>

                      <small>
                        {hasDropdown ? "Сонголтуудыг харах" : "Бичлэг үзэх"}
                      </small>
                    </span>

                    <span className={`section-icon ${isOpen ? "rotate" : ""}`}>
                      {hasDropdown ? "⌄" : "▶"}
                    </span>
                  </button>

                  {hasDropdown && isOpen && (
                    <div className="section-options">
                      {section.items!.map((item) => (
                        <button
                          key={item.src}
                          type="button"
                          className={`sub-option ${
                            activeVideo?.src === item.src ? "active" : ""
                          }`}
                          onClick={() => playVideo(item)}
                        >
                          <span className="sub-play">▶</span>

                          <span className="sub-title">{item.title}</span>

                          <span className="sub-action">Үзэх</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {activeVideo && (
          <section ref={videoSectionRef} className="video-section">
            <div className="video-header">
              <div>
                <span className="video-label">ОДОО ҮЗЭЖ БАЙНА</span>

                <h2>{activeVideo.title}</h2>
              </div>
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

            <p className="video-note">
              Бичлэгийн дуу, хэмжээ болон бүтэн дэлгэцийн тохиргоог player-ээс
              удирдана.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
