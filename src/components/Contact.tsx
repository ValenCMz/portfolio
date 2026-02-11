import { motion } from "framer-motion";
import { Mail, Send, ArrowRight, Linkedin, Github } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const socialLinks = [
  { icon: Github, href: "https://github.com/ValenCMz", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/valentin-caminos-martinez-125384236/",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:caminosmartinezvalentin@gmail.com",
    label: "Email",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Mail className="w-4 h-4" />
            Disponible para proyectos
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            ¿Tienes un proyecto en mente?
          </h2>

          <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Cuéntame tu idea y trabajemos juntos para hacerla realidad. Siempre
            estoy abierto a nuevos desafíos.
          </p>

          {/* CTA Button */}
          <motion.a
            href="mailto:caminosmartinezvalentin@gmail.com"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium text-lg transition-all duration-300 hover:scale-105 glow-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Send className="w-5 h-5" />
            Escríbeme
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.a>

          {/* Or email directly */}
          <motion.div variants={itemVariants}>
            <p className="text-muted-foreground text-sm mb-6 mt-6">
              O encuéntrame en
            </p>
            <div className="flex justify-center gap-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                  whileHover={{ y: -3 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
