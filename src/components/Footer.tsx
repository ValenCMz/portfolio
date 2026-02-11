import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-3 items-center gap-4">
          <div className="flex items-center justify-start">
            <span className="text-xl font-bold text-foreground">ValenCMz</span>
          </div>

          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com/ValenCMz"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/valentin-caminos-martinez-125384236/"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          <p className="text-sm text-muted-foreground text-right flex flex-col items-end">
            © {new Date().getFullYear()} ValenCMz.
            <span> Todos los derechos reservados.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
