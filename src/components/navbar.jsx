
import { useEffect, useState } from "react";

const links = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Events", href: "#events", id: "events" },
  { label: "About Us", href: "#about", id: "about" },
  { label: "Contacts", href: "#contacts", id: "contacts" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    function updateActiveSection() {
      const scrollPosition = window.scrollY + 150;

      let current = "home";

      for (const link of links) {
        const section = document.getElementById(link.id);

        if (section && section.offsetTop <= scrollPosition) {
          current = link.id;
        }
      }

      setActive(current);
    }

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, []);

  function handleNavigation(id) {
    setActive(id);
    setMenuOpen(false);
  }

  return (
    <header className="fixed left-0 top-0 z-[100] w-full px-4 md:px-6">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-b-3xl border border-white/5 bg-[#151d34]/95 px-5 py-3 text-white shadow-lg backdrop-blur-md md:px-10">

        {/* LOGO */}
        <a
          href="#home"
          onClick={() => handleNavigation("home")}
          className="flex items-center gap-3"
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 48 48"
            fill="none"
          >
            <circle
              cx="24"
              cy="24"
              r="14"
              stroke="white"
              strokeWidth="2"
            />

            <ellipse
              cx="24"
              cy="24"
              rx="22"
              ry="8"
              transform="rotate(-20 24 24)"
              stroke="white"
              strokeWidth="2"
            />

            <circle cx="42" cy="18" r="2" fill="white" />
          </svg>

          <span className="text-xl font-semibold tracking-wide">
            AstroTech
          </span>
        </a>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-4 md:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => handleNavigation(link.id)}
              className={`rounded-full px-4 py-2 transition-all duration-300 ${
                active === link.id
                  ? "bg-[#304a7c] text-white"
                  : "text-gray-200 hover:bg-[#304a7c]/60"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* JOIN US BUTTON */}
        <a
          href="#register"
          onClick={() => handleNavigation("register")}
          className="hidden rounded-xl bg-[#557bb8] px-7 py-2 font-semibold transition-all duration-300 hover:bg-[#7097d3] hover:shadow-[0_0_20px_rgba(96,165,250,0.3)] md:block"
        >
          JOIN US
        </a>

        {/* MOBILE MENU TOGGLE */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg px-3 py-2 text-2xl hover:bg-white/10 md:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mx-auto mt-2 flex max-w-7xl flex-col gap-2 rounded-2xl border border-white/10 bg-[#151d34]/95 p-5 text-white shadow-xl backdrop-blur-md md:hidden">

          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => handleNavigation(link.id)}
              className={`rounded-lg px-4 py-3 transition ${
                active === link.id
                  ? "bg-[#304a7c]"
                  : "hover:bg-[#304a7c]/60"
              }`}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#register"
            onClick={() => handleNavigation("register")}
            className="mt-2 rounded-lg bg-[#557bb8] px-4 py-3 text-center font-semibold hover:bg-[#7097d3]"
          >
            JOIN US
          </a>
        </div>
      )}
    </header>
  );
}
