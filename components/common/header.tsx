import { MoonStar } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="fixed w-full z-50 bg-accent border-b border-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link href="/" className="shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
              <MoonStar className="h-5 w-5" />
            </div>
            <span className="text-lg md:text-xl tracking-tight font-semibold text-gray-900">
              TelosCuento
            </span>
          </Link>

          <nav className="flex space-x-8 items-center font-semibold text-base">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors hidden md:block"
            >
              Inicio
            </Link>
            <Link
              href="/alojamientos"
              className="text-foreground hover:text-primary transition-colors"
            >
              Alojamientos
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
