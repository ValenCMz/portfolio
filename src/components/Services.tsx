import { motion } from "framer-motion";
import { Code, Palette, Rocket, Zap } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Desarrollo Web",
    description:
      "Aplicaciones web modernas, rápidas y escalables usando tecnologías actuales.",
  },
  {
    icon: Palette,
    title: "Diseño UI/UX",
    description:
      "Interfaces limpias y funcionales, enfocadas en una experiencia de usuario clara.",
  },
  {
    icon: Rocket,
    title: "Optimización",
    description:
      "Mejora de rendimiento, accesibilidad y SEO para destacar en buscadores.",
  },
  {
    icon: Zap,
    title: "APIs & Backend",
    description:
      "Arquitecturas robustas y APIs escalables pensadas para crecer.",
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-24 px-6 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Lo que <span className="text-gradient">Ofrezco</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Servicios diseñados para llevar tu proyecto al siguiente nivel.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl border border-border bg-gradient-card hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:glow-primary transition-all duration-300">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
