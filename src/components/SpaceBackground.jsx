
import { useMemo } from "react";

function random(seed) {
  const x = Math.sin(seed * 127.1 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function Astronaut() {
  return (
    <div className="space-astronaut absolute right-[7%] top-[60%] opacity-80">
      <svg
        width="90"
        height="120"
        viewBox="0 0 90 120"
        fill="none"
        aria-label="Dancing astronaut in space"
        role="img"
      >
        {/* Backpack */}
        <rect x="22" y="45" width="46" height="43" rx="12" fill="#64748b" />

        {/* Legs */}
        <path
          d="M35 80 L25 104 M55 80 L67 103"
          stroke="#e2e8f0"
          strokeWidth="13"
          strokeLinecap="round"
        />

        {/* Arms */}
        <path
          d="M29 55 L12 36 M61 55 L78 32"
          stroke="#e2e8f0"
          strokeWidth="11"
          strokeLinecap="round"
        />

        {/* Body */}
        <rect x="28" y="42" width="34" height="45" rx="12" fill="#f8fafc" />
        <rect x="36" y="59" width="18" height="10" rx="4" fill="#159FE8" />

        {/* Helmet */}
        <circle cx="45" cy="28" r="25" fill="#f8fafc" />
        <ellipse cx="45" cy="29" rx="19" ry="17" fill="#10254a" />
        <path
          d="M32 22 Q45 12 57 22"
          stroke="#31D5E8"
          strokeWidth="3"
          opacity="0.8"
        />

        {/* Helmet highlight */}
        <circle cx="37" cy="23" r="4" fill="#ffffff" opacity="0.5" />

        {/* Boots */}
        <circle cx="23" cy="105" r="8" fill="#D54491" />
        <circle cx="69" cy="105" r="8" fill="#159FE8" />
      </svg>
    </div>
  );
}

export default function SpaceBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 450 }, (_, i) => ({
        id: i,
        left: random(i + 1) * 100,
        top: random(i + 300) * 100,
        size: 0.7 + random(i + 600) * 3,
        duration: 1.5 + random(i + 900) * 5,
        delay: -random(i + 1200) * 8,
        color:
          i % 17 === 0
            ? "#D54491"
            : i % 11 === 0
            ? "#159FE8"
            : i % 23 === 0
            ? "#B68AFF"
            : "#ffffff",
      })),
    []
  );

  const asteroids = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: random(i + 1800) * 100,
        top: random(i + 2000) * 100,
        size: 3 + random(i + 2200) * 9,
        delay: -random(i + 2400) * 30,
        duration: 18 + random(i + 2600) * 20,
      })),
    []
  );

  const meteors = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        id: i,
        left: 30 + random(i + 3000) * 70,
        top: random(i + 3200) * 80,
        delay: -random(i + 3400) * 20,
        duration: 8 + random(i + 3600) * 12,
        color:
          i % 3 === 0
            ? "#D54491"
            : i % 3 === 1
            ? "#159FE8"
            : "#FF9A44",
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

      {/* NEBULA GLOWS */}
      <div className="absolute -left-40 top-[10%] h-[500px] w-[500px] rounded-full bg-[#713C9B]/15 blur-[130px]" />

      <div className="absolute -right-40 top-[40%] h-[600px] w-[600px] rounded-full bg-[#159FE8]/10 blur-[150px]" />

      <div className="absolute bottom-[-200px] left-[25%] h-[500px] w-[500px] rounded-full bg-[#D54491]/10 blur-[140px]" />

      {/* DANCING STARS */}
      {stars.map((star) => (
        <span
          key={star.id}
          className="space-star absolute rounded-full"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            backgroundColor: star.color,
            boxShadow: `0 0 ${star.size * 5}px ${star.color}`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* ASTEROIDS */}
      {asteroids.map((asteroid) => (
        <span
          key={asteroid.id}
          className="space-asteroid absolute rounded-[40%] bg-slate-400/60"
          style={{
            left: `${asteroid.left}%`,
            top: `${asteroid.top}%`,
            width: asteroid.size,
            height: asteroid.size * 0.7,
            animationDuration: `${asteroid.duration}s`,
            animationDelay: `${asteroid.delay}s`,
          }}
        />
      ))}

      {/* COLORFUL METEORS */}
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className="space-meteor absolute"
          style={{
            left: `${meteor.left}%`,
            top: `${meteor.top}%`,
            "--meteor-color": meteor.color,
            animationDuration: `${meteor.duration}s`,
            animationDelay: `${meteor.delay}s`,
          }}
        />
      ))}

      {/* DANCING ASTRONAUT */}
      <Astronaut />
    </div>
  );
}
