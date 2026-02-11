import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Hero3D from "./Hero3D";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Background gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsl(187 85% 53% / 0.08) 0%, transparent 50%)",
        }}
      />

      {/* 3D Background */}
      <Hero3D />

      {/* Content */}
      <div className="relative z-10 text-center px-2 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p
            className="hero-subtitle mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Full Stack Developer
          </motion.p>

          <h1 className="hero-title mb-8 flex flex-col items-center justify-center">
            Valentín <span>Caminos Martínez</span>
          </h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Creando experiencias digitales que combinan diseño y funcionalidad
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <a
              href="#projects"
              className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-glow"
            >
              Ver Proyectos
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-border text-foreground font-medium rounded-lg hover:border-primary hover:text-primary transition-all duration-300"
            >
              Contactar
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.6 },
          y: { delay: 1.5, duration: 1.5, repeat: Infinity },
        }}
      >
        <ArrowDown className="w-6 h-6 text-primary" />
      </motion.div>
    </section>
  );
}
