import { motion } from "framer-motion";
import { Code, Layers, Zap, Brain } from "lucide-react";
import me from "@/assets/img/me.png";

const skills = [
  {
    icon: Code,
    title: "Frontend",
    description: "React, Next.js, TypeScript, Tailwind CSS, Figma",
  },
  {
    icon: Layers,
    title: "Backend",
    description: "Java, Spring Boot, PostgreSQL",
  },
  {
    icon: Zap,
    title: "DevOps",
    description: "Docker, CI/CD, AWS, VPS",
  },
  {
    icon: Brain,
    title: "IA",
    description: "MCP, LLMs, Automatizaciones",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 relative noise-overlay">
      <div className="mx-auto max-w-6xl relative z-10">
        {" "}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Sobre mi
            </h2>

            <div className="flex items-center gap-4 mb-6">
              <img
                src={me}
                alt="About"
                className="w-56 h-56 object-cover rounded-full shadow-lg object-center"
                style={{ objectPosition: "center 19%" }}
              />
              <div>
                <h2 className="flex flex-col text-4xl md:text-5xl font-bold mb-2">
                  Full Stack <span className="gradient-text">Developer</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed ">
                  Valentín Caminos Martínez
                </p>
              </div>
            </div>

            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Soy desarrollador full stack con experiencia en aplicaciones web
              reales y proyectos freelance. Enfocándome en soluciones simples,
              escalables y listas para producción. Me interesa construir
              productos bien pensados, desde la arquitectura hasta el deploy.
            </p>
          </motion.div>

          {/* Skills cards */}
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                className="p-6 rounded-xl glass group hover:border-primary/30 transition-all duration-300"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <skill.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {skill.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
