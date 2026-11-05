
import { useEffect, useState } from "react";
import Earth from "./components/Earth";
import SpaceBackground from "./components/SpaceBackground";

// =====================================================
// CONFIGURATION
// =====================================================

// Copy this from Google Apps Script:
// Deploy -> Manage deployments -> Web app -> URL -> Copy

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxpnPWcHjtqQ7n33FrKgZH199-JJaZesc9OB1j4dPQPf-C3lIBy-1vqYNu1eX1stCNKIA/exec";

const EVENT_DATE = "2026-12-19T08:00:00+01:00";
const links = [
  { name: "Home", href: "#home", id: "home" },
  { name: "Events", href: "#agenda", id: "agenda" },
  { name: "About Us", href: "#about", id: "about" },
  { name: "Contacts", href: "#contact", id: "contact" },
];

const agenda = [
  {
    time: "08:00 – 08:30",
    title: "Participant Check-in & Registration",
    detail: "Welcome and registration of participants",
  },
  {
    time: "08:30 – 09:00",
    title: "Opening Ceremony",
    detail: "Official opening of AstroXCamp 2026",
  },
  {
    time: "09:00 – 12:00",
    title: "Astronomy & Emerging Tech Conferences",
    detail: "Conferences on space science and emerging technologies",
  },
  {
    time: "12:00 – 13:00",
    title: "Lunch Break & Networking",
    detail: "Lunch and networking session",
  },
  {
    time: "13:00 – 16:00",
    title: "Astronomy X Technology Workshops",
    detail: "Hands-on Python, Data Science, and AI workshops",
  },
  {
    time: "16:00 – 17:00",
    title: "Coffee Break & Interactive Demo Stands",
    detail: "Explore demonstrations and interactive stands",
  },
  {
    time: "17:00 – 17:30",
    title: "Closing Ceremony & Awarding",
    detail: "Closing ceremony and awards",
  },
  {
    time: "17:30 – 19:00",
    title: "Night Stargazing Session",
    detail: "Astronomical observation session",
  },
];

// =====================================================
// LOGO
// =====================================================

function AstroLogo() {
  return (
    <img
      src="/images/astro-logo.png"
      alt="AstroXCamp 2026"
      className="h-14 w-auto object-contain md:h-16"
    />
  );
}

// =====================================================
// NAVBAR
// =====================================================


function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-t-2 border-pink-500 bg-[#141C33]/95 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-20 max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <a href="#home" className="text-xl font-black text-white">
          ASTRO<span className="text-pink-400">XCAMP</span>
        </a>

        <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-white">
          <a href="#home" className="hover:text-pink-400">HOME</a>
          <a href="#agenda" className="hover:text-pink-400">EVENTS</a>
          <a href="#about" className="hover:text-pink-400">ABOUT US</a>
          <a href="#contact" className="hover:text-pink-400">CONTACTS</a>
        </div>

        <a
          href="#register"
          className="rounded-xl bg-[#159FE8] px-5 py-3 font-black text-white"
        >
          JOIN US ↗
        </a>
      </nav>
    </header>
  );
}


// =====================================================
// 3D EARTH AND ORBITING MOON
// =====================================================

function EarthWithMoon() {
  const sparkles = [
    { angle: -8, color: "#FF85C5", size: 5, delay: "0s" },
    { angle: -13, color: "#6AD8FF", size: 4, delay: "0.2s" },
    { angle: -19, color: "#FFFFFF", size: 3, delay: "0.4s" },
    { angle: -25, color: "#D54491", size: 4, delay: "0.6s" },
    { angle: -31, color: "#159FE8", size: 3, delay: "0.8s" },
    { angle: -37, color: "#FFFFFF", size: 2, delay: "1s" },
    { angle: -43, color: "#FF85C5", size: 3, delay: "0.3s" },
    { angle: -49, color: "#6AD8FF", size: 2, delay: "0.7s" },
  ];

  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[520px] items-center justify-center">
      <div className="pointer-events-none absolute inset-[5%] rounded-full bg-gradient-to-br from-[#D54491]/20 via-[#713C9B]/30 to-[#159FE8]/20 blur-3xl" />

      <div className="relative z-10 h-full w-full">
        <Earth />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-20"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25" />

        <div className="moon-orbit">
          {sparkles.map((sparkle, index) => (
            <div
              key={index}
              className="moon-sparkle"
              style={{
                "--sparkle-angle": `${sparkle.angle}deg`,
                "--sparkle-color": sparkle.color,
                "--sparkle-size": `${sparkle.size}px`,
                animationDelay: sparkle.delay,
              }}
            />
          ))}

          <div className="moon-body">
            <div className="moon-surface" />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-[5%] top-[18%] z-30 rounded-xl border border-white/15 bg-[#11102D]/80 px-4 py-3 text-xs text-gray-200 backdrop-blur-md">
        ◉ MISSION ACTIVE
      </div>

      <div className="pointer-events-none absolute bottom-[14%] left-[2%] z-30 rounded-xl border border-white/15 bg-[#11102D]/80 px-4 py-3 text-xs text-[#6AD8FF] backdrop-blur-md">
        001 / EXPLORE BEYOND
      </div>
    </div>
  );
}

// =====================================================
// HERO
// =====================================================

function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen scroll-mt-24 items-center overflow-hidden px-6 pb-20 pt-36"
    >
      <div className="pointer-events-none absolute right-[-180px] top-[12%] h-[500px] w-[500px] rounded-full bg-[#713C9B]/20 blur-[110px] md:h-[700px] md:w-[700px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div>
          <h1 className="max-w-2xl text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
            THE FUTURE
            <span className="block text-[#159FE8]">
              IS OUT THERE.
            </span>
          </h1>

          <div className="mt-7">
            <div className="mb-6 inline-flex items-center gap-3 rounded-2xl border border-[#FF85C5]/50 bg-[#D54491]/15 px-5 py-4 shadow-[0_0_35px_rgba(213,68,145,0.2)]">
              <span className="h-3 w-3 animate-pulse rounded-full bg-[#FF85C5]" />
              <span className="text-2xl font-black tracking-[0.08em] text-[#FF85C5] sm:text-3xl">
                ASTROXCAMP 2026
              </span>
            </div>

            <p className="mt-3 text-lg font-semibold text-white">
              Connecting Space Science and Emerging Technologies
            </p>

            <p className="mt-4 max-w-lg leading-8 text-gray-300">
              Join Astrotech's flagship hybrid bootcamp to explore
              astronomy, artificial intelligence, space data,
              programming, and emerging technologies through
              conferences, hands-on workshops, and stargazing.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-5 text-sm text-gray-300">
            <span>✦ December 19, 2026</span>
            <span>✦ ESI, Oued Smar, Algiers</span>
            <span>✦ Hybrid Bootcamp</span>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#register"
              className="rounded-full bg-gradient-to-r from-[#159FE8] to-[#31D5E8] px-8 py-4 font-bold text-[#070617] shadow-[0_0_30px_rgba(21,159,232,0.25)] transition hover:scale-105"
            >
              REGISTER NOW ↗
            </a>

            <a
              href="#agenda"
              className="rounded-full border border-white/25 px-8 py-4 font-semibold transition hover:border-[#D54491] hover:text-[#D54491]"
            >
              Explore Agenda
            </a>
          </div>
        </div>

        <EarthWithMoon />
      </div>
    </section>
  );
}

// =====================================================
// COUNTDOWN
// =====================================================

function Countdown() {
  function calculateTimeLeft() {
    const difference = Math.max(
      0,
      new Date(EVENT_DATE).getTime() - Date.now()
    );

    return {
      days: Math.floor(difference / 86400000),
      hours: Math.floor((difference / 3600000) % 24),
      minutes: Math.floor((difference / 60000) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  return (
    <section className="relative px-6 py-20">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-4 text-sm font-bold tracking-[0.25em] text-[#FF85C5]">
          MISSION COUNTDOWN
        </p>

        <h2 className="text-3xl font-extrabold sm:text-5xl">
          THE COUNTDOWN TO{" "}
          <span className="text-[#159FE8]">LIFTOFF.</span>
        </h2>

        <p className="mt-4 text-gray-400">
          December 19, 2026 · 08:00 · ESI, Algiers
        </p>

        <div className="mt-12 grid grid-cols-4 gap-2 sm:gap-5">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="rounded-2xl border border-[#159FE8]/25 bg-[#11102D]/85 px-2 py-6 shadow-[0_0_25px_rgba(21,159,232,0.08)] sm:px-6 sm:py-10"
            >
              <div className="text-3xl font-black tabular-nums text-white sm:text-6xl">
                {String(unit.value).padStart(2, "0")}
              </div>

              <div className="mt-4 text-[10px] font-bold tracking-widest text-[#FF85C5] sm:text-sm">
                {unit.label}
              </div>
            </div>
          ))}
        </div>

        {Object.values(timeLeft).every((value) => value === 0) && (
          <p className="mt-8 font-bold text-[#6AD8FF]">
            The mission has begun!
          </p>
        )}
      </div>
    </section>
  );
}

// =====================================================
// ABOUT
// =====================================================

function About() {
  const features = [
    {
      icon: "✧",
      title: "Explore the Cosmos",
      text: "Discover astronomy, satellite data, space simulations, and the fascinating science behind our universe.",
    },
    {
      icon: "⌘",
      title: "Learn & Innovate",
      text: "Develop practical skills in Python, artificial intelligence, data science, and computational astrophysics.",
    },
    {
      icon: "✦",
      title: "Connect & Collaborate",
      text: "Meet students, researchers, mentors, and industry professionals passionate about space and technology.",
    },
  ];

  return (
    <section
      id="about"
      className="relative scroll-mt-24 px-6 py-28"
    >
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm font-bold tracking-[0.25em] text-[#D54491]">
          01 / OUR MISSION
        </p>

        <h2 className="max-w-3xl text-4xl font-bold sm:text-5xl">
          CURIOSITY HAS{" "}
          <span className="text-[#159FE8]">
            NO LIMITS.
          </span>
        </h2>

        <p className="mt-6 max-w-2xl leading-8 text-gray-400">
          Founded in September 2022, Astrotech is the official
          astronomy and space technology club of the National
          Higher School of Computer Science (ESI, Algiers).
          Through AstroXCamp, we bring together astronomy,
          computer science, artificial intelligence, and emerging
          technologies to inspire the next generation of innovators.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-[#11102D]/70 p-8 transition duration-300 hover:-translate-y-2 hover:border-[#D54491]/60"
            >
              <div className="mb-6 text-4xl text-[#159FE8]">
                {feature.icon}
              </div>

              <h3 className="mb-3 text-2xl font-bold">
                {feature.title}
              </h3>

              <p className="leading-7 text-gray-400">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =====================================================
// AGENDA
// =====================================================

function Agenda() {
  return (
    <section
      id="agenda"
      className="relative scroll-mt-24 px-6 py-28"
    >
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm font-bold tracking-[0.25em] text-[#D54491]">
          02 / FLIGHT PLAN
        </p>

        <h2 className="text-4xl font-bold sm:text-5xl">
          THE MISSION{" "}
          <span className="text-[#159FE8]">
            TIMELINE.
          </span>
        </h2>

        <p className="mt-5 text-gray-400">
          Every great mission begins with a plan.
        </p>

        <div className="relative mt-14 max-w-4xl border-l-2 border-[#D54491]/50 pl-7 sm:pl-12">
          {agenda.map((item, index) => (
            <div
              key={item.time}
              className="relative mb-7 last:mb-0"
            >
              <span className="absolute -left-[37px] top-8 h-4 w-4 rounded-full border-4 border-[#070617] bg-[#D54491] sm:-left-[57px]" />

              <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#11102D]/80 p-6 transition hover:border-[#159FE8]/50 sm:flex-row sm:items-center sm:gap-10">
                <div className="text-2xl font-bold text-[#159FE8]">
                  {item.time}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-400">
                    {item.detail}
                  </p>
                </div>

                <span className="text-xs tracking-widest text-gray-500">
                  STAGE 0{index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =====================================================
// REGISTRATION STATUS CHECK
// =====================================================

function checkRegistration(requestId) {
  return new Promise((resolve, reject) => {
    const callbackName =
      "astroCallback_" +
      Math.random().toString(36).slice(2);

    const script = document.createElement("script");

    let finished = false;
    let timeout;

    function finish(error, data) {
      if (finished) return;
      finished = true;

      clearTimeout(timeout);
      script.remove();
      delete window[callbackName];

      if (error) reject(error);
      else resolve(data);
    }

    window[callbackName] = (data) => {
      finish(null, data);
    };

    script.onerror = () => {
      finish(new Error("Status endpoint unavailable"));
    };

    timeout = setTimeout(() => {
      finish(new Error("Status check timed out"));
    }, 10000);

    const url = new URL(SCRIPT_URL);

    url.searchParams.set("callback", callbackName);
    url.searchParams.set("requestId", requestId);
    url.searchParams.set("t", Date.now().toString());

    script.src = url.toString();
    document.body.appendChild(script);
  });
}

// =====================================================
// REGISTRATION
// =====================================================

function Registration() {
  const [type, setType] = useState("student");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (status === "loading") return;

    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    if (
      !SCRIPT_URL.startsWith(
        "https://script.google.com/macros/s/"
      ) ||
      !SCRIPT_URL.endsWith("/exec")
    ) {
      setStatus("error");
      setMessage(
        "Registration is not configured yet. Please contact Astrotech."
      );
      return;
    }

    const formData = new FormData(form);

    const requestId =
      Date.now().toString(36) +
      "_" +
      Math.random().toString(36).slice(2);

    formData.set("requestId", requestId);

    setStatus("loading");
    setMessage("");

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(formData),
      });
    } catch (error) {
      console.warn("Submission transport:", error);
    }

    for (let attempt = 0; attempt < 15; attempt++) {
      try {
        const result = await checkRegistration(requestId);

        if (
          result &&
          ["success", "duplicate", "error"].includes(
            result.status
          )
        ) {
          setStatus(result.status);
          setMessage(result.message || "");
          return;
        }
      } catch (error) {
        console.warn("Status check:", error.message);
      }

      await new Promise((resolve) =>
        setTimeout(resolve, 2000)
      );
    }

    setStatus("error");
    setMessage(
      "We couldn't verify your registration. Please contact Astrotech before trying again."
    );
  }

  const inputClass =
    "w-full rounded-xl border border-white/15 bg-[#070617] px-4 py-3 text-white outline-none transition focus:border-[#159FE8]";

  return (
    <section
      id="register"
      className="relative scroll-mt-24 px-5 py-20"
    >
      <div className="mx-auto max-w-xl rounded-3xl border border-[#D54491]/30 bg-[#11102D]/95 p-6 shadow-[0_0_45px_rgba(213,68,145,0.08)] sm:p-8">

        <p className="text-center text-xs font-bold tracking-[0.25em] text-[#FF85C5]">
          03 / ENROLLMENT
        </p>

        <h2 className="mt-3 text-center text-3xl font-black text-white">
          JOIN THE{" "}
          <span className="text-[#159FE8]">
            MISSION.
          </span>
        </h2>

        <p className="mt-3 text-center text-sm text-gray-400">
          AstroXCamp 2026 · December 19 · ESI Algiers
        </p>

        {status === "success" ? (
          <div
            role="status"
            className="mt-8 rounded-2xl border border-[#159FE8]/40 bg-[#159FE8]/10 px-5 py-10 text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#159FE8]/20 text-4xl text-[#6AD8FF]">
              ✓
            </div>

            <h3 className="mt-6 text-2xl font-black text-white">
              THANK YOU FOR REGISTERING!
            </h3>

            <p className="mt-4 leading-7 text-gray-300">
              Your registration for AstroXCamp 2026 has
              been successfully recorded.
            </p>

            <p className="mt-4 text-sm font-semibold text-[#6AD8FF]">
              {message.includes("email sent")
                ? "We've sent you a confirmation email. Check your inbox and spam folder."
                : "Your registration is saved, but the confirmation email could not be sent."}
            </p>

            <p className="mt-6 text-sm text-gray-400">
              See you on December 19 at ESI, Algiers!
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-4"
          >
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm text-white"
              >
                Full Name *
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                minLength={2}
                maxLength={100}
                placeholder="Your full name"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm text-white"
              >
                Email Address *
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={200}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="participantType"
                className="mb-2 block text-sm text-white"
              >
                Participant Type *
              </label>

              <select
                id="participantType"
                name="participantType"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={inputClass}
              >
                <option value="student">Student</option>
                <option value="other">Other</option>
              </select>
            </div>

            {type === "student" && (
              <div>
                <label
                  htmlFor="university"
                  className="mb-2 block text-sm text-white"
                >
                  University / School *
                </label>

                <input
                  id="university"
                  name="university"
                  type="text"
                  required
                  minLength={2}
                  maxLength={150}
                  placeholder="ESI, USTHB, ENP..."
                  className={inputClass}
                />
              </div>
            )}

            <div>
              <label
                htmlFor="motivation"
                className="mb-2 block text-sm text-white"
              >
                Why do you want to join? *
              </label>

              <textarea
                id="motivation"
                name="motivation"
                required
                minLength={10}
                maxLength={500}
                rows={2}
                placeholder="Tell us briefly..."
                className={`${inputClass} resize-y`}
              />

              <p className="mt-1 text-xs text-gray-500">
                10–500 characters
              </p>
            </div>

            <p className="text-xs leading-5 text-gray-400">
              Your information will be used by Astrotech
              to manage your event registration.
            </p>

            {status === "duplicate" && (
              <div
                role="alert"
                className="rounded-xl border border-[#FF85C5]/40 bg-[#D54491]/10 p-4 text-center text-sm font-semibold text-[#FF85C5]"
              >
                {message ||
                  "You're already registered for AstroXCamp 2026!"}
              </div>
            )}

            {status === "error" && (
              <div
                role="alert"
                className="rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-center text-sm text-red-200"
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-xl bg-gradient-to-r from-[#159FE8] to-[#31D5E8] px-6 py-4 font-black text-[#070617] transition hover:brightness-110 disabled:opacity-60"
            >
              {status === "loading"
                ? "SUBMITTING..."
                : "CONFIRM REGISTRATION ↗"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

// =====================================================
// FOOTER
// =====================================================

function Footer() {
  const socialLinks = [
    {
      name: "Instagram",
      symbol: "◎",
      url: "https://www.instagram.com/astrotech_esi/",
    },
    {
      name: "WhatsApp",
      symbol: "✆",
      url: "https://wa.me/213553842579",
    },
    {
      name: "LinkedIn",
      symbol: "in",
      url: "https://www.linkedin.com/company/astrotech-esi",
    },
    {
      name: "Facebook",
      symbol: "f",
      url: "https://www.facebook.com/share/19dHX98QKz/?mibextid=wwXIfr",
    },
  ];

  return (
    <footer
      id="contact"
      className="relative scroll-mt-24 border-t border-[#D54491]/25 bg-[#0B1025] px-6 pb-8 pt-16 text-white"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <AstroLogo />

            <h3 className="mt-5 text-xl font-extrabold">
              ASTROXCAMP 2026
            </h3>

            <p className="mt-3 leading-7 text-gray-400">
              Connecting Space Science and Emerging Technologies.
              Organized by Astrotech Club at ESI, Algiers.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  aria-label={social.name}
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-xl font-black transition hover:-translate-y-1 hover:border-[#D54491] hover:bg-[#D54491]/20 hover:text-[#FF85C5]"
                >
                  {social.symbol}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold text-[#FF85C5]">
              QUICK LINKS
            </h3>

            <div className="flex flex-col gap-4 text-gray-300">
              <a href="#home" className="hover:text-[#FF85C5]">
                Home
              </a>
              <a href="#about" className="hover:text-[#FF85C5]">
                About Us
              </a>
              <a href="#agenda" className="hover:text-[#FF85C5]">
                Event Agenda
              </a>
              <a href="#register" className="hover:text-[#FF85C5]">
                Registration
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold text-[#FF85C5]">
              CONTACT US
            </h3>

            <p className="mb-6 text-gray-400">
              Questions, partnerships, or general inquiries?
              Reach out to our team.
            </p>

            <div className="flex flex-col gap-6">
              <a
                href="mailto:astrotech@esi.dz"
                className="flex items-start gap-4 hover:text-[#FF85C5]"
              >
                <span className="text-2xl text-[#6AD8FF]">
                  ✉
                </span>
                <div>
                  <p className="text-sm text-gray-400">
                    Official Email
                  </p>
                  <p className="break-all">
                    astrotech@esi.dz
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me/213553842579"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 hover:text-green-400"
              >
                <span className="text-2xl text-green-400">
                  ✆
                </span>
                <div>
                  <p className="text-sm text-gray-400">
                    WhatsApp
                  </p>
                  <p>+213 553 84 25 79</p>
                </div>
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Ecole+Nationale+Superieure+d%27Informatique+ESI+Oued+Smar+Alger"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 hover:text-[#FF85C5]"
              >
                <span className="text-2xl text-[#FF85C5]">
                  ⌖
                </span>
                <div>
                  <p className="text-sm text-gray-400">
                    Location
                  </p>
                  <p>
                    École Nationale Supérieure d'Informatique
                    (ESI), Oued Smar, Algiers
                  </p>
                  <p className="mt-2 text-sm text-[#6AD8FF]">
                    Open Google Maps ↗
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/10 pt-7 text-center text-sm text-gray-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} Astrotech Club.
            All rights reserved.
          </p>

          <p>
            Made with{" "}
            <span className="text-[#FF85C5]">♥</span>{" "}
            for AstroXCamp 2026
          </p>
        </div>
      </div>
    </footer>
  );
}

// =====================================================
// MAIN APP — REQUIRED DEFAULT EXPORT
// =====================================================

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#070617] text-white">
      <SpaceBackground />

      <div className="relative z-10">
        <Navbar />

        <main>
          <Hero />
          <Countdown />
          <About />
          <Agenda />
          <Registration />
        </main>

        <Footer />
      </div>
    </div>
  );
}
