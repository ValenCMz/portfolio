import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useState } from "react";
import cv from "@/assets/Valentin Caminos Martinez CV.pdf";

export default function FloatingCVButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
    >
      <div className="relative">
        {/* Tooltip */}
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium shadow-lg"
          >
            Descargar CV
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900 dark:border-l-gray-100"></div>
          </motion.div>
        )}

        {/* Botón */}
        <motion.a
          href={cv}
          download
          className="flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Descargar CV"
        >
          <Download className="w-6 h-6" />
        </motion.a>
      </div>
    </motion.div>
  );
}
