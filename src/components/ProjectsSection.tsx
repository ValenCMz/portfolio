import { useState } from "react";
import { ExternalLink, Github, ChevronRight, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  type: "main" | "experiment";
  liveUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  image?: string;
  linkedinUrl?: string;
}

function getYoutubeEmbedUrl(url: string) {
  const match = url.match(/(?:v=|youtu\.be\/)([^&]+)/);
  const id = match?.[1] ?? url;
  return `https://www.youtube.com/embed/${id}?autoplay=1`;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Gestión de salas",
    description:
      "Sistema de gestión para control de stock animal y reportes médicos, enfocado en evitar olvidos de carga de datos.",
    tags: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Docker",
    ],
    type: "main",
    liveUrl: "https://gestionsalas.cloud/",
    videoUrl: "https://www.youtube.com/watch?v=rYUH2OcRMlk",
  },
  {
    id: "2",
    title: "Estudio CGA – Gestión de Casos y Documentos",
    description:
      "Desarrollo de una web para un estudio jurídico y un sistema interno para la gestión de casos, clientes y documentos, con acceso diferenciado por roles.",
    tags: [
      "React",
      "JavaScript",
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Google cloud storage",
    ],
    type: "main",
    liveUrl: "https://estudiocga.ar/",
    videoUrl: "https://youtu.be/zxMMSZWPzDI",
  },
  {
    id: "3",
    title: "Portofolio web de Lautaro Vulcano",
    description:
      "Pagina web donde se encuentran los trabajos personales de Lautaro.",
    tags: ["React"],
    type: "main",
    liveUrl: "https://lautarovulcano.com",
  },
  {
    id: "4",
    title: "Cohere bot chat",
    description:
      "Chatbot desarrollado como proyecto experimental para aprender React e integrar modelos de lenguaje (LLMs) mediante la API de Cohere.",
    tags: ["React", "JavaScript", "Tailwind", "CohereLLM"],
    type: "experiment",
    liveUrl: "https://chat-cohere-ai-react.vercel.app/",
    githubUrl: "https://github.com/ValenCMz/chat_cohereAi_react",
  },
  {
    id: "5",
    title: "Discord Movie Bot – Node.js",
    description:
      "Bot de Discord desarrollado para explorar el entorno de Node.js y el consumo de APIs externas, generando recomendaciones aleatorias de películas.",
    tags: ["Node.js", "Discord.js", "API", "JavaScript"],
    type: "experiment",
    githubUrl: "https://github.com/ValenCMz/RandomMovie",
    linkedinUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:7137602232094482432/",
  },
  {
    id: "6",
    title: "Optimización de Rutas – Grafos en Java",
    description:
      "Proyecto desarrollado en Java para modelar una red de subterráneos utilizando grafos, aplicando algoritmos greedy y backtracking para resolver problemas de rutas.",
    tags: ["Java", "Grafos", "Algoritmos", "Greedy", "Backtracking"],
    type: "experiment",
    githubUrl:
      "https://github.com/ValenCMz/programacion3_2023/tree/main/programacion3/Tpe_segundaEntrega",
  },
  {
    id: "7",
    title: "Landing con Parallax y Animaciones CSS",
    description:
      "Proyecto académico desarrollado con HTML, CSS y JavaScript para explorar efectos de parallax, animaciones CSS y fundamentos de interacción en frontend.",
    tags: ["HTML", "CSS", "JavaScript"],
    type: "experiment",
    liveUrl: "https://igrivas.github.io/Entregable_Interfaces/TP4/",
    githubUrl: "https://github.com/IgRivas/Entregable_Interfaces/tree/main/TP4",
  },

  {
    id: "8",
    title: "Gaming Web – 4 en Línea con Canvas",
    description:
      "Web de videojuegos diseñada en Figma y desarrollada con HTML, CSS y JavaScript, incluyendo un juego funcional de 4 en línea implementado con Canvas.",
    tags: ["HTML", "CSS", "JavaScript"],
    type: "experiment",
    githubUrl: "https://github.com/IgRivas/Entregable_Interfaces/tree/main/TP3",
    liveUrl:
      "https://igrivas.github.io/Entregable_Interfaces/TP3/4EnLinea.html#",
  },
  {
    id: "9",
    title: "Weather App – React",
    description:
      "Aplicación desarrollada en React que consume una API de clima para mostrar información en tiempo real, enfocada en el manejo de estado y efectos.",
    tags: ["React", "JavaScript", "Tailwind", "API"],
    type: "experiment",
    githubUrl: "https://github.com/ValenCMz/weather-app-react",
    liveUrl: "https://valencmz.github.io/weather-app-react/",
  },
];

function ProjectCard({
  project,
  onOpenVideo,
}: {
  project: Project;
  onOpenVideo: (url: string) => void;
}) {
  return (
    <div className="group relative rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:bg-card/80">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <div className="flex gap-2">
            {project.videoUrl && (
              <button
                type="button"
                onClick={() => onOpenVideo?.(project.videoUrl!)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Ver video en YouTube"
              >
                <Youtube className="h-4 w-4" />
              </button>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Ver código en GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Ver proyecto en vivo"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<"main" | "experiment">("main");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const filteredProjects = projects.filter((p) => p.type === activeTab);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold text-foreground">Proyectos</h2>
            <p className="text-muted-foreground max-w-2xl">
              Una selección de trabajos que reflejan mi pasión por crear
              soluciones digitales elegantes y funcionales.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setActiveTab("main")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all",
                activeTab === "main"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              Principales
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("experiment")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all",
                activeTab === "experiment"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              Experimentos
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenVideo={(url) => setVideoUrl(url)}
              />
            ))}
          </div>
        </div>
      </div>

      {videoUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setVideoUrl(null)}
        >
          <div
            className="relative w-full max-w-3xl aspect-video bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setVideoUrl(null)}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/60 px-3 py-1 text-sm text-white hover:bg-black/80"
            >
              Cerrar
            </button>

            <iframe
              src={getYoutubeEmbedUrl(videoUrl)}
              className="w-full h-full"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
