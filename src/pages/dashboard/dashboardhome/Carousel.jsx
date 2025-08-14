import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../../../css/carousel.css";

function Carousel() {
    const [isMuted, setIsMuted] = useState(true);
    const [loadingStates, setLoadingStates] = useState([true, true]); // loading per video
    const carouselRef = useRef(null);

    const handleMuteToggle = () => {
        const activeVideo = carouselRef.current?.querySelector(".carousel-item.active video");
        if (activeVideo) {
            activeVideo.muted = !activeVideo.muted;
            setIsMuted(activeVideo.muted);
        }
    };

    // Smart preview on scroll
    useEffect(() => {
        const carouselEl = carouselRef.current;
        const observerOptions = { root: null, threshold: 0.5 };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                const video = entry.target.querySelector("video");
                if (video) {
                    if (entry.isIntersecting) {
                        video.muted = isMuted;
                        video.play().catch(() => {});
                    } else {
                        video.pause();
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const slides = carouselEl.querySelectorAll(".carousel-item");
        slides.forEach((slide) => observer.observe(slide));

        return () => observer.disconnect();
    }, [isMuted]);

    // Reset video on slide change
    useEffect(() => {
        const carouselEl = carouselRef.current;

        const handleSlide = () => {
            const videos = carouselEl.querySelectorAll("video");

            videos.forEach((video) => {
                video.pause();
                video.currentTime = 0;

                if (video.dataset.timeout) {
                    clearTimeout(video.dataset.timeout);
                    delete video.dataset.timeout;
                }
            });

            const activeVideo = carouselEl.querySelector(".carousel-item.active video");
            if (activeVideo) {
                activeVideo.muted = isMuted;
                activeVideo.play().catch(() => {});
                const timeout = setTimeout(() => {
                    activeVideo.pause();
                }, 30000);
                activeVideo.dataset.timeout = timeout;
            }
        };

        carouselEl.addEventListener("slid.bs.carousel", handleSlide);
        return () => carouselEl.removeEventListener("slid.bs.carousel", handleSlide);
    }, [isMuted]);

    const handleVideoLoad = (index) => {
        setLoadingStates((prev) => {
            const updated = [...prev];
            updated[index] = false;
            return updated;
        });
    };

    return (
        <div
            id="filmCarousel"
            className="carousel slide w-100 full-carousel"
            data-bs-ride="carousel"
            data-bs-interval="8000"
            ref={carouselRef}
        >
            <div className="carousel-inner carousel-inner-custom">

                {/* Slide 1 */}
                <div className="carousel-item active position-relative">
                    {loadingStates[0] && <div className="carousel-loader"></div>}
                    <video
                        className="d-block w-100"
                        src="/videos/yowes-ben-finale.mp4"
                        poster="/poster/duty-after-school.png"
                        muted
                        playsInline
                        preload="none"
                        onCanPlay={() => handleVideoLoad(0)}
                    />
                    <button
                        onClick={handleMuteToggle}
                        className="btn btn-sm btn-light position-absolute carousel-mute-button"
                        style={{ bottom: '20px', right: '20px', zIndex: 10 }}
                    >
                        <i className={`bi ${isMuted ? 'bi-volume-mute' : 'bi-volume-up'}`}></i>
                    </button>
                    <div className="carousel-caption">
                        <h2>Yowis Ben Finale</h2>
                        <p className="mt-2">
                            Setelah perjalanan panjang, Yowis Ben akhirnya mencapai puncaknya. Saksikan bagaimana mereka mengatasi rintangan terakhir untuk meraih impian mereka.
                        </p>
                        <div className="d-flex justify-content-start gap-3">
                            <Link href="#" className="btn btn-custom text-white fw-semibold rounded-pill">
                                Mulai
                            </Link>
                            <Link href="#" className="btn btn-custom-more text-white fw-semibold rounded-pill">
                                <i class="bi bi-info-circle"> Selengkapnya </i>
                            </Link>
                            <span className="badge-18plus mt-3">18+</span>
                        </div>
                    </div>
                </div>

                {/* Slide 2 */}
                <div className="carousel-item position-relative">
                    {loadingStates[1] && <div className="carousel-loader"></div>}
                    <video
                        className="d-block w-100"
                        src="/videos/video2.mp4"
                        poster="/images/poster2.jpg"
                        muted
                        playsInline
                        preload="none"
                        onCanPlay={() => handleVideoLoad(1)}
                    />
                    <button
                        onClick={handleMuteToggle}
                        className="btn btn-sm btn-light position-absolute carousel-mute-button"
                        style={{ bottom: '20px', right: '20px', zIndex: 10 }}
                    >
                        <i className={`bi ${isMuted ? 'bi-volume-mute' : 'bi-volume-up'}`}></i>
                    </button>
                    <div className="carousel-caption">
                        <h6>Chapter: 102</h6>
                        <h2>The Last Hunter</h2>
                        <p className="mt-2">
                            Setelah perburuan besar yang gagal, sang pemburu terakhir harus menghadapi ancaman dari dunia bawah yang gelap dan penuh misteri.
                        </p>
                        <div className="d-flex justify-content-start gap-3">
                            <Link href="#" className="btn btn-custom text-white fw-semibold rounded-pill">
                                Mulai
                            </Link>
                            <Link href="#" className="btn btn-custom-more text-white fw-semibold rounded-pill">
                                <i class="bi bi-info-circle"> Selengkapnya </i>
                            </Link>
                            <span className="badge-18plus mt-3">18+</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Indicators */}
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#filmCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#filmCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            </div>

            {/* Controls */}
            <button className="carousel-control-prev" type="button" data-bs-target="#filmCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#filmCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carousel;
