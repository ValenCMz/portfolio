import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Proyectos", href: "#projects" },
  { name: "Sobre mí", href: "#about" },
  { name: "Servicios", href: "#services" },
  { name: "Contacto", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-4" : "py-6"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav
        className={`max-w-6xl mx-auto px-6 flex items-center justify-between ${
          scrolled ? "glass rounded-2xl py-3 mx-6" : ""
        }`}
      >
        <a
          href="#"
          className="text-xl font-bold text-foreground hover:text-primary transition-colors"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          ValenCMz
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-sm text-muted-foreground hover:text-foreground link-underline transition-colors"
            >
              {link.name}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollToSection("#contact")}
          className="px-5 py-2 text-sm font-medium border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          Hablemos
        </button>
      </nav>
    </motion.header>
  );
}
