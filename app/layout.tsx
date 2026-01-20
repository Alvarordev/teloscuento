import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TelosCuento - Encuentra alojamientos por horas en Lima",
    template: "%s | TelosCuento",
  },
  description:
    "Encuentra los mejores alojamientos por horas en Lima. Compara precios, ubicaciones y servicios. Comodidad, privacidad y precios accesibles para cada ocasión.",
  keywords: [
    "telos Lima",
    "hoteles por horas Lima",
    "hostales por horas",
    "alojamiento Lima",
    "habitaciones por horas",
    "privacidad Lima",
    "ofertas telos",
    "telos en Lince",
    "telos en Miraflores",
    "telos en San Isidro",
    "telos en Lima",
  ],
  authors: [{ name: "TelosCuento" }],
  creator: "TelosCuento",
  publisher: "TelosCuento",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://teloscuento.com"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/",
    siteName: "TelosCuento",
    title: "TelosCuento - Encuentra alojamientos por horas en Lima",
    description:
      "Encuentra los mejores alojamientos por horas en Lima. Compara precios, ubicaciones y servicios.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TelosCuento - Alojamientos por horas en Lima",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TelosCuento - Encuentra alojamientos por horas en Lima",
    description:
      "Encuentra los mejores alojamientos por horas en Lima. Compara precios, ubicaciones y servicios.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
