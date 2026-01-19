import { Moon } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="fixed w-full z-50 bg-background border-b border-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
              <Moon className="h-5 w-5" />
            </div>
            <span className="text-lg md:text-xl tracking-tight font-semibold text-gray-900">
              TelosCuento
            </span>
          </div>

          <nav className="hidden md:flex space-x-8 items-center font-semibold">
            <Link
              href="/"
              className="text-sm text-gray-900 hover:text-primary transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/alojamientos"
              className="text-sm text-gray-500 hover:text-primary transition-colors"
            >
              Alojamientos
            </Link>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-primary transition-colors"
            >
              Distritos
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-primary transition-colors"
            >
              Comodidades
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
