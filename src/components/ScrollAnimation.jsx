
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 150; // Change to your actual count

function getFramePath(index) {
  const number = String(index + 1).padStart(4, "0");
  return `/frames/frame_${number}.webp`;
}

export default function ScrollAnimation() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const images = new Array(FRAME_COUNT);
    const playhead = { frame: 0 };

    let disposed = false;
    let rafId = null;

    function drawFrame(index) {
      const image = images[index];
      if (!image || !image.complete || !image.naturalWidth) {
        return;
      }

      const width = canvas.width;
      const height = canvas.height;

      // Cover the canvas without stretching the image
      const scale = Math.max(
        width / image.naturalWidth,
        height / image.naturalHeight
      );

      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;

      context.clearRect(0, 0, width, height);
      context.drawImage(
        image,
        (width - drawWidth) / 2,
        (height - drawHeight) / 2,
        drawWidth,
        drawHeight
      );
    }

    function render() {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        drawFrame(Math.round(playhead.frame));
      });
    }

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * ratio);
      canvas.height = Math.round(window.innerHeight * ratio);
      render();
    }

    // Preload frames
    for (let i = 0; i < FRAME_COUNT; i++) {
      const image = new Image();
      images[i] = image;
      image.onload = () => {
        if (!disposed && Math.round(playhead.frame) === i) {
          render();
        }
      };
      image.src = getFramePath(i);
    }

    resize();
    window.addEventListener("resize", resize);

    // Connect scroll position to the frame number
    const tween = gsap.to(playhead, {
      frame: FRAME_COUNT - 1,
      ease: "none",
      snap: "frame",
      onUpdate: render,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=3000",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      disposed = true;
      tween.scrollTrigger?.kill();
      tween.kill();
      window.removeEventListener("resize", resize);
      if (rafId !== null) cancelAnimationFrame(rafId);
      images.forEach((image) => {
        if (image) image.onload = null;
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-label="Animated cinematic space scene"
        role="img"
      />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <h1 className="px-6 text-center text-4xl font-bold text-white drop-shadow-lg md:text-7xl">
          EXPLORE THE UNIVERSE
        </h1>
      </div>
    </section>
  );
}
